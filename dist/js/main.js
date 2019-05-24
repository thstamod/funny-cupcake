"use strict";

/* eslint-disable no-undef */

/* eslint-disable strict */

/* eslint-disable no-undefined */
var funnyCupcake = function () {
  // 'use strict'
  var _container;

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
      error: 'funnyCupcake-minus-circled',
      info: 'funnyCupcake-info',
      success: 'funnyCupcake-ok-circle',
      warning: 'funnyCupcake-warning-empty'
    },
    _iconClasses: {
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
    htmlTags: true,
    target: 'body',
    closeHtml: '&times;',
    closeButton: 'funnyCupcake-close-button',
    newestOnTop: true,
    showDuplicates: true
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

  var removefunnyCupcake = function removefunnyCupcake(_funnyCupcakeElement) {
    if (!_container) {
      _container = getContainer();
    }

    if (_funnyCupcakeElement.offsetParent === null) {
      return;
    }

    _funnyCupcakeElement.parentNode.removeChild(_funnyCupcakeElement);

    _funnyCupcakeElement = null; // TODO

    if (_container.childElementCount === 0) {
      _container.parentNode.removeChild(_container);

      previous = undefined;
    }
  }; // eslint-disable-next-line no-var


  var preparefunnyCupcake = function preparefunnyCupcake(obj) {
    var options = getOptions();
    var iconClass = obj.iconClass || options.iconClass;

    if (typeof obj.userOptions !== 'undefined') {
      options = extend(options, obj.userOptions);
      iconClass = obj.userOptions.iconClass || iconClass;
    }

    if (showDuplicates(options.showDuplicates, obj)) {
      return;
    }

    _container = getContainer(options, true);
    var intervalId = null;

    var _funnyCupcakeElement = document.createElement('div');

    var _titleElement = document.createElement('div');

    var _messageElement = document.createElement('div');

    var _closeElement = document.createElement('button');

    var addUserDisplayOptions = function addUserDisplayOptions() {
      userDisplayOptions.type();
      userDisplayOptions.icons();
      userDisplayOptions.title();
      userDisplayOptions.message();
      userDisplayOptions.closeButton();
      userDisplayOptions.newestOnTop();
    };

    var bindEvents = function bindEvents() {
      if (options.tapToDismiss) {
        _funnyCupcakeElement.addEventListener('click', hidefunnyCupcake);
      }

      if (options.closeButton && _closeElement) {
        _closeElement.addEventListener('click', function (event) {
          if (event.stopPropagation) {
            event.stopPropagation();
          } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
            event.cancelBubble = true;
          }

          hidefunnyCupcake();
        });

        _closeElement.classList.add(options.closeButton);
      }
    };

    var displayfunnyCupcake = function displayfunnyCupcake() {
      _funnyCupcakeElement.style.display = 'block'; // animation

      if (options.timeOut > 0) {
        intervalId = setTimeout(hidefunnyCupcake, options.timeOut);
      }
    };

    var userDisplayOptions = {
      type: function type() {
        _funnyCupcakeElement.classList.add(options.identifierClass, "funnyCupcake-".concat(obj.type));
      },
      icons: function icons() {
        if (obj.iconClass) {
          _funnyCupcakeElement.classList.add(iconClass);
        }
      },
      title: function title() {
        // console.log('title')
        if (obj.title) {
          var _text = obj.title;

          if (options.htmlTags) {
            _text = htmlescape(obj.title);
          }

          _titleElement.append(_text);

          _titleElement.classList.add(options.titleClass);

          _funnyCupcakeElement.append(_titleElement);
        }
      },
      message: function message() {
        // console.log('msg')
        if (obj.message) {
          var _text = obj.message;

          if (!options.htmlTags) {
            _text = htmlescape(obj.message);
          }

          _messageElement.innerHTML = _text.trim();

          _messageElement.classList.add(options.messageClass);

          _funnyCupcakeElement.append(_messageElement);
        }
      },
      closeButton: function closeButton() {
        if (options.closeButton) {
          _closeElement.setAttribute('type', 'button');

          _closeElement.classList.add(options.closeClass);

          _closeElement.setAttribute('role', 'button');

          _closeElement.innerHTML = options.closeHtml;

          _funnyCupcakeElement.insertBefore(_closeElement, _funnyCupcakeElement.firstChild);
        }
      },
      newestOnTop: function newestOnTop() {
        if (options.newestOnTop) {
          document.querySelector("#".concat(_container.id)).insertBefore(_funnyCupcakeElement, _container.firstChild);
        } else {
          document.querySelector("#".concat(_container.id)).appendChild(_funnyCupcakeElement);
        }
      }
    };

    var htmlescape = function htmlescape(source) {
      console.log(source);

      if (source === null) {
        source = '';
      }

      return source.replace(/(<([^>]+)>)/gi, '');
    };

    var hidefunnyCupcake = function hidefunnyCupcake() {
      // animation
      removefunnyCupcake(_funnyCupcakeElement);
      clearTimeout(intervalId);

      if (options.hideAnimation.onComplete) {
        options.onHidden();
      }
    };

    addUserDisplayOptions();
    displayfunnyCupcake();
    bindEvents();
    return _funnyCupcakeElement;
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

    _container = document.querySelector("#".concat(options.containerId));

    if (_container) {
      return _container;
    }

    if (create) {
      _container = createContainer(options);
    }

    return _container;
  };

  var createContainer = function createContainer(options) {
    _container = document.createElement('div');

    _container.setAttribute('id', options.containerId);

    _container.classList.add(options.positionClass);

    document.querySelector(options.target).appendChild(_container);
    return _container;
  };

  var showDuplicates = function showDuplicates(duplicate, obj) {
    // eslint-disable-next-line no-debugger
    // debugger
    if (!duplicate) {
      if (!previous) {
        previous = obj;
        return false;
      }

      if (obj.message === previous.message && obj.type === previous.type) {
        return true;
      }

      previous = obj;
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
funnyCupcake.success('test', '<div>this is a test funnyCupcake! and <br> <strong>test</strong></div>', {
  timeOut: 0
});
funnyCupcake.success('test', '<div>this is a test funnyCupcake! and <br> <strong>test</strong></div>', {
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