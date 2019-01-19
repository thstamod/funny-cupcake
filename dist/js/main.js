"use strict";

/* eslint-disable no-undefined */
(function (define) {
  'use strict';

  define(['jquery'], function ($) {
    return function () {
      var $container;
      var funnyCupcakeType = {
        error: 'error',
        info: 'info',
        success: 'success',
        warning: 'warning'
      };
      var previous;
      var defaultOptions = {
        onTapDismiss: false,
        identifierClass: 'funnyCupcake',
        containerId: 'funnyCupcake-container',
        showAnimation: {
          method: 'fadeIn',
          duration: 300,
          easing: 'swing',
          onComplete: undefined
        },
        hideAnimation: {
          method: 'fadeOut',
          duration: 1000,
          easing: 'swing',
          onComplete: undefined
        },
        iconClasses: {
          error: 'funnyCupcake-error',
          info: 'funnyCupcake-info',
          success: 'funnyCupcake-success',
          warning: 'funnyCupcake-warning'
        },
        positionClass: 'funnyCupcake-top-right',
        timeOut: 20000,
        // 0 --> sticky
        titleClass: 'funnyCupcake-title',
        messageClass: 'funnyCupcake-message',
        htmlTags: false,
        target: 'body',
        closeHtml: '<button type="button">&times;</button>',
        closeButton: 'funnyCupcake-close-button',
        newestOnTop: true,
        showDuplicates: false
      };

      var info = function info(message, title, userOptions) {
        return preparefunnyCupcake({
          type: funnyCupcakeType.info,
          iconClass: defaultOptions.iconClasses.info,
          message: message,
          userOptions: userOptions,
          title: title
        });
      };

      var removefunnyCupcake = function removefunnyCupcake($funnyCupcakeElement) {
        if (!$container) {
          $container = getContainer();
        }

        if ($funnyCupcakeElement.is(':visible')) {
          return;
        }

        $funnyCupcakeElement.remove();
        $funnyCupcakeElement = null;

        if ($container.children().length === 0) {
          $container.remove();
          previous = undefined;
        }
      }; // eslint-disable-next-line no-var


      var preparefunnyCupcake = function preparefunnyCupcake(obj) {
        var options = getOptions();
        var iconClass = obj.iconClass || options.iconClass;

        if (typeof obj.userOptions !== 'undefined') {
          options = $.extend(options, obj.userOptions);
          iconClass = obj.userOptions.iconClass || iconClass;
        }

        if (showDuplicates(options.showDuplicates, obj)) {
          return;
        }

        $container = getContainer(options, true);
        var intervalId = null;
        var $funnyCupcakeElement = $('<div/>');
        var $titleElement = $('<div/>');
        var $messageElement = $('<div/>');
        var $closeElement = $(options.closeHtml);

        var addUserDisplayOptions = function addUserDisplayOptions() {
          userDisplayOptions.icons();
          userDisplayOptions.title();
          userDisplayOptions.message();
          userDisplayOptions.closeButton();
          userDisplayOptions.newestOnTop();
        };

        var bindEvents = function bindEvents() {
          if (options.tapToDismiss) {
            $funnyCupcakeElement.click(hidefunnyCupcake);
          }

          if (options.closeButton && $closeElement) {
            $closeElement.click(function (event) {
              if (event.stopPropagation) {
                event.stopPropagation();
              } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
                event.cancelBubble = true;
              }

              hidefunnyCupcake();
            });
          }
        };

        var displayToast = function displayToast() {
          $funnyCupcakeElement.hide();
          $funnyCupcakeElement[options.showAnimation.method]({
            duration: options.showAnimation.duration,
            easing: options.showAnimation.easing,
            complete: options.showAnimation.onComplete
          });

          if (options.timeOut > 0) {
            intervalId = setTimeout(hidefunnyCupcake, options.timeOut);
          }
        };

        var userDisplayOptions = {
          icons: function icons() {
            if (obj.iconClass) {
              $funnyCupcakeElement.addClass(options.identifierClass).addClass(iconClass);
            }
          },
          title: function title() {
            if (obj.title) {
              var _text = obj.title;

              if (options.htmlTags) {
                _text = htmlescape(obj.title);
              }

              $titleElement.append(_text).addClass(options.titleClass);
              $funnyCupcakeElement.append($titleElement);
            }
          },
          message: function message() {
            if (obj.message) {
              var _text = obj.message;

              if (options.htmlTags) {
                _text = htmlescape(obj.message);
              }

              $messageElement.append(_text).addClass(options.messageClass);
              $funnyCupcakeElement.append($messageElement);
            }
          },
          closeButton: function closeButton() {
            if (options.closeButton) {
              $closeElement.addClass(options.closeClass).attr('role', 'button');
              $funnyCupcakeElement.prepend($closeElement);
            }
          },
          newestOnTop: function newestOnTop() {
            if (options.newestOnTop) {
              $container.prepend($funnyCupcakeElement);
            } else {
              $container.append($funnyCupcakeElement);
            }
          }
        };

        var htmlescape = function htmlescape(source) {
          if (source === null) {
            source = '';
          }

          return source.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        };

        var hidefunnyCupcake = function hidefunnyCupcake() {
          // if ($(':focus', $funnyCupcakeElement).length) {
          //     return;
          // }
          console.log($funnyCupcakeElement);
          return $funnyCupcakeElement[options.hideAnimation.method]({
            duration: options.hideAnimation.duration,
            easing: options.hideAnimation.easing,
            complete: function complete() {
              console.log('onComplete');
              removefunnyCupcake($funnyCupcakeElement);
              clearTimeout(intervalId);

              if (options.hideAnimation.onComplete) {
                options.onHidden();
              }
            }
          });
        };

        addUserDisplayOptions();
        displayToast();
        bindEvents();
        return $funnyCupcakeElement;
      }; // end prepare


      function getOptions() {
        return $.extend({}, defaultOptions, funnyCupcake.options);
      }

      var getContainer = function getContainer(options, create) {
        if (!options) {
          options = getOptions();
        }

        $container = $("#".concat(options.containerId));

        if ($container.length) {
          return $container;
        }

        if (create) {
          $container = createContainer(options);
        }

        return $container;
      };

      var createContainer = function createContainer(options) {
        $container = $('<div/>').attr('id', options.containerId).addClass(options.positionClass);
        $container.appendTo($(options.target));
        return $container;
      };

      var showDuplicates = function showDuplicates(duplicate, obj) {
        if (duplicate) {
          if (obj.message === previous) {
            return true;
          }

          previous = obj.message;
        }

        return false;
      };

      var funnyCupcake = {
        getContainer: getContainer,
        info: info,
        options: {},
        removefunnyCupcake: removefunnyCupcake
      };
      return funnyCupcake;
    }();
  });
})(
/* eslint-disable no-undef, strict, global-require */
typeof define === 'function' && define.amd ? define : function (deps, factory) {
  console.log(factory);

  if (typeof module !== 'undefined' && module.exports) {
    // Node
    module.exports = factory(require('jquery'));
  } else {
    window.funnyCupcake = factory(window.jQuery);
  }
}); // call
// funnyCupcake.info('test')