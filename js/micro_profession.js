(function (window, document, $) {
  $(function () {
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


    /**
     * data-hover-id: for each profession, give it an identical value, like ID in the data model
     * then the two separate parts can be hover synchronized
     */
    $('[data-hover-id]').hover(function() {
      var id = $(this).data('hover-id');
      $('[data-hover-id=' + id + ']').addClass('active');
    }, function() {
      var id = $(this).data('hover-id');
      $('[data-hover-id=' + id + ']').removeClass('active');
    });


    /**
     * scroll down js
     */
    $('.jumbotron.micro-profession a').click(function(event) {
      event.preventDefault();
      var target = this.hash,
      $target = $(target);
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 500, 'swing', function () {
          window.location.hash = target;
      });
    });

    /**
     * activate dotdotdot plugin
     */
    $('.micro-profession-detail .media-body > p').dotdotdot({
      watch: true
    });


    /**
     * autogrow textarea
     * https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
     */
    function autogrow ($field) {
        function resize () {
            $field.height('auto');
            $field.outerHeight($field.prop("scrollHeight"));
        }
        /* 0-timeout to get the already changed text */
        function delayedResize () {
            window.setTimeout(resize, 0);
        }

        $field.on('change', resize);
        $field.on('cut paste drop keydown', delayedResize);

        // $field.focus();
        // $field.select();
        // resize();
    }
    $('#profession-feedback-field').focus(function(event) {
      autogrow($(this));
    });
  })
  
})(window, document, jQuery); 