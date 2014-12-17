(function (window, document, $) {
  $(function () {
    /**
     * scroll down js
     */
    $('.about-container .sidebar-nav a').click(function(event) {
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
     * data-spy on the body
     */
    if($('body .about-container')) {
      $('body').scrollspy({ 
        target: '.sibebar-nav-sub',
        offset: 20
      });
    }

    /**
     * dynamically add the video
     */
    $('#about-video').click(function() {
      $(this).parent('.player-container').append('<iframe src="http://superclass.kaikeba.com/ocw/player.html?videoid=aboutkaikeba&amp;w=434&amp;h=244&amp;autoplay=1" frameborder="0" width="434" height="244"></iframe>');
      $(this).addClass('hidden');
    });
    
    
  });
})(window, document, jQuery); 