/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */

/**
 * On document ready
 */
$(document).ready(function () {

	/** Fastclick */
	FastClick.attach(document.body);

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