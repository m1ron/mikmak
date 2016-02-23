/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */


/** On document ready */
$(document).ready(function () {

	window.v = {};
	window.body = $('body');

	/** Paths array */
	v.path = {
		img: './img/',
		audio: './audio/',
		video: './video/'
	};

	/** Audio files array */
	v.audio = [
		{time: 1.9, src: v.path.audio + 'lamp', mp3: 22, volume: .15},
		{time: 4.95, src: v.path.audio + 'knife', mp3: 19, volume: .2},
		{time: 5.2, src: v.path.audio + 'pan', mp3: 50, volume: .2},
		{time: 8.2, src: v.path.audio + 'pepper', mp3: 21, volume: .15},
		{time: 9.7, src: v.path.audio + 'sauce', mp3: 63, volume: .2},
		{time: 27, src: v.path.audio + 'cash', mp3: 38, volume: .2},
		{time: 27.7, src: v.path.audio + 'coins', mp3: 18, volume: .4}
	];

	/** Video files array */
	v.video = [
		{src: v.path.video + 'forward', mp4: 3707.360, webm: 1309.349},
		{src: v.path.video + 'backward', mp4: 3700.735, webm: 1216.921}
	];

	/** Start preloader */
	initPreloader();

	/** Fastclick */
	FastClick.attach(document.body);
});


/**
 *  Initialize preloader
 * */
function initPreloader() {
	function showPreloader() {
		body.removeClass('preloading-hidden');

		setTimeout(function () {
			body.removeClass('preloading');
			$.html5Loader({
				filesToLoad: {
					"files": files
				},
				onComplete: function () {
					var int = setInterval(function () {
						if (!body.hasClass('loading-timeout')) {
							initUI();
							clearInterval(int);
						}
					}, 50);
				}
			});
		}, 100);
		setTimeout(function () {
			body.removeClass('loading-timeout');
		}, 4000);
		img = false;
	}

	/** Build files array for html5loader */
	var files = [];
	$(v.audio).each(function (i) {
		files.push({"type": "AUDIO", "sources": {"mp3": {"source": v.audio[i].src + '.mp3', "size": v.audio[i].mp3}}})
	});
	$(v.video).each(function (i) {
		files.push({"type": "VIDEO", "sources": {"h264": {"source": v.video[i].src + '.mp4', "size": v.video[i].mp4}, "webm": {"source": v.video[i].src + '.webm', "size": v.video[i].webm}}})
	});
	//console.log(files);

	var img = new Image();
	$(img).on('load', showPreloader);
	img.src = window.v.path.img + 'preloader.jpg';
}


/**
 *  Initialize UI
 * */
function initUI() {

	setTimeout(function () {
		body.removeClass('loading-hidden').removeClass('loading-timeout');
		setTimeout(function () {
			playVideo(1);
			setTimeout(function () {
				body.removeClass('ui-hidden')
			}, 2000);
		}, 500);
		setTimeout(function () {
			body.removeClass('loading');
		}, 2000);
	}, 50);

	initVideo();

	/** Header */
	$('.header').each(function () {
		function Handler(event) {
			var target = $(event.target);
			if (target.closest('.nav').length === 0) {
				Toggle(event);
			}
		}

		function Toggle(e) {
			if (body.hasClass('nav-open')) {
				body.removeClass('nav-open').off('click', Handler);
			} else {
				setTimeout(function () {
					body.addClass('nav-open').on('click', Handler);
				}, 10);
			}
			e.preventDefault();
		}

		$('.toggle', this).on('click', Toggle);
	});
}


/**
 * Initialize video
 * */
