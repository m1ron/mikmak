/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */

var g = document.getElementsByTagName('body')[0], e = document.documentElement;

/** Detect portrait mode */
function detectPortrait() {
	if ((window.innerWidth || e.clientWidth || g.clientWidth) < (window.innerHeight || e.clientHeight || g.clientHeight)) {
		if (+g.className.indexOf('portrait') < 0) {
			g.className += ' portrait';
		}
		g.className = g.className.replace('landscape', '');
	} else {
		if (+g.className.indexOf('landscape') < 0) {
			g.className += ' landscape';
		}
		g.className = g.className.replace('portrait', '');
	}
}

/** Detect browser */
function detectBrowser() {
	window.browser = {};
	browser.opera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	browser.firefox = typeof InstallTrigger !== 'undefined';
	browser.safari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	browser.ie = /*@cc_on!@*/false || !!document.documentMode;
	browser.edge = !browser.ie && !!window.StyleMedia;
	browser.chrome = !!window.chrome && !!window.chrome.webstore;
	for (var key in browser) {
		if (browser.hasOwnProperty(key)) {
			if (browser[key]) {
				document.getElementsByTagName('body')[0].setAttribute("browser", key);
			}
		}
	}
}

function detectVersion() {
	window.version = 'video';
	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)) {
		version = 'mobile';
	}
	if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
		version = 'simple';
	}
	//version = 'mobile';
	//version = 'simple';

	if (version === 'simple') {
		$('body').addClass('simple');
	} else if (version === 'mobile') {
		$('body').addClass('mobile');
	}
}

function onResize() {
	detectPortrait();
	if (version === 'simple') {
		if (typeof $.fn.fullpage != 'undefined') {
			$.fn.fullpage.reBuild();
		}
	}
}

(function () {
	detectPortrait();
	detectBrowser();
	detectVersion();
})();

