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
		{name: 'forward', src: v.path.video + 'forward', mp4: 3707.360, webm: 1309.349},
		{name: 'backward', src: v.path.video + 'backward', mp4: 3700.735, webm: 1216.921},
		{name: 'process', src: v.path.video + 'process', mp4: 543.333, webm: 182.958},
		{name: 'process-loop', src: v.path.video + 'process-loop', mp4: 320.474, webm: 61.036}
	];

	/** Start preloader */
	initPreloader();

	/** Fastclick */
	FastClick.attach(document.body);
});


/**
 *  Initialize preloader
 **/
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
							clearInterval(int);
							setTimeout(function () {
								body.removeClass('loading-hidden').removeClass('loading-timeout');
								setTimeout(function () {
									initUI();
									setTimeout(function () {
										body.removeClass('ui-hidden')
									}, 2000);
								}, 500);
								setTimeout(function () {
									body.removeClass('loading');
								}, 2000);
							}, 50);
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

	var img = new Image();
	$(img).on('load', showPreloader);
	img.src = window.v.path.img + 'preloader.jpg';
}


/**
 *  Initialize UI
 **/
function initUI() {

	/** Header */
	$('.header').each(function () {
		function Handler(event) {
			var target = $(event.target);
			if (target.closest('.nav').length === 0) {
				navToggle();
			}
		}

		window.navToggle = function () {
			if (body.hasClass('inner')) {
				var target = $('.page.active');
				//$('.loop', target)[0].stop();
				body.removeClass('inner')
				target.removeClass('active');
				setTimeout(function () {
					target.removeClass('pre');
				}, 500);
			} else {
				if (body.hasClass('nav-open')) {
					body.removeClass('nav-open').off('click', Handler);
				} else {
					setTimeout(function () {
						body.addClass('nav-open').on('click', Handler);
					}, 10);
				}
			}
			event.preventDefault();
		};

		$('.toggle', this).on('click', navToggle);
	});

	/** Menu */
	$('.menu').each(function () {
		$('a', this).on('click', function (event) {
			var target = $(this).attr('href');
			if ($(this).closest('.nav').length > 0) {
				navToggle();
			}
			if ($(target).length > 0) {
				body.addClass('inner');
				$(target).addClass('pre');
				setTimeout(function () {
					$(target).addClass('active');
					$('.intro', target)[0].play();
				}, 20);
			}
			event.preventDefault();
		});
	});

	initIndex();
}


/**
 * Initialize index page
 **/