function initVideo() {
	$('.video').each(function () {

		var self = $(this);

		v.self = self;
		v.disabled = false;
		v.jqforward = $('.forward', self);
		v.forward = v.jqforward[0];
		v.jqbackward = $('.backward', self);
		v.backward = v.jqbackward[0];
		v.active = 0;
		v.next = 1;
		v.duration = 28.88;
		v.interval = [];


		/** On dot click */
		function onClick(e) {
			var a = $(this), li = a.closest('li');
			if (!li.hasClass('active') && !v.disabled) {
				playVideo(a.data('section'));
			}
			e.preventDefault();
		}


		/** Play video section (integer) */
		window.playVideo = function (index) {
			v.disabled = true;
			$(document).off('mousewheel', onWheel).off('touchstart', onTouchStart).off('touchmove', onTouchMove);

			var duration = v.sections[index].time - v.forward.currentTime;

			var li = v.dots.find('li').eq(index);
			li.prevAll().andSelf().addClass('played');
			li.nextAll().removeClass('played');
			li.siblings('.active').removeClass('active');

			if (index - v.active > 1) {
				for (var i = v.active + 1; i < index; i++) {
					duration = duration + (v.sections[i].time - v.forward.currentTime);
				}
			}
			v.active = index;
			$('.section.active').removeClass('active');
			setTimeout(function () {
				$('.section.pre').removeClass('pre');
			}, 200);

			if (+duration >= 0) {
				v.forward.play();
				playForward.call(this, index);
			} else {
				v.backward.play();
				playBackward.call(this, index);
			}
		};


		/** On video paying forward */
		function playForward(index) {
			v.jqforward.addClass('visible');
			v.jqbackward.removeClass('visible');

			var to = +v.sections[index].time, a = false;

			//console.log('FW #' + index + ' from ' + v.forward.currentTime + 's' + ' to ' + to + 's');
			setTimeout(function () {
				v.backward.currentTime = v.duration - to;
			}, 50);

			v.interval = setInterval(function () {
				var c = v.forward.currentTime;
				a = false;
				if (c >= to) {
					v.forward.pause();
					onPause();
					//console.log('forward: ' + v.forward.currentTime + ' backward: ' + v.backward.currentTime);
				}
				$(v.audio).each(function (i) {
					if (this.played === false && a === false) {
						a = true;
						if (c >= v.audio[i].time) {
							console.log('played: ' + i);
							v.audio[i].node[0].play();
							v.audio[i].played = true;
						}
					}
				});
			}, 20);
		}


		/** On video paying backward */
		function playBackward(index) {
			v.jqforward.removeClass('visible');
			v.jqbackward.addClass('visible');

			var to = +(v.duration - v.sections[index].time);

			//console.log('BW #' + index + ' from ' + v.backward.currentTime + 's' + ' to ' + to + 's');
			setTimeout(function () {
				v.forward.currentTime = v.duration - to;
			}, 50);

			v.interval = setInterval(function () {
				var c = v.backward.currentTime;
				if (c >= to) {
					v.backward.pause();
					onPause();
					//console.log('forward: ' + v.forward.currentTime + ' backward: ' + v.backward.currentTime);
				}
			}, 20);
		}


		/** On video paused */
		function onPause() {
			clearInterval(v.interval);
			$(document).on('mousewheel', onWheel).on('touchstart', onTouchStart).on('touchmove', onTouchMove);
			v.disabled = false;
			v.dots.find('li').eq(v.active).addClass('active').find('a').each(function () {
				var target = $($(this).attr('href'));
				target.addClass('pre');
				setTimeout(function () {
					target.addClass('active');
				}, 20);
			});
		}


		/** On mousewheel */
		function onWheel(event) {
			if (!v.disabled) {
				if ((event.deltaY > 0) || (event.deltaX > 0)) {
					if (v.active > 1) {
						playVideo(v.active - 1);
					}
				} else if ((event.deltaY < 0) || (event.deltaX < 0)) {
					if (v.active < v.sections.length - 1) {
						playVideo(v.active + 1);
					}
				}
			}
			event.preventDefault();
		}


		window.startTouchX = 0;
		window.startTouchY = 0;

		/** On touchstart */
		function onTouchStart(event) {
			startTouchX = event.originalEvent.touches[0].pageX;
			startTouchY = event.originalEvent.touches[0].pageY;
			//console.log('start ' + event.originalEvent.touches[0].pageX + " - " + event.originalEvent.touches[0].pageY);
			event.preventDefault();
		}

		/** On touchmove */
		function onTouchMove(event) {
			//console.log('move ' + event.originalEvent.touches[0].pageX + " - " + event.originalEvent.touches[0].pageY);
			if (((event.originalEvent.touches[0].pageX - startTouchX) > 9) || ((event.originalEvent.touches[0].pageY - startTouchY) > 9)) {
				if (v.active > 1) {
					playVideo(v.active - 1);
				}
			}
			if (((startTouchX - event.originalEvent.touches[0].pageX) > 9) || ((startTouchY - event.originalEvent.touches[0].pageY) > 9)) {
				if (v.active < v.sections.length - 1) {
					playVideo(v.active + 1);
				}
			}
			event.preventDefault();
		}


		/** Video sections array */
		v.sections = [
			{time: 0, id: 'preloader', title: 'Preloader'},
			{time: 2.5, id: 'about', title: 'About us'},
			{time: 5.15, id: 'process', title: 'Our process'},
			{time: 7.3, id: 'news', title: 'News'},
			{time: 9.65, id: 'skills', title: 'Our skills'},
			{time: 20.2, id: 'viralize', title: 'Viralize'},
			{time: 23, id: 'references', title: 'References'},
			{time: 25.6, id: 'contact', title: 'Contact'},
			{time: 28.6, id: 'finish', title: 'Finish'}
		];


		/** Building audio array */
		$(v.audio).each(function (i) {
			v.audio[i].node = $('<audio/>').addClass('audio').append('<source src="' + v.audio[i].src + '.mp3" type="audio/mpeg" preload>');
			v.audio[i].node[0].volume = v.audio[i].volume;
			v.audio[i].node.appendTo(self);
			v.audio[i].played = false;
		});


		/** Generate dots */
		v.dots = $('<ul/>').addClass('dots');
		for (i = 0; i < v.sections.length; i++) {
			$('<li/>').append('<a href="#' + v.sections[i].id + '" data-section="' + i + '" title="' + v.sections[i].title + '"/>').appendTo(v.dots);
		}
		$('a', v.dots).on('click', onClick);
		v.dots.appendTo(self);
	});
}