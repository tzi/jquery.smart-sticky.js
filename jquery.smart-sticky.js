(function ($) {
  'use strict';

  $.fn.smartSticky = function () {
    var $window = $(window);

    return this.each(function () {
      var $element = $(this);
      var $container = $(this).parent();
      var formerStyles = $(this).css(['position', 'top', 'margin-top', 'left', 'margin-left', 'right', 'margin-right', 'bottom', 'margin-bottom']);
      var formerPosition = $element.offset();
      var destinationTop = $container.outerHeight() - $element.height();
      var triggerUp = formerPosition.top;
      var triggerDown = $container.offset().top + destinationTop;

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

        if (relativePos.isIn) {
          scrollEnter();
        } else if (relativePos.isUp) {
          scrollUp();
        } else {
          scrollDown();
        }
      }

      function scrollEnter() {
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

      function scrollDown() {
        $element.css({
          'position': 'absolute',
          'top': destinationTop,
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
