(function ($) {
  'use strict';

  $.fn.smartSticky = function () {
    var $window = $(window);

    return this.each(function () {
      var $element = $(this);
      var $container = $(this).parent();
      var formerStyles = $(this).css(['position', 'top', 'margin-top', 'left', 'margin-left', 'right', 'margin-right', 'bottom', 'margin-bottom']);
      var formerPosition = $element.offset();
      var triggerUp = formerPosition.top;
      var triggerDown = $container.offset().top + $container.outerHeight() - $element.height();

      if ($container.css('position') == 'static') {
        $container.css('position', 'relative');
      }

      var relativePos  = {
        isUp   : true,
        isDown : false,
        isIn   : false
      };

      function checkScroll() {
        var pos   = $window.scrollTop();
        var oldRelativePos = $.extend({}, relativePos);

        relativePos.isUp   = pos <= triggerUp;
        relativePos.isDown = pos >= triggerDown;
        relativePos.isIn   = !relativePos.isUp && !relativePos.isDown;

        if (relativePos.isDown) {
          scrollDown(pos);
        } else if (relativePos.isUp != oldRelativePos.isUp || relativePos.isIn != oldRelativePos.isIn) {
          if (relativePos.isUp) {
            scrollUp();
          } else {
            scrollIn()
          }
        }
      }

      function scrollIn() {
        $element.css({
          'position': 'fixed',
          'top': 0,
          'left': formerPosition.left,
          'right': 'auto',
          'bottom': 'auto',
          'margin-top': 0,
          'margin-left': 0,
          'margin-right': 0,
          'margin-bottom': 0
        });
      }

      function scrollUp() {
        $element.css(formerStyles);
      }

      function scrollDown(pos) {
        $element.css({
          'position': 'fixed',
          'top': triggerDown - pos,
          'left': formerPosition.left,
          'right': 'auto',
          'bottom': 'auto',
          'margin-top': 0,
          'margin-left': 0,
          'margin-right': 0,
          'margin-bottom': 0
        });
      }

      checkScroll();
      $window.scroll(checkScroll);
    });
  };
})(jQuery);
