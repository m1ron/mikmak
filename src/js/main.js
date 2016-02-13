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
	v.disabled = false;
	v.jqvideo = $('video', self);
	v.video = v.jqvideo[0];
	v.active = 0;
	v.next = 1;


	/**
	 * On dot click
	 **/
	function Click(e) {
		var a = $(this), li = a.closest('li');
		if (!li.hasClass('played') && !li.hasClass('active') && !v.disabled) {
			Play(a.data('section'));
			li.prevAll().andSelf().addClass('played');
			li.siblings('.active').removeClass('active');
		}
		e.preventDefault();
	}


	/**
	 * Play video section (integer)
	 **/
	function Play(index) {
		//console.log(v.sections[index].time);
		//console.log(v.video.currentTime);
		var duration = v.sections[index].time - v.video.currentTime;
		if (index - v.active > 1) {
			for (var i = v.active + 1; i < index; i++) {
				duration = duration + (v.sections[i].time - v.video.currentTime);
			}
		}
		v.disabled = true;
		v.active = index;
		$('.section.active').removeClass('active');
		setTimeout(function () {
			$('.section.pre').removeClass('pre');
		}, 200);

		console.log('#' + v.sections[index].id + ' ' + v.sections[index].time + 's' + ' with ' + duration);
		v.video.play();
		Playing.call(this, index, duration)
	}


	/**
	 * On video started paying
	 **/
	function Playing(index, duration) {
		v.jqvideo.off('playing', Playing);
		console.log('playing: ' + duration);
		var c, interval = setInterval(function () {
			c = v.video.currentTime;
			if (c >= v.sections[index].time - .3) {
				Pre();
				if (c >= v.sections[index].time) {
					clearInterval(interval);
					v.video.pause();
					console.log('end:' + v.video.currentTime);
					v.disabled = false;
				}
			}
		}, 5);
	}


	/**
	 * On video paused
	 **/
	function Pre() {
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
	//console.log(v.sections);

	/** Generate dots */
	v.dots = $('<ul/>').addClass('dots');
	for (i = 0; i < v.sections.length; i++) {
		$('<li/>').append('<a href="#' + v.sections[i].id + '" data-section="' + i + '" title="' + v.sections[i].title + '"/>').appendTo(v.dots);
	}
	$('a', v.dots).on('click', Click);
	v.dots.appendTo(self);

	/** Play preloader */
	Play(1);
}