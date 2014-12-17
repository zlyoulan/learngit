(function (window, document, $) {
	$(function () {
		$("style[media]").waitUntilExists(function function_name (argument) {
			$(document).trigger('resize');
		}, false);
		
	});

	/**
	 * Waiting JS plugin
	 * Author: Ryan Lester(buu700)
	 * https://gist.github.com/buu700/4200601
	 * https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
	 */
	
	/**
	 * @function
	 * @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
	 * @param {function} handler A function to execute at the time when the element is inserted
	 * @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
	 * @example $(selector).waitUntilExists(function);
	 */
	$.fn.waitUntilExists = function (handler, shouldRunHandlerOnce, isChild) {
    var found       = 'found';
    var $this       = $(this.selector);
    var $elements   = $this.not(function () { return $(this).data(found); }).each(handler).data(found, true);

    if (!isChild)
    {
        (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
            window.setInterval(function () { $this.waitUntilExists(handler, shouldRunHandlerOnce, true); }, 500)
        ;
    }
    else if (shouldRunHandlerOnce && $elements.length)
    {
        window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
    }

    return $this;
	}
})(window, document, jQuery); 