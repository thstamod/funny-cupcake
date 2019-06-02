/* eslint-disable no-undef */
/* eslint-disable strict */
/* eslint-disable no-undefined */

// eslint-disable-next-line no-unused-vars
const funnyCupcake = (() => {
  // 'use strict'

  let _container
  const funnyCupcakeType = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning'
  }
  let previous

  const defaultOptions = {
    closeOnTap: false,
    identifierClass: 'funnyCupcake',
    containerId: 'funnyCupcake-container',
    showAnimationCallback: undefined,
    hideAnimationCallback: undefined,
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
    timeOut: 2000, // 0 --> sticky
    titleClass: 'funnyCupcake-title',
    messageClass: 'funnyCupcake-message',
    htmlTags: true,
    target: 'body',
    hasCloseButton: true,
    closeHtml: '&times;',
    closeButton: 'funnyCupcake-close-button',
    newestOnTop: true,
    showDuplicates: true
  }

  const info = (message, title, userOptions) =>
    preparefunnyCupcake({
      type: funnyCupcakeType.info,
      iconClass: defaultOptions.iconClasses.info,
      message,
      userOptions,
      title
    })
  const success = (message, title, userOptions) =>
    preparefunnyCupcake({
      type: funnyCupcakeType.success,
      iconClass: defaultOptions.iconClasses.success,
      message,
      userOptions,
      title
    })
  const warning = (message, title, userOptions) =>
    preparefunnyCupcake({
      type: funnyCupcakeType.warning,
      iconClass: defaultOptions.iconClasses.warning,
      message,
      userOptions,
      title
    })
  const error = (message, title, userOptions) =>
    preparefunnyCupcake({
      type: funnyCupcakeType.error,
      iconClass: defaultOptions.iconClasses.error,
      message,
      userOptions,
      title
    })

  const removefunnyCupcake = (_funnyCupcakeElement) => {
    if (!_container) {
      _container = getContainer()
    }
    if (_funnyCupcakeElement.offsetParent === null) {
      return
    }
    _funnyCupcakeElement.parentNode.removeChild(_funnyCupcakeElement)
    _funnyCupcakeElement = null
    // TODO
    if (_container.childElementCount === 0) {
      _container.parentNode.removeChild(_container)
      previous = undefined
    }
  }

  // eslint-disable-next-line no-var
  const preparefunnyCupcake = (obj) => {
    let options = getOptions()
    let iconClass = obj.iconClass || options.iconClass

    if (typeof obj.userOptions !== 'undefined') {
      options = extend(options, obj.userOptions)
      iconClass = obj.userOptions.iconClass || iconClass
    }
    if (showDuplicates(options.showDuplicates, obj)) {
      return
    }

    _container = getContainer(options, true)

    let intervalId = null
    const _funnyCupcakeElement = document.createElement('div')
    const _titleElement = document.createElement('div')
    const _messageElement = document.createElement('div')
    const _closeElement = document.createElement('button')

    const addUserDisplayOptions = () => {
      userDisplayOptions.type()
      userDisplayOptions.icons()
      userDisplayOptions.title()
      userDisplayOptions.message()
      userDisplayOptions.setCloseButton()
      userDisplayOptions.newestOnTop()
    }

    const bindEvents = () => {
      if (options.closeOnTap) {
        _funnyCupcakeElement.addEventListener('click', hidefunnyCupcake)
      }

      _funnyCupcakeElement.addEventListener('animationend', (e) => {
        if (e.animationName === 'fadeOut') {
          removefunnyCupcake(_funnyCupcakeElement)
          clearTimeout(intervalId)
          if (options.hideAnimationCallback) {
            options.hideAnimationCallback()
          }
        }
        if (e.animationName === 'fadeIn') {
          if (options.showAnimationCallback) {
            options.showAnimationCallback()
          }
        }
      })

      if (options.closeButton && _closeElement && options.hasCloseButton) {
        _closeElement.addEventListener('click', (event) => {
          if (event.stopPropagation) {
            event.stopPropagation()
          } else if (
            event.cancelBubble !== undefined &&
            event.cancelBubble !== true
          ) {
            event.cancelBubble = true
          }
          hidefunnyCupcake()
        })
        // _closeElement.classList.add(options.closeButton)
      }
    }

    const setRelease = () => {
      if (options.timeOut > 0) {
        intervalId = setTimeout(hidefunnyCupcake, options.timeOut)
      }
    }

    const userDisplayOptions = {
      type: () => {
        _funnyCupcakeElement.classList.add(
          options.identifierClass,
          `funnyCupcake-${obj.type}`
        )
      },
      icons: () => {
        if (obj.iconClass && obj.title) {
          _funnyCupcakeElement.classList.add(iconClass)
        }
      },
      title: () => {
        if (obj.title) {
          let _text = obj.title
          if (options.htmlTags) {
            _text = htmlescape(obj.title)
          }
          _titleElement.append(_text)
          _titleElement.classList.add(options.titleClass)
          _funnyCupcakeElement.append(_titleElement)
        }
      },
      message: () => {
        if (obj.message) {
          let _text = obj.message
          if (!options.htmlTags) {
            _text = htmlescape(obj.message)
          }
          _messageElement.innerHTML = _text.trim()
          _messageElement.classList.add(options.messageClass)
          _funnyCupcakeElement.append(_messageElement)
        }
      },
      setCloseButton: () => {
        if (options.hasCloseButton) {
          _closeElement.setAttribute('type', 'button')
          _closeElement.classList.add(options.closeButton)
          _closeElement.setAttribute('role', 'button')
          _closeElement.innerHTML = options.closeHtml
          _funnyCupcakeElement.insertBefore(
            _closeElement,
            _funnyCupcakeElement.firstChild
          )
        }
      },
      newestOnTop: () => {
        if (options.newestOnTop) {
          document
            .querySelector(`#${_container.id}`)
            .insertBefore(_funnyCupcakeElement, _container.firstChild)
        } else {
          document
            .querySelector(`#${_container.id}`)
            .appendChild(_funnyCupcakeElement)
        }
      }
    }

    const htmlescape = (source) => {
      if (source === null) {
        source = ''
      }

      return source.replace(/(<([^>]+)>)/gi, '')
    }

    const hidefunnyCupcake = () => {
      _funnyCupcakeElement.classList.add('d_none')
    }

    addUserDisplayOptions()
    bindEvents()
    setRelease()

    return _funnyCupcakeElement
  } // end prepare

  function getOptions() {
    return extend({}, defaultOptions, funnyCupcake.options)
  }

  function extend(...params) {
    for (let i = 1; i < params.length; i++) {
      for (const key in params[i]) {
        // eslint-disable-next-line no-prototype-builtins
        if (params[i].hasOwnProperty(key)) {
          params[0][key] = params[i][key]
        }
      }
    }
    return params[0]
  }

  const removeAll = () => {
    const _container = getContainer()
    _container.querySelectorAll('.funnyCupcake').forEach((elem) => {
      elem.classList.add('d_none')
    })
  }

  const getContainer = (options, create) => {
    if (!options) {
      options = getOptions()
    }
    _container = document.querySelector(`#${options.containerId}`)
    if (_container) {
      return _container
    }
    if (create) {
      _container = createContainer(options)
    }
    return _container
  }

  const createContainer = (options) => {
    _container = document.createElement('div')
    _container.setAttribute('id', options.containerId)
    _container.classList.add(options.positionClass)
    document.querySelector(options.target).appendChild(_container)
    return _container
  }

  const showDuplicates = (duplicate, obj) => {
    if (!duplicate) {
      if (!previous) {
        previous = obj
        return false
      }
      if (obj.message === previous.message && obj.type === previous.type) {
        return true
      }
      previous = obj
    }
    return false
  }
  const funnyCupcake = {
    getContainer,
    info,
    success,
    warning,
    error,
    options: {},
    removeAll
    // removefunnyCupcake
  }

  return funnyCupcake
})()

// call

// window.onload = function () {
//   funnyCupcake.info(
//     'this is a test funnyCupcake! and <br> <strong>test1</strong>'
//   )
//   funnyCupcake.success(
//     '<div>this is a test funnyCupcake! and <br> <strong>test2</strong></div>',
//     'test',
//     {
//       timeOut: 3000,
//       showAnimationCallback() {
//         console.log('test2')
//       }
//     }
//   )
//   funnyCupcake.success(
//     '<div>this is a test funnyCupcake! and <br> <strong>test3</strong></div>',
//     'test',
//     {
//       timeOut: 0
//     }
//   )
// }
