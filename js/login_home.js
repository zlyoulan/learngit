(function (window, document, $) {


  $(function () {
    /**
     * resize listener, adjust the slider height depending on windows height
     * @param [outRangeHeight] contant represents the rest height of the glass part. 
     * @param [imgMaxHeight]    image original height, it should be a fixed value as 1600
     * @param [imgMaxWidth]     image original width, it should be a fixed value as 2560
     */
    sliderImageAdjust();
    function sliderImageAdjust () {
        var $imgHolder = $('.login-home .flex-img-holder');
        $imgHolder.height(380);
    }
    

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
     * customize the banner slider hover event
     */
    $('.bannerslider .flex-control-thumbs img').mouseover(function(event) {
      $(this).click();
    });




    /**
     * relative global constant
     * predefined value
     */
    var cardPadding = 16;
    

    /**
     * There will be lots of variable reused frequently, 
     * but will changed with the screen resize,
     * see if we can pull them out and manage them better
     */
    var courseRowViewport = $('.course-row-viewport');

    var viewportWidth = courseRowViewport.width();
    var rowWidth = viewportWidth + cardPadding;
    var cardsNumPerRow = $(window).width() >= 1200 ? 4 : 3;
    var cardWidth = rowWidth / cardsNumPerRow;



    /**
     * update values when screen resize to certain width
     */
    var updateValues = function () {
      courseRowViewport = $('.course-row-viewport');
      viewportWidth = courseRowViewport.width();
      rowWidth = viewportWidth + cardPadding;
      cardsNumPerRow = $(window).width() >= 1200 ? 4 : 3;
      cardWidth = Math.floor(rowWidth / cardsNumPerRow);
    }
    

    /**
     * reset the course card width
     * should be called when the screen resize below or above 1200px;
     */
    var resetCourseCard = function () {
      var $courseRowViewport = $('.course-row-viewport');
      $.each($courseRowViewport, function(index, crv) {
        var cardsNum = $(crv).find('li').length;
        var rowsNum = Math.ceil(cardsNum / cardsNumPerRow);
        $(crv).find('.course-row').width(rowWidth * rowsNum);
        $(crv).find('li').outerWidth(cardWidth);
      });
    }


    /**
     * toggle expand the row viewport
     */
    $('.toggle-courses').on('click', toggleCoursesListener);
    
    function toggleCoursesListener () {
      $currentCourseRow = $(this).closest('.courses').find('.course-row');
      if ($(this).hasClass('expanded')) {
        $(this).removeClass('expanded');
        $(this).find('.glyphicon').removeClass('glyphicon-minus').addClass('glyphicon-plus');
        $(this).find('.txt').text('展开全部');
        collapseRow($currentCourseRow);
        resetRowPosition($currentCourseRow);
      } else {
        $(this).addClass('expanded');
        $(this).find('.glyphicon').removeClass('glyphicon-plus').addClass('glyphicon-minus');
        $(this).find('.txt').text('收起全部');
        expandRow($currentCourseRow);
      };
    }

    

    /**
     * row navigation to prev or next row
     */
    $('.course-row-nav').on('click', moveRowListener);

    function moveRowListener (evt) {
      if(!($(evt.target).hasClass('glyphicon'))) {
        return;
      }
      var $toggleBtn = $(this).siblings('.toggle-courses');
      $(this).off();
      $toggleBtn.off();
      var $clickedNavBtn = $(evt.target).parent('a');
      var $currentRowViewport = $(this).closest('.courses').find('.course-row-viewport');
      var $currentRow = $currentRowViewport.find('.course-row');
      var leftPos = parseInt($currentRow.css('left'));
      if($clickedNavBtn.hasClass('disabled')) {
        console.log($(this));
        $(this).on('click', moveRowListener);
        $(this).siblings('.toggle-courses').on('click', toggleCoursesListener);
        return;
      } else if ($clickedNavBtn.hasClass('prev')) {
        moveRow($currentRow, leftPos, $clickedNavBtn, moveToPrevRow);
      } else if ($clickedNavBtn.hasClass('next')) {
        moveRow($currentRow, leftPos, $clickedNavBtn, moveToNextRow);
      }
    }

    function moveRow ($row, leftPos, $navBtn, move) {
      move($row, leftPos , $navBtn);
      $navBtn.siblings('a').removeClass('disabled');
    }

    function moveToPrevRow ($row, leftPos, $navBtn) {
      var newLeftPos = leftPos + rowWidth;
      $row.animate({
        left: newLeftPos
      }, 500, function() {
        $navBtn.parent().on('click', moveRowListener);
        $navBtn.parent().siblings('.toggle-courses').on('click', toggleCoursesListener);
      });
      if(newLeftPos >= 0) {
        $navBtn.addClass('disabled');
      }
    }

    function moveToNextRow ($row, leftPos, $navBtn) {
      var newLeftPos = leftPos - rowWidth;
      var rowMaxLeft = $row.width() - rowWidth;
      $row.animate({
        left: newLeftPos
      }, 500, function() {
        $navBtn.parent().on('click', moveRowListener);
        $navBtn.parent().siblings('.toggle-courses').on('click', toggleCoursesListener);
      });
      if(newLeftPos <= -rowMaxLeft) {
        $navBtn.addClass('disabled');
      }
    }


    /**
     * expand the row
     */
    var expandRow = function ($row) {
      var $navBtns = $row.closest('.courses').find('.course-row-nav');
      $navBtns.addClass('hidden');
      $row.css({
        width: 'auto',
        left: '0'
      });
    }


    /**
     * collapse row
     */
    var collapseRow =  function ($row) {
      var cardsNum = $row.find('li').length;
      var rowsNum = Math.ceil(cardsNum / cardsNumPerRow);
      var $navBtns = $row.closest('.courses').find('.course-row-nav');
      $row.css('width', rowWidth * rowsNum);
      resetNavBtn($row.closest('.courses').find('.course-row-nav'));
      $navBtns.removeClass('hidden');
    }

    /**
     * reset the row position
     */
    var resetRowPosition = function ($row) {
      $row.css('left', 0);
    }


    /**
     * reset the nav btn
     */
    var resetNavBtn = function ($navBtns) {
      var $viewport = $navBtns.closest('.courses').find('.course-row-viewport');
      var $row = $viewport.find('.course-row');
      var $prev = $navBtns.find('.prev');
      var $next = $navBtns.find('.next');
      resetRowPosition($row);
      $prev.addClass('disabled');
      if($row.width() <= $viewport.width() + cardPadding) {
        $next.addClass('disabled');
      } else {
        $next.removeClass('disabled');
      }
      $navBtns.removeClass('hidden');
      var $toggleBtns = $navBtns.siblings('.toggle-courses');
      $.each($toggleBtns, function(index, btn) {
        $(btn).removeClass('expanded');
        $(btn).find('.glyphicon').removeClass('glyphicon-minus').addClass('glyphicon-plus');
        $(btn).find('.txt').text('展开全部');
      });
    }

    

    function resetCardsRows () {
      updateValues();
      resetCourseCard();
      $.each($('.course-row-nav'), function(index, navBtn) {
        resetNavBtn($(navBtn));
      });
      resetRowPosition($('.course-row'));
    }

      






    /**
     * listen to the favorite button event
     * need to send ajax to the server
     */
    $('.favorite-heart').click(function(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      var $parent = $(this).parent();
      if($(this).hasClass('active')) {
        $(this).removeClass('active');
      } else {
        $(this).addClass('active');
      }
    });



    /**
     * resize listener
     * listen to the windows size change, then modify the dom as design
     */
    var containerWidth = $('.container').width();
    $(window).on('resize', function (evt) {
      sliderImageAdjust();
      if(containerWidth != $('.container').width()) {
        resetCardsRows();
        containerWidth = $('.container').width();
      }
    });


    /**
     * tooltip activate
     */
    $('.course-card .count').tooltip({
      placement: 'top',
      container: 'body'
    });



    /**
     * activate dotdotdot plug-in
     */
    $('.course-intro p, .course-card .float-blk > h4').dotdotdot({
      watch : true
    });

    resetCardsRows();
  });

})(window, document, jQuery); 