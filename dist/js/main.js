/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */

var g = document.getElementsByTagName('body')[0], e = document.documentElement;

/** Detect portrait mode */
function detectPortrait() {
	if ((window.innerWidth || e.clientWidth || g.clientWidth) < (window.innerHeight || e.clientHeight || g.clientHeight)) {
		if (+g.className.indexOf('portrait') < 0) {
			g.className += ' portrait';
		}
	} else {
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
	var check = false;
	(function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
	})(navigator.userAgent || navigator.vendor || window.opera);
	if (check) {
		version = 'simple';
	}
	version = 'mobile';
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

	/** Audio files array */
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

	/** Video files array */
	v.video = [
		//{name: 'index-forward', src: v.path.video + 'index-forward', mp4: 4749.513, webm: 1309.349, duration: 28.88},
		//{name: 'index-backward', src: v.path.video + 'index-backward', mp4: 4013.301, webm: 1216.921, duration: 28.88}
		/*
		 {name: 'about-intro', src: v.path.video + 'about-intro', mp4: 634.701, webm: 201.710, duration: 2.36},
		 {name: 'about-loop', src: v.path.video + 'about-loop', mp4: 369.265, webm: 79.154, duration: 2.8},
		 {name: 'process-intro', src: v.path.video + 'process-intro', mp4: 543.333, webm: 182.958, duration: 2.36},
		 {name: 'process-loop', src: v.path.video + 'process-loop', mp4: 320.474, webm: 61.036, duration: 2.6},
		 {name: 'news-intro', src: v.path.video + 'news-intro', mp4: 929.289, webm: 335.333, duration: 2.56},
		 {name: 'news-loop', src: v.path.video + 'news-loop', mp4: 468.418, webm: 117.753, duration: 2.56},
		 {name: 'skills-intro', src: v.path.video + 'skills-intro', mp4: 642.597, webm: 202.903, duration: 2.56},
		 {name: 'skills-loop', src: v.path.video + 'skills-loop', mp4: 532.625, webm: 140.351, duration: 2.6},
		 {name: 'viralize-intro', src: v.path.video + 'viralize-intro', mp4: 1001.844, webm: 319.256, duration: 2.56},
		 {name: 'viralize-loop', src: v.path.video + 'viralize-loop', mp4: 640.254, webm: 218.743, duration: 2.08},
		 {name: 'references-intro', src: v.path.video + 'references-intro', mp4: 359.206, webm: 93.870, duration: 2.56},
		 {name: 'references-loop', src: v.path.video + 'references-loop', mp4: 246.142, webm: 52.603, duration: 2.6},
		 {name: 'contact-intro', src: v.path.video + 'contact-intro', mp4: 491.160, webm: 196.676, duration: 2.56},
		 {name: 'contact-loop', src: v.path.video + 'contact-loop', mp4: 197.780, webm: 50.846, duration: 2.6}
		 */
	];

	/*
	 v.sequence = [
	 {name: 'process-intro', len: 41},
	 {name: 'process-loop', len: 23}
	 ];
	 */

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

	/*
	 $(v.audio).each(function (i) {
	 files.push({"type": "AUDIO", "sources": {"mp3": {"source": v.path.audio + v.audio[i].name + '.mp3', "size": v.audio[i].mp3}}})
	 });
	 if (mobile) {
	 } else {
	 $(v.video).each(function (i) {
	 files.push({"type": "VIDEO", "sources": {"h264": {"source": v.video[i].src + '.mp4', "size": v.video[i].mp4}, "webm": {"source": v.video[i].src + '.webm', "size": v.video[i].webm}}})
	 });
	 }
	 $(v.sequence).each(function (i) {
	 var name = '';
	 for (var j = 0; j <= v.sequence[i].len; j++) {
	 files.push({"type": "IMAGE", "source": v.path.sequence + v.sequence[i].name + '/' + j + '.jpg'});
	 }
	 });
	 */

	/** Build files array for html5loader */
	var files = [];
	files.push({"type": "IMAGE", "source": v.path.img + '/logo.svg'});

	if (version === 'simple') {
		$(v.simple).each(function (i) {
			files.push({"type": "IMAGE", "source": v.path.img + v.simple[i].name});
		});
	} else {
		/** Building audio tags */
		setTimeout(function () {
			v.audioWrap = $('<div class="audio"/>');
			$(v.audio).each(function (i) {
				v.audio[i].node = $('<audio/>').append('<source src="' + v.path.audio + v.audio[i].name + '.mp3" type="audio/mpeg" preload>');
				v.audio[i].node[0].volume = v.audio[i].volume;
				v.audio[i].node.appendTo(v.audioWrap);
				v.audio[i].played = false;
			});
			v.audioWrap.appendTo(v.self);
		}, 1000);
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
			} else {
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
						intro[0].play();
						setTimeout(function () {
							intro.removeClass('visible');
							loop[0].play();
							loop.addClass('visible');
						}, +intro[0].duration * 1000 + 500);
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
		var self = $(this), startTouchX = 0, startTouchY = 0;
		v.self = self;
		v.disabled = false;
		v.interval = [];

		$('<figure>').addClass('sequence sequence-intro').attr('data-time', '0').appendTo(this);
		v.sequence = $('.sequence', self);

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
		function playMobile(index) {
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
				setTimeout(onMobilePaused, duration);
			} else {
				v.sequence.attr('class', 'sequence').addClass('sequence-' + v.sections[v.active].id).addClass('playing');
				v.time = v.time - duration;
				setTimeout(onMobilePaused, Math.abs(duration));
			}
		}


		function onMobilePaused() {
			if (v.active + 1 < v.sections.length) {
				v.sequence.attr('class', 'sequence').addClass('sequence-' + v.sections[v.active + 1].id);
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