/** On document ready */
$(document).ready(function () {

	/** Fastclick */
	FastClick.attach(document.body);

	/** Clear address bar hash */
	if (window.navigator.userAgent.indexOf('MSIE ') < 0) {
		history.pushState('', document.title, window.location.pathname);
	}

	/** Resize event */
	$(window).on('resize', onResize);

	/** Main variables */
	window.body = $('body');
	window.v = {};

	/** Paths */
	v.path = {
		img: './img/',
		sequence: './img/sequence/',
		audio: './audio/',
		video: './video/'
	};

	/** Video sections array */
	v.sections = [
		{time: .4, id: 'intro', title: 'Intro'},
		{time: 3.4, id: 'about', title: 'About us'},
		{time: 5.2, id: 'process', title: 'Our process'},
		{time: 7.3, id: 'news', title: 'News'},
		{time: 9.65, id: 'skills', title: 'Our skills'},
		{time: 20.2, id: 'viralize', title: 'Viralize'},
		{time: 23, id: 'references', title: 'References'},
		{time: 25.6, id: 'contact', title: 'Contact'},
		{time: 28.6, id: 'finish', title: 'Finish'}
	];

	/** Audio files array */
	v.audio = [
		{name: 'lamp', time: 2, mp3: 22, volume: .15},
		{name: 'knife', time: 5, mp3: 19, volume: .2},
		{name: 'pan', time: 5.3, mp3: 50, volume: .2},
		{name: 'pepper', time: 8.2, mp3: 21, volume: .15},
		{name: 'sauce', time: 9.7, mp3: 63, volume: .2},
		{name: 'cash', time: 27, mp3: 38, volume: .2},
		{name: 'coins', time: 27.7, mp3: 18, volume: .4}
	];

	/** Simple files array */
	v.simple = [
		{name: 'sections/about.png'},
		{name: 'sections/process.png'},
		{name: 'sections/news.png'},
		{name: 'sections/skills.png'},
		{name: 'sections/references.png'},
		{name: 'sections/viralize.png'},
		{name: 'sections/contact.png'},
		{name: 'sections/thankyou.png'},
		{name: 'pages/about.png'},
		{name: 'pages/process.png'},
		{name: 'pages/news.png'},
		{name: 'pages/skills.png'},
		{name: 'pages/references.png'},
		{name: 'pages/viralize.png'},
		{name: 'pages/contact.png'}
	];

	/** Mobile files array */
	v.sequence = [
		{name: 'sequence/index-1.png'},
		{name: 'sequence/index-2.png'},
		{name: 'sequence/index-3.png'}
	];

	/** Video files array */
	v.video = [
		[
			{node: 'about', name: 'about-intro', src: v.path.video + 'about-intro', mp4: 634.701, webm: 201.710, duration: 2.36},
			{node: 'about', name: 'about-loop', src: v.path.video + 'about-loop', mp4: 369.265, webm: 79.154, duration: 2.8}
		], [
			{node: 'process', name: 'process-intro', src: v.path.video + 'process-intro', mp4: 543.333, webm: 182.958, duration: 2.36},
			{node: 'process', name: 'process-loop', src: v.path.video + 'process-loop', mp4: 320.474, webm: 61.036, duration: 2.6}
		], [
			{node: 'news', name: 'news-intro', src: v.path.video + 'news-intro', mp4: 929.289, webm: 335.333, duration: 2.56},
			{node: 'news', name: 'news-loop', src: v.path.video + 'news-loop', mp4: 468.418, webm: 117.753, duration: 2.56}
		], [
			{node: 'skills', name: 'skills-intro', src: v.path.video + 'skills-intro', mp4: 642.597, webm: 202.903, duration: 2.56},
			{node: 'skills', name: 'skills-loop', src: v.path.video + 'skills-loop', mp4: 532.625, webm: 140.351, duration: 2.6}
		], [
			{node: 'viralize', name: 'viralize-intro', src: v.path.video + 'viralize-intro', mp4: 1001.844, webm: 319.256, duration: 2.56},
			{node: 'viralize', name: 'viralize-loop', src: v.path.video + 'viralize-loop', mp4: 640.254, webm: 218.743, duration: 2.08}
		], [
			{node: 'references', name: 'references-intro', src: v.path.video + 'references-intro', mp4: 359.206, webm: 93.870, duration: 2.56},
			{node: 'references', name: 'references-loop', src: v.path.video + 'references-loop', mp4: 246.142, webm: 52.603, duration: 2.6}
		], [
			{node: 'contact', name: 'contact-intro', src: v.path.video + 'contact-intro', mp4: 491.160, webm: 196.676, duration: 2.56},
			{node: 'contact', name: 'contact-loop', src: v.path.video + 'contact-loop', mp4: 197.780, webm: 50.846, duration: 2.6}
		]
	];

	if (version === 'video') {
		var figure = $('<figure/>');
		figure.addClass('video').addClass('video-index');
		vid = $('<video/>');
		vid.attr({'width': '320', 'height': '180', 'poster': 'img/poster.png'}).attr('muted', true).attr('preload', 'auto');
		$(vid).addClass('forward visible').addClass(this.name).addClass('visible');
		vid.append('<source src="video/index-forward.mp4" type="video/mp4">');
		vid.append('<source src="video/index-forward.webm" type="video/webm">');
		figure.append(vid);
		vid = $('<video/>');
		vid.attr({'width': '320', 'height': '180', 'poster': 'img/poster.png'}).attr('muted', true).attr('preload', 'auto');
		$(vid).addClass('backward').addClass(this.name).addClass('visible');
		vid.append('<source src="video/index-backward.mp4" type="video/mp4">');
		vid.append('<source src="video/index-backward.webm" type="video/webm">');
		figure.append(vid);
		figure.appendTo($('#index'));
	}

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
			if (files.length > 0) {
				$.html5Loader({
					filesToLoad: {
						"files": files
					},
					onComplete: onLoadComplete
				});
			} else {
				onLoadComplete();
			}
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

	/** Preloading image sequences for mobile version */
	if (version === 'mobile') {
		$(v.sequence).each(function (i) {
			files.push({"type": "IMAGE", "source": v.path.img + v.sequence[i].name});
		});
	}

	var img = new Image(), preloader = $('.preloader'), n = 'preloader.jpg';
	$(img).on('load', showPreloader);
	if ($(window).width() === 320) {
		n = 'preloader.gif';
	}
	img.src = window.v.path.img + n;
}


/**
 *  Initialize UI
 **/
function initUI() {

	var smallDelay = 20, longDelay = 500;

	/** Menu handler */
	function menuHandler(event) {
		if ($(event.target).closest('.nav').length === 0) {
			toggleAction();
		}
	}

	/** On header click */
	function toggleAction() {
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
		return false;
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
			if (version === 'simple') {
				if (typeof  $.fn.fullpage.setAllowScrolling !== 'undefined') {
					$.fn.fullpage.setAllowScrolling(false);
				}
			}
			if (version === 'video') {
				intro.attr('preload', 'auto');
				loop.attr('preload', 'auto');
			}
			body.addClass('inner').removeClass('nav-open').off('click', menuHandler);
			target.addClass('pre');
			setTimeout(function () {
				target.addClass('active');
				$('.ps-container:visible').perfectScrollbar('update');
				setTimeout(function () {
					if (version != 'simple') {
						var d = 0;
						if (version === 'video') {
							intro[0].play();
							setTimeout(function () {
								intro.removeClass('visible playing');
								if (version === 'video') {
									loop[0].play();
								}
								if (version === 'mobile') {
									loop.addClass('playing');
								}
								loop.addClass('visible');
							}, +intro[0].duration * 1000 + 500);
						}
						if (version === 'mobile') {
							intro.addClass('playing');
						}
					}
				}, longDelay);
			}, smallDelay);
		}
	}

	/** Close inner page */
	function closeInner() {
		var target = $('.page.active');
		//$('.loop', target)[0].stop();
		body.removeClass('inner');
		target.removeClass('active');
		setTimeout(function () {
			target.removeClass('pre');
			if (version === 'video') {
				$('.intro', target).addClass('visible')[0].currentTime = 0;
				$('.loop', target).removeClass('visible')[0].currentTime = 0;
			}
			if (version === 'mobile') {
				$('.intro', target).addClass('visible');
				$('.loop', target).removeClass('visible playing');
			}
			v.disabled = false;
			if (typeof  $.fn.fullpage.setAllowScrolling !== 'undefined') {
				$.fn.fullpage.setAllowScrolling(true)
			}
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

	$('.page').each(function () {
		if ($(this).is('.page-scrollable')) {
			$(this).perfectScrollbar({
				suppressScrollX: true
			});
		}
		$('.white .space', this).perfectScrollbar({
			suppressScrollX: true
		});
		$('.white .heading, .portfolio .url', this).append('<span class="corner"><span><span></span></span></span>');
	});

	if (version === 'simple') {
		initSimple();
	} else if (version === 'mobile') {
		initMobile();
	} else {
		initVideo();
	}
}


/**
 * Initialize simple version of index page
 **/
function initSimple() {
	$('.page-index').each(function () {
		console.log('Initializing simple version');

		/** Generate dots */
		var dots = $('<p/>').addClass('dots').attr('id', 'dots');
		$('.sections .section').each(function (i) {
			$('<a href="#' + $(this).data('anchor') + '" data-menuanchor="' + $(this).data('anchor') + '"/>').text(i).appendTo(dots);
		});
		dots.appendTo(this);

		/* Fullpage */
		$('.sections').each(function () {
			$(this).fullpage({
				menu: '#dots',
				css3: true,
				touchSensitivity: 10,
				scrollOverflow: true,
				keyboardScrolling: false,
				animateAnchor: false,
				recordHistory: false,
				resize: false,
				scrollingSpeed: 1000
			});
			$('.down', this).on('click', function (event) {
				$.fn.fullpage.moveSectionDown();
				event.preventDefault();
			});
		});
	});
}


/**
 * Initialize image sequence version of index page
 **/
function initMobile() {
	$('.page-index').each(function () {
		console.log('Initializing image sequence version');
		$('.video').remove();
		var self = $(this), startTouchX = 0, startTouchY = 0;
		v.self = self;
		v.disabled = false;
		v.interval = [];

		$('<figure>').append('<div class="image"></div>').addClass('sequence sequence-intro').attr('data-time', '0').appendTo(this);
		v.sequence = $('.sequence', self);

		v.inners = [
			{to: 'about', type: 'intro', name: 'sequence/about.png', duration: 2.35},
			{to: 'process', type: 'intro', name: 'sequence/process.png', duration: 2.35},
			{to: 'news', type: 'intro', name: 'sequence/news.png', duration: 2.55},
			{to: 'skills', type: 'intro', name: 'sequence/skills.png', duration: 2.55},
			{to: 'viralize', type: 'intro', name: 'sequence/viralize.png', duration: 2.55},
			{to: 'references', type: 'intro', name: 'sequence/references.png', duration: 2.55},
			{to: 'contact', type: 'intro', name: 'sequence/contact.png', duration: 2.55}
		];

		$(v.inners).each(function () {
			$('<figure>').append('<div class="image"></div>').addClass('sequence ' + this.type + ' visible sequence-' + this.to + '-inner').attr('data-time', this.duration).appendTo('#' + this.to);
		});
		//$('.loop').removeClass('visible');

		var w = $(window), x = 0, y = 0, m = 0;
		$('.sequence').each(function () {
			var _this = $(this), image = $('.image', _this), iw = image.width(), ih = image.height();
			$(window).on('resize', function () {
				if (_this.hasClass('intro') || _this.hasClass('loop')) {
					m = w.width() / iw * 1.25;
				} else if ($('body').hasClass('landscape')) {
					x = w.width() / iw * 1.55;
					y = w.height() / ih * 1.55;
					m = Math.max(x, y);
				} else {
					x = w.width() / iw * 1.01;
					y = w.height() / ih * 1.01;
					m = Math.max(x, y);
				}
				image[0].style.webkitTransform = 'scale(' + m + ')';
				image[0].style.MozTransform = 'scale(' + m + ')';
				image[0].style.msTransform = 'scale(' + m + ')';
				image[0].style.OTransform = 'scale(' + m + ')';
				image[0].style.transform = 'scale(' + m + ')';
			});
		});
		$(window).trigger('resize');

		var filesIndex = [
			{"type": "IMAGE", "source": v.path.img + 'sequence/index-4.jpg'},
			{"type": "IMAGE", "source": v.path.img + 'sequence/index-5.jpg'},
			{"type": "IMAGE", "source": v.path.img + 'sequence/index-6.png'}
		];
		setTimeout(function () {
			$.html5Loader({
				filesToLoad: {
					"files": filesIndex
				}
			});
			$('body').addClass('load-inners');
			setTimeout(function () {
				files = [];
				$(v.inners).each(function (i) {
					files.push({"type": "IMAGE", "source": v.path.img + v.inners[i].name});
				});
				setTimeout(function () {
					$.html5Loader({
						filesToLoad: {
							"files": files
						}
					});
				}, 100);
			}, 50);
		}, 50);

		v.duration = 28.88;
		v.active = 0;
		v.next = 1;
		v.time = 0;
		v.page = 1;

		/** Generate dots */
		v.dots = $('<p/>').addClass('dots');
		for (var i = 0; i < v.sections.length; i++) {
			$('<a href="#' + v.sections[i].id + '" data-section="' + i + '" title="' + v.sections[i].title + '"/>').text(i).on('click', onDotsClick).appendTo(v.dots);
		}
		v.dots.appendTo(self);

		/** Play video section (integer) */
		window.playMobile = function (index) {
			v.disabled = true;
			$(document).off('mousewheel', onWheelStart).off('touchstart', onTouchStart).off('touchmove', onTouchMove);

			var a = v.dots.find('a').eq(index);
			a.prevAll().andSelf().addClass('played');
			a.nextAll().removeClass('played');
			a.siblings('.active').removeClass('active');

			var duration = v.sections[index].time - (v.time / 1000);
			if (index - v.active > 1) {
				for (var i = v.active + 1; i < index; i++) {
					duration = duration + (v.sections[i].time - v.sections[v.active].time);
				}
			}

			v.active = index;
			$('.section.active').removeClass('active');
			setTimeout(function () {
				$('.section.pre').removeClass('pre');
			}, 200);
			duration = Math.floor(duration * 1000);
			console.log('active ' + v.active + ' from ' + v.time + ' to ' + v.sections[index].time * 1000 + ' with ' + duration);

			if (+duration >= 0) {
				v.sequence.attr('class', 'sequence').addClass('sequence-' + v.sections[v.active].id).addClass('playing');
				v.time = v.time + duration;
				console.log(v.time);
				setTimeout(function () {
					onMobilePaused(false);
				}, duration);
			} else {
				v.sequence.addClass('playing');
				v.time = v.time - Math.abs(duration);
				console.log(v.time);
				setTimeout(function () {
					onMobilePaused(true);
				}, Math.abs(duration));
			}
		};


		function onMobilePaused(rewind) {
			//if (v.active + 1 < v.sections.length) {
			if (rewind) {
				v.sequence.attr('class', 'sequence').addClass('sequence-' + v.sections[v.active].id).addClass('reverse');
			}
			v.sequence.removeClass('playing');
			$(document).on('mousewheel', onWheelStart).on('touchstart', onTouchStart).on('touchmove', onTouchMove);
			v.disabled = false;
			v.sequence.attr('data-time', v.sections[v.active].time);
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
					if (v.active > 0) {
						playMobile(v.active - 1);
					}
				} else if ((event.deltaY < 0) || (event.deltaX < 0)) {
					if (v.active < v.sections.length - 1) {
						playMobile(v.active + 1);
					}
				}
				event.preventDefault();
			}
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
					playMobile(v.active - 1);
				}
			}
			if (((startTouchX - event.originalEvent.touches[0].pageX) > 9) || ((startTouchY - event.originalEvent.touches[0].pageY) > 9)) {
				if (v.active < v.sections.length - 1) {
					playMobile(v.active + 1);
				}
			}
			event.preventDefault();
		}

		/** On dots click */
		function onDotsClick(e) {
			if (!$(this).hasClass('active') && !v.disabled) {
				playMobile(+$(this).data('section'));
			}
			e.preventDefault();
		}

		playMobile(0);
	});
}


