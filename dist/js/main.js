/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */

(function () {
	window.browser = {};
	browser.opera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	browser.firefox = typeof InstallTrigger !== 'undefined';
	browser.safari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	browser.ie = /*@cc_on!@*/false || !!document.documentMode;
	browser.edge = !browser.ie && !!window.StyleMedia;
	browser.chrome = !!window.chrome && !!window.chrome.webstore;
	for (var key in browser) {
		if (browser.hasOwnProperty(key)) {
			console.log(key + " -> " + browser[key]);
			if (browser[key]) {
				var e = document.getElementsByTagName("body")[0];
				var a = document.createAttribute("browser");
				a.value = key;
				e.setAttributeNode(a);
			}
		}
	}
})();

/** On document ready */
$(document).ready(function () {

	window.v = {};
	window.body = $('body');

	/** Paths array */
	v.path = {
		img: './img/',
		sequence: './img/sequence/',
		audio: './audio/',
		video: './video/'
	};

	/** Audio files array */
	v.audio = [
		{name: 'lamp', time: 1.9, mp3: 22, volume: .15},
		{name: 'knife', time: 4.95, mp3: 19, volume: .2},
		{name: 'pan', time: 5.2, mp3: 50, volume: .2},
		{name: 'pepper', time: 8.2, mp3: 21, volume: .15},
		{name: 'sauce', time: 9.7, mp3: 63, volume: .2},
		{name: 'cash', time: 27, mp3: 38, volume: .2},
		{name: 'coins', time: 27.7, mp3: 18, volume: .4}
	];

	/** Video files array */
	v.video = [
		{name: 'index-forward', src: v.path.video + 'index-forward', mp4: 4749.513, webm: 1309.349, duration: 28.88},
		{name: 'index-backward', src: v.path.video + 'index-backward', mp4: 4013.301, webm: 1216.921, duration: 28.88},
		{name: 'process-intro', src: v.path.video + 'process-intro', mp4: 543.333, webm: 182.958, duration: 2.36},
		{name: 'process-loop', src: v.path.video + 'process-loop', mp4: 320.474, webm: 61.036, duration: 2.6}
	];

	/*
	 v.sequence = [
	 {name: 'process-intro', len: 41},
	 {name: 'process-loop', len: 23}
	 ];
	 */

	/** Fastclick */
	FastClick.attach(document.body);

	/** Start preloader */
	initPreloader();
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
				onComplete: onLoadComplete
			});
		}, 100);
		setTimeout(function () {
			body.removeClass('loading-timeout');
		}, 4000);
		img = false;
	}

	function onLoadComplete() {
		var int = setInterval(function () {
			if (!body.hasClass('loading-timeout')) {
				clearInterval(int);
				setTimeout(function () {
					body.removeClass('loading-hidden').removeClass('loading-timeout');
					setTimeout(function () {
						initUI();
						setTimeout(function () {
							body.removeClass('ui-hidden');
							preloader.remove();
						}, 2000);
					}, 500);
					setTimeout(function () {
						body.removeClass('loading');
					}, 2000);
				}, 50);
			}
		}, 50);
	}

	/** Build files array for html5loader */
	var files = [];
	$(v.audio).each(function (i) {
		files.push({"type": "AUDIO", "sources": {"mp3": {"source": v.path.audio + v.audio[i].name + '.mp3', "size": v.audio[i].mp3}}})
	});
	$(v.video).each(function (i) {
		files.push({"type": "VIDEO", "sources": {"h264": {"source": v.video[i].src + '.mp4', "size": v.video[i].mp4}, "webm": {"source": v.video[i].src + '.webm', "size": v.video[i].webm}}})
	});
	$(v.sequence).each(function (i) {
		var name = '';
		for (var j = 0; j <= v.sequence[i].len; j++) {
			files.push({"type": "IMAGE", "source": v.path.sequence + v.sequence[i].name + '/' + j + '.jpg'});
		}
	});

	var img = new Image(), preloader = $('.preloader');
	$(img).on('load', showPreloader);
	img.src = window.v.path.sequence + 'preloader.jpg';
}


/**
 *  Initialize UI
 **/
function initUI() {

	var smallDelay = 20,
		longDelay = 500;

	/** Menu handler */
	function menuHandler(event) {
		if ($(event.target).closest('.nav').length === 0) {
			toggleAction();
		}
	}

	/** On header click */
	function toggleAction(event) {
		if (body.hasClass('inner')) {// Go to inner oage
			closeInner();
		} else {// Open nav
			if (body.hasClass('nav-open')) {
				body.removeClass('nav-open').off('click', menuHandler);
			} else {
				setTimeout(function () {
					body.addClass('nav-open').on('click', menuHandler);
				}, smallDelay);
			}
		}
		event.preventDefault();
	}

	/** On menu click */
	function menuAction(event) {
		openInner($($(this).attr('href')));
		event.preventDefault();
	}

	/** Open inner page */
	function openInner(target) {
		var intro = $('.intro', target), loop = $('.loop', target);
		if (target.length > 0) {
			v.disabled = true;
			body.addClass('inner').removeClass('nav-open').off('click', menuHandler);
			target.addClass('pre');
			setTimeout(function () {
				target.addClass('active');
				setTimeout(function () {
					intro[0].play();
					setTimeout(function () {
						intro.removeClass('visible');
						loop[0].play();
						loop.addClass('visible');
					}, +intro.data('duration') * 1000 + 10);
				}, longDelay);
			}, smallDelay);
		}
		event.preventDefault();
	}

	/** Close inner page */
	function closeInner() {
		var target = $('.page.active');
		//$('.loop', target)[0].stop();
		body.removeClass('inner');
		target.removeClass('active');
		setTimeout(function () {
			target.removeClass('pre');
			$('.intro', target).addClass('visible')[0].currentTime = 0;
			$('.loop', target).removeClass('visible')[0].currentTime = 0;
			v.disabled = false;
		}, longDelay);
	}

	/** Header */
	$('.header').each(function () {
		$('.toggle', this).on('click', toggleAction);
	});

	/** Menu */
	$('.menu').each(function () {
		$('a', this).on('click', menuAction);
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
			v.audio[i].node = $('<audio/>').append('<source src="' + v.path.audio + v.audio[i].name + '.mp3" type="audio/mpeg" preload>');
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
		$(v.video).each(function (i) {
			$('.' + v.video[i].name).data('duration', v.video[i].duration);
		});

		v.jqforward = $('.forward', v.self);
		v.forward = v.jqforward[0];
		v.jqbackward = $('.backward', v.self);
		v.backward = v.jqbackward[0];
		v.duration = v.video[0].duration;
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