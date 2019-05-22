"use strict";

/* eslint-disable no-undef */

/* eslint-disable strict */

/* eslint-disable no-undefined */
var funnyCupcake = function () {
  // 'use strict'
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

  var info = function info(title, message, userOptions) {
    return preparefunnyCupcake({
      type: funnyCupcakeType.info,
      iconClass: defaultOptions.iconClasses.info,
      message: message,
      userOptions: userOptions,
      title: title
    });
  };

  var success = function success(title, message, userOptions) {
    return preparefunnyCupcake({
      type: funnyCupcakeType.success,
      iconClass: defaultOptions.iconClasses.success,
      message: message,
      userOptions: userOptions,
      title: title
    });
  };

  var warning = function warning(title, message, userOptions) {
    return preparefunnyCupcake({
      type: funnyCupcakeType.warning,
      iconClass: defaultOptions.iconClasses.warning,
      message: message,
      userOptions: userOptions,
      title: title
    });
  };

  var error = function error(title, message, userOptions) {
    return preparefunnyCupcake({
      type: funnyCupcakeType.error,
      iconClass: defaultOptions.iconClasses.error,
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
    // eslint-disable-next-line no-debugger
    // debugger
    var options = getOptions();
    var iconClass = obj.iconClass || options.iconClass;

    if (typeof obj.userOptions !== 'undefined') {
      options = extend(options, obj.userOptions);
      iconClass = obj.userOptions.iconClass || iconClass;
    }

    console.log(options);

    if (showDuplicates(options.showDuplicates, obj)) {
      return;
    }

    $container = getContainer(options, true);
    var intervalId = null;
    var $funnyCupcakeElement = document.createElement('div');
    var $titleElement = document.createElement('div');
    var $messageElement = document.createElement('div');
    var $closeElement = $(options.closeHtml);

    var addUserDisplayOptions = function addUserDisplayOptions() {
      // eslint-disable-next-line no-debugger
      // debugger
      userDisplayOptions.icons();
      userDisplayOptions.title();
      userDisplayOptions.message(); // userDisplayOptions.closeButton()

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
        }).addClass(options.closeButton);
      }
    };

    var displayfunnyCupcake = function displayfunnyCupcake() {
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
          $funnyCupcakeElement.classList.add(options.identifierClass, iconClass);
        }
      },
      title: function title() {
        console.log('title');

        if (obj.title) {
          var _text = obj.title;

          if (options.htmlTags) {
            _text = htmlescape(obj.title);
          }

          $titleElement.append(_text);
          $titleElement.classList.add(options.titleClass);
          $funnyCupcakeElement.append($titleElement);
        }
      },
      message: function message() {
        console.log('msg');

        if (obj.message) {
          var _text = obj.message;

          if (options.htmlTags) {
            _text = htmlescape(obj.message);
          }

          $messageElement.append(_text);
          $messageElement.classList.add(options.messageClass);
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
          document.querySelector("#".concat($container.id)).insertBefore($funnyCupcakeElement, $container.firstChild);
        } else {
          document.querySelector("#".concat($container.id)).appendChild($funnyCupcakeElement);
        }
      }
    };

    var htmlescape = function htmlescape(source) {
      console.log(source);

      if (source === null) {
        source = '';
      }

      return source.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };

    var hidefunnyCupcake = function hidefunnyCupcake() {
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
    displayfunnyCupcake();
    bindEvents();
    console.log($funnyCupcakeElement);
    return $funnyCupcakeElement;
  }; // end prepare


  function getOptions() {
    return extend({}, defaultOptions, funnyCupcake.options);
  }

  function extend() {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    for (var i = 1; i < params.length; i++) {
      for (var key in params[i]) {
        // eslint-disable-next-line no-prototype-builtins
        if (params[i].hasOwnProperty(key)) {
          params[0][key] = params[i][key];
        }
      }
    }

    return params[0];
  }

  var getContainer = function getContainer(options, create) {
    if (!options) {
      options = getOptions();
    }

    $container = document.querySelector("#".concat(options.containerId));
    console.log($container);

    if ($container) {
      return $container;
    }

    if (create) {
      $container = createContainer(options);
    }

    return $container;
  };

  var createContainer = function createContainer(options) {
    $container = document.createElement('div');
    $container.setAttribute('id', options.containerId);
    $container.classList.add(options.positionClass);
    document.querySelector(options.target).appendChild($container);
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
    success: success,
    warning: warning,
    error: error,
    options: {},
    removefunnyCupcake: removefunnyCupcake
  };
  return funnyCupcake;
}(); // call


funnyCupcake.info('test', 'this is a test funnyCupcake! and <br> <strong>test</strong>', {
  timeOut: 0
});
funnyCupcake.success('test', 'this is a test funnyCupcake! and <br> <strong>test</strong>', {
  timeOut: 0
}); // funnyCupcake.warning(
//   'test',
//   'this is a test funnyCupcake! and <br> <strong>test</strong>',
//   {
//     timeOut: 0
//   }
// )
// funnyCupcake.error(
//   'test',
//   'this is a test funnyCupcake! and <br> <strong>test</strong>',
//   {
//     timeOut: 0
//   }
// )