/**
 * Initialize index page with video
 **/
function initVideo() {
	$('.page-index').each(function () {
		console.log('Initializing video version');
		var self = $(this), startTouchX = 0, startTouchY = 0;
		v.self = self;
		v.disabled = false;
		v.interval = [];

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
		$(v.video).each(function (i) {
			var figure = $('<figure/>');
			figure.addClass('video');
			$(v.video[i]).each(function () {
				vid = $('<video/>');
				vid.attr({'width': '320', 'height': '180', 'poster': 'img/poster.png'}).attr('muted', true);
				if (this.name.indexOf('intro') >= 0) {
					$(vid).addClass('intro').addClass(this.name).addClass('visible').attr('preload', 'auto');
				}
				if (this.name.indexOf('loop') >= 0) {
					$(vid).addClass('loop').addClass(this.name).attr('preload', 'none').attr('loop', true);
				}
				vid.append('<source src="' + this.src + '.mp4" type="video/mp4">');
				vid.append('<source src="' + this.src + '.webm" type="video/webm">');
				figure.append(vid);
			});
			//console.log(figure[0]);
			figure.appendTo($('#' + v.video[i][0].node));
		});

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
						//console.log(c + ' ' + v.audio[i].time);
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

			var i = v.audio.length - 1;
			while (i >= 0) {
				if ((v.audio[i].played === true)) {
					//console.log('reverted: ' + i);
					v.audio[i].played = false;
					break;
				}
				i--;
			}

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
					if (v.active > 0) {
						playVideo(v.active - 1);
					}
				} else if ((event.deltaY < 0) || (event.deltaX < 0)) {
					if (v.active < v.sections.length - 1) {
						playVideo(v.active + 1);
					}
				}
				event.preventDefault();
			}
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

		playVideo(0);
	});
}