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


	/** Fullpage */
	$('.fullpage').each(function () {
		$(this).fullpage({
			menu: '#dots',
			css3: true,
			touchSensitivity: 10,
			scrollOverflow: true,
			keyboardScrolling: false,
			animateAnchor: false,
			recordHistory: false,
			verticalCentered: true,
			resize: false,
			scrollingSpeed: 1000
		});
		$('.down', this).on('click', function (event) {
			$.fn.fullpage.moveSectionDown();
			event.preventDefault();
		});
		$.fn.fullpage.setAllowScrolling(false);
	});
});