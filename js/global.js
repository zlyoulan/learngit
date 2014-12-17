(function (window, document, $) {

	$(function () {
		$('input, textarea').placeholder();

		/**
		 * listen to the search open and close event
		 */
		$('.open-header-search').click(function(event) {
		  $('#header').addClass('search');
		});
		$('.close-header-search').click(function(event) {
		  $('#header').removeClass('search');
		});

		/**
		 * automatically fill the color value to specified style
		 * four possible values for data-color-apply
		 * txt: set the text color;
		 * hover-txt: set the hover text color; 
		 * bg: set the background color;
		 * btn: set the button style and its hover style;
		 * btn-reverse: set the reversed button style and its hover style;
		 */
		var elements = $('[data-color]');
		$.each(elements, function(index, el) {
		  var $el = $(el);
		  var colorValue = $el.data('color');
		  var applyTo = $el.data('color-apply');
		  switch(applyTo) {
		    case "txt": {
		      $el.css('color', colorValue);
		      break;
		    }
		    case "hover-txt": {
		      $el.hover(function() {
		        $(this).css('color', colorValue);
		      }, function() {
		        $(this).css('color', 'inherit');
		      });
		      break;
		    }
		    case "bg": {
		      $el.css('backgroundColor', colorValue);
		      break;
		    }
		    case "btn": {
		      $el.css('backgroundColor', colorValue);
		      break;
		    }
		    case "btn-reverse": {
		      $(this).css({
		        color: colorValue,
		        borderColor: colorValue,
		        backgroundColor: '#FFF'
		      });
		      $el.hover(function() {
		        $(this).css({
		          color: '#FFF',
		          borderColor: colorValue,
		          backgroundColor: colorValue
		        });
		      }, function() {
		        $(this).css({
		          color: colorValue,
		          borderColor: colorValue,
		          backgroundColor: '#FFF'
		        });
		      });
		      break;
		    }
		  }
		});
	});

})(window, document, jQuery); 