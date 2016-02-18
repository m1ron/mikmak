/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */

/** On document ready */
$(document).ready(function () {

	/** Fastclick */
	FastClick.attach(document.body);

	/** Header */
	$('.header').each(function () {
		var body = $('body'), time = 300;

		function Handler(event) {
			var target = $(event.target);
			if (target.closest('.pure-menu').length === 0) {
				Toggle(event);
			}
		}

		function Toggle(e) {
			if (body.hasClass('nav-open')) {
				body.removeClass('nav-open').unbind('touchstart click', Handler);
				setTimeout(function () {
					body.removeClass('nav-pre');
				}, time);
			} else {
				body.addClass('nav-pre');
				setTimeout(function () {
					body.addClass('nav-open').bind('touchstart click', Handler);
				}, 10);
			}
			e.preventDefault();
		}

		$('.toggle', this).on('click', Toggle);
	});

	/** Video */
	$('.video').each(initVideo);
});


/** Initialize video*/
function initVideo() {
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
	function playVideo(index) {
		v.disabled = true;
		$(document).off('mousewheel', onWheel);

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
			playForward.call(this, index, duration);
		} else {
			v.backward.play();
			playBackward.call(this, index, duration);
		}
	}


	/** On video paying forward */
	function playForward(index, duration) {
		v.jqforward.addClass('visible');
		v.jqbackward.removeClass('visible');

		var to = +v.sections[index].time;

		console.log('FW #' + index + ' from ' + v.forward.currentTime + 's' + ' to ' + to + 's');
		setTimeout(function () {
			v.backward.currentTime = v.duration - to;
		}, 100);

		v.interval = setInterval(function () {
			var c = v.forward.currentTime;
			if (c >= to) {
				v.forward.pause();
				onPause();
				console.log('forward: ' + v.forward.currentTime + ' backward: ' + v.backward.currentTime);
			}
		}, 20);
	}


	/** On video paying backward */
	function playBackward(index, duration) {
		v.jqforward.removeClass('visible');
		v.jqbackward.addClass('visible');

		duration = Math.abs(duration);
		var to = +(v.duration - v.sections[index].time);

		console.log('BW #' + index + ' from ' + v.backward.currentTime + 's' + ' to ' + to + 's');
		setTimeout(function () {
			v.forward.currentTime = v.duration - to;
		}, 100);

		v.interval = setInterval(function () {
			var c = v.backward.currentTime;
			if (c >= to) {
				v.backward.pause();
				onPause();
				console.log('forward: ' + v.forward.currentTime + ' backward: ' + v.backward.currentTime);
			}
		}, 20);
	}


	/** On video paused */
	function onPause() {
		clearInterval(v.interval);
		$(document).on('mousewheel', onWheel);
		v.disabled = false;
		v.dots.find('li').eq(v.active).addClass('active').find('a').each(function () {
			var target = $($(this).attr('href'));
			target.addClass('pre');
			setTimeout(function () {
				target.addClass('active');
			}, 20);
		});
	}


	/** On first touch */
	function onTouch() {
		playVideo(1);
		$(document).off('touchstart', onTouch);
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


	/** Video sections array */
	v.sections = [
		{time: 0, id: 'preloader', title: 'Preloader'},
		{time: 2.5, id: 'about', title: 'About us'},
		{time: 5.15, id: 'process', title: 'Our process'},
		{time: 7.5, id: 'news', title: 'News'},
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

	/* Horizontal carousel */
	//.on('touchstart', onTouch);
	playVideo(1);
}