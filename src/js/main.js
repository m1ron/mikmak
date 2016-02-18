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


	/** On dot click */
	function onClick(e) {
		var a = $(this), li = a.closest('li');
		if (!li.hasClass('active') && !v.disabled) {
			playVideo(a.data('section'));
			li.prevAll().andSelf().addClass('played');
			li.nextAll().removeClass('played');
			li.siblings('.active').removeClass('active');
		}
		e.preventDefault();
	}


	/** Play video section (integer) */
	function playVideo(index) {
		var duration = v.sections[index].time - v.forward.currentTime;
		v.self.addClass('loaded');
		if (index - v.active > 1) {
			for (var i = v.active + 1; i < index; i++) {
				duration = duration + (v.sections[i].time - v.forward.currentTime);
			}
		}
		v.disabled = true;
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
		v.jqforward.show();
		v.jqbackward.hide();
		console.log('FW #' + index + ' from ' + v.forward.currentTime + 's' + ' to ' + v.sections[index].time + 's');
		var c, interval = setInterval(function () {
			c = v.forward.currentTime;
			if (c >= v.sections[index].time - .3) {
				onPause();
				if (c >= v.sections[index].time) {
					clearInterval(interval);
					v.forward.pause();
					v.backward.currentTime = Math.abs(+v.forward.currentTime - +v.forward.duration);
					console.log('forward: ' + v.forward.currentTime + ' backward: ' + v.backward.currentTime);
					v.disabled = false;
				}
			}
		}, 5);
	}


	/** On video paying backward */
	function playBackward(index, duration) {
		v.jqforward.hide();
		v.jqbackward.show();
		duration = Math.abs(duration);
		console.log('BW #' + index + ' from ' + v.backward.currentTime + 's' + ' to ' + (v.forward.duration - v.sections[index].time) + 's');
		var c, interval = setInterval(function () {
			c = v.backward.currentTime;
			if (c >= (v.forward.duration - v.sections[index].time) - .3) {
				onPause();
				if (c >= (v.forward.duration - v.sections[index].time)) {
					clearInterval(interval);
					v.backward.pause();
					v.forward.currentTime = Math.abs(+v.backward.currentTime - +v.forward.duration);
					console.log('forward: ' + v.forward.currentTime + ' backward: ' + v.backward.currentTime);
					v.disabled = false;
				}
			}
		}, 5);
	}

	/** On video paused */
	function onPause() {
		v.dots.find('li').eq(v.active).addClass('active').find('a').each(function () {
			var target = $($(this).attr('href'));
			target.addClass('pre');
			setTimeout(function () {
				target.addClass('active');
			}, 20);
		});
		v.disabled = false;
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

	playVideo(1);
}