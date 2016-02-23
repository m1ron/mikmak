/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */

/** On document ready */
$(document).ready(function () {
	window.body = $('body');
	window.images = 'img/';

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
			initUI();
		}, 10);
		img = false;
	}

	var img = new Image();
	$(img).on('load', showPreloader);
	img.src = images + 'preloader.jpg';
}


/**
 *  Initialize UI
 * */
function initUI() {

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

	$.html5Loader({
		filesToLoad: {
			"files": [
				{
					"type": "VIDEO",
					"sources": {
						"h264": {
							"source": "./video/forward.mp4",
							"size": 3707.360
						},
						"webm": {
							"source": "./video/forward.webm",
							"size": 1309.349
						}
					}
				},
				{
					"type": "VIDEO",
					"sources": {
						"h264": {
							"source": "./video/backward.mp4",
							"size": 3700.735
						},
						"webm": {
							"source": "./video/backward.webm",
							"size": 1216.921
						}
					}
				}
			]
		},
		onBeforeLoad: function () {
		},
		onComplete: function () {
			setTimeout(function () {
				body.removeClass('loading-hidden');
				playVideo(1);
				setTimeout(function () {
					body.removeClass('loading');
				}, 400);
			}, 3000);
		},
		onElementLoaded: function (obj, elm) {
		},
		onUpdate: function (percentage) {
		}
	});
}


/**
 * Initialize video
 * */
function initVideo() {
	$('.video').each(function () {

		var self = $(this);

		window.v = {};
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

			var to = +v.sections[index].time;

			//console.log('FW #' + index + ' from ' + v.forward.currentTime + 's' + ' to ' + to + 's');
			setTimeout(function () {
				v.backward.currentTime = v.duration - to;
			}, 50);

			v.interval = setInterval(function () {
				var c = v.forward.currentTime;
				if (c >= to) {
					v.forward.pause();
					onPause();
					//console.log('forward: ' + v.forward.currentTime + ' backward: ' + v.backward.currentTime);
				}
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
				if (event.deltaY > 0) {
					if (v.active > 1) {
						playVideo(v.active - 1);
					}
				} else if (event.deltaY < 0) {
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


		/** Generate dots */
		v.dots = $('<ul/>').addClass('dots');
		for (i = 0; i < v.sections.length; i++) {
			$('<li/>').append('<a href="#' + v.sections[i].id + '" data-section="' + i + '" title="' + v.sections[i].title + '"/>').appendTo(v.dots);
		}
		$('a', v.dots).on('click', onClick);
		v.dots.appendTo(self);
	});
}