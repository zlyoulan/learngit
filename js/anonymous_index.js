(function (window, document, $) {

  $(function () {
    /**
     * resize listener, adjust the slider height depending on windows height
     * @param [outRangeHeight] contant represents the rest height of the glass part. 
     * @param [imgMaxHeight]    image original height, it should be a fixed value as 1600
     * @param [imgMaxWidth]     image original width, it should be a fixed value as 2560
     */
    var outRangeHeight = 150;
    function sliderImageAdjust () {
        var winHeight = $(window).height();
        var $imgHolder = $('.flex-img-holder');
        $imgHolder.height(winHeight + outRangeHeight);
    }
    sliderImageAdjust();
    $(window).on('resize', function () {
      sliderImageAdjust();
      adjustFlexNavWidth();
    });


    /**
     * activate the banner slider
     */
    $('.bannerslider .flexslider').flexslider({
      animation: "slide",
      controlNav: "thumbnails",
      directionNav: false,
      controlsContainer: ".controlNavContainer",
      init: function () {
        $(".bannerslider .flexslider").append($(".bannerslider .controlNavContainer"));
      }
    });


    /**
     * activate the classes slider
     */
    $('.discover-course > .flexslider').flexslider({
      animation: "slide",
      animationSpeed: 1000,
      animationLoop: false, 
      slideshow: false,
      manualControls: ".discover-course .tab-control > li",
      sync: ".more-course .flexslider",
      prevText: "",
      nextText: "",     
      init: function () {
        $(".discover-course .flexslider .container").append($(".discover-course .flex-viewport"));

      },
      start: function () {
        adjustFlexNavWidth();
      }
    });


    // $('.discover-course .flex-disabled').on('click touchend MSPointerUp', function(event) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   console.log(2);
    //   return false;
    // });



    /**
     * adjust flex nav width
     */
    function adjustFlexNavWidth () {
      var width = ($(window).width() - $('.container').width()) / 2;
      $('.discover-course .flex-direction-nav a').width(width);
    }


    /**
     * customize the banner slider hover event
     */
    $('.bannerslider .flex-control-thumbs img').mouseover(function(event) {
      $(this).click();
    });

    /**
     * active the sync text slider
     */
    $('.more-course .flexslider').flexslider({
      animation: "slide",
      animationSpeed: 1000,
      animationLoop: false, 
      slideshow: false,
      controlNav: false,
      directionNav: false,
      init: function () {

      }
    });


    /**
     * activate the dotdotdot plugin to achieve multiline ellipsis
     */
    $('.study-method .media-body p').dotdotdot({
      height: 51,
      wrap: 'letter',
      watch : true
    });
    


    /**
     * scroll down js
     */
    $('.study-method a').click(function(event) {
      event.preventDefault();
        var target = this.hash,
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 500, 'swing', function () {
            window.location.hash = target;
        });
    });

  });
})(window, document, jQuery); 