function initIndex() {
	$('.page-index').each(function () {
		var self = $(this), startTouchX = 0, startTouchY = 0;
		v.self = self;
		v.disabled = false;
		v.interval = [];

		/** Video sections array */
		v.sections = [
			{time: 0, id: 'preloader', title: 'Preloader'},
			{time: 3.4, id: 'about', title: 'About us'},
			{time: 5.2, id: 'process', title: 'Our process'},
			{time: 7.3, id: 'news', title: 'News'},
			{time: 9.65, id: 'skills', title: 'Our skills'},
			{time: 20.2, id: 'viralize', title: 'Viralize'},
			{time: 23, id: 'references', title: 'References'},
			{time: 25.6, id: 'contact', title: 'Contact'},
			{time: 28.6, id: 'finish', title: 'Finish'}
		];

		/** Building audio tags */
		v.audioWrap = $('<div class="audio"/>');
		$(v.audio).each(function (i) {
			v.audio[i].node = $('<audio/>').append('<source src="' + v.audio[i].src + '.mp3" type="audio/mpeg" preload>');
			v.audio[i].node[0].volume = v.audio[i].volume;
			v.audio[i].node.appendTo(v.audioWrap);
			v.audio[i].played = false;
		});
		v.audioWrap.appendTo(v.self);

		/** Building video tags */
		/*
		 v.videoWrap = $('<div class="video"/>');
		 $(v.video).each(function (i) {
		 v.video[i].node = $('<video class="' + v.video[i].name + '" preload="auto" muted width="320" height="180"/>');
		 v.video[i].node.append('<source src="' + v.video[i].src + '.mp4" type="video/mp4">');
		 v.video[i].node.append('<source src="' + v.video[i].src + '.webm" type="video/webm">');
		 v.video[i].node.appendTo(v.videoWrap);
		 });
		 v.videoWrap.appendTo(v.self);
		 */

		v.jqforward = $('.forward', v.self);
		v.forward = v.jqforward[0];
		v.jqbackward = $('.backward', v.self);
		v.backward = v.jqbackward[0];
		v.duration = 28.88;
		v.active = 0;
		v.next = 1;

		/** Generate dots */
		v.dots = $('<p/>').addClass('dots');
		for (var i = 0; i < v.sections.length; i++) {
			$('<a href="#' + v.sections[i].id + '" data-section="' + i + '" title="' + v.sections[i].title + '"/>').text(i).on('click', onDotsClick).appendTo(v.dots);
		}
		v.dots.appendTo(self);

		/** Play video section (integer) */
		function playVideo(index) {
			v.disabled = true;
			$(document).off('mousewheel', onWheelStart).off('touchstart', onTouchStart).off('touchmove', onTouchMove);

			var duration = v.sections[index].time - v.forward.currentTime;

			var a = v.dots.find('a').eq(index);
			a.prevAll().andSelf().addClass('played');
			a.nextAll().removeClass('played');
			a.siblings('.active').removeClass('active');

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
		}

		/** On video paying forward */
		function playForward(index) {
			v.jqforward.addClass('visible');
			v.jqbackward.removeClass('visible');

			var to = +v.sections[index].time, a = false;

			//console.log('FW #' + index + ' from ' + v.forward.currentTime + 's' + ' to ' + to + 's');
			setTimeout(function () {
				v.backward.currentTime = v.duration - to;
				//console.log('v.backward.currentTime: ' + v.backward.currentTime);
			}, 50);

			v.interval = setInterval(function () {
				var c = v.forward.currentTime;
				a = false;
				if (c >= to) {
					v.forward.pause();
					onVideoPaused();
					//console.log('forward: ' + v.forward.currentTime + ' backward: ' + v.backward.currentTime);
				}
				$(v.audio).each(function (i) {
					if (this.played === false && a === false) {
						a = true;
						if (c >= v.audio[i].time) {
							//console.log('played: ' + i);
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
				//console.log('v.duration: ' + (v.duration - to));
			}, 50);

			v.interval = setInterval(function () {
				var c = v.backward.currentTime;
				if (c >= to) {
					v.backward.pause();
					onVideoPaused();
					//console.log('forward: ' + v.forward.currentTime + ' backward: ' + v.backward.currentTime);
				}
			}, 20);
		}

		/** On video paused */
		function onVideoPaused() {
			clearInterval(v.interval);
			$(document).on('mousewheel', onWheelStart).on('touchstart', onTouchStart).on('touchmove', onTouchMove);
			v.disabled = false;
			v.dots.find('a').eq(v.active).addClass('active').each(function () {
				var target = $($(this).attr('href').replace('#', '.section-'));
				target.addClass('pre');
				setTimeout(function () {
					target.addClass('active');
				}, 20);
			});
		}

		/** On mouse wheel start */
		function onWheelStart(event) {
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

		/** On touch start */
		function onTouchStart(event) {
			startTouchX = event.originalEvent.touches[0].pageX;
			startTouchY = event.originalEvent.touches[0].pageY;
			//console.log('start ' + event.originalEvent.touches[0].pageX + " - " + event.originalEvent.touches[0].pageY);
			event.preventDefault();
		}

		/** On touch move */
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

		/** On dots click */
		function onDotsClick(e) {
			if (!$(this).hasClass('active') && !v.disabled) {
				playVideo(+$(this).data('section'));
			}
			e.preventDefault();
		}

		playVideo(1);
	});
}