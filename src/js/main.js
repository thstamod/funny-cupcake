/* eslint-disable no-undef */
/* eslint-disable strict */
/* eslint-disable no-undefined */

const funnyCupcake = (() => {
  // 'use strict'

  let $container
  const funnyCupcakeType = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning'
  }
  let previous

  const defaultOptions = {
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
    timeOut: 20000, // 0 --> sticky
    titleClass: 'funnyCupcake-title',
    messageClass: 'funnyCupcake-message',
    htmlTags: true,
    target: 'body',
    closeHtml: '&times;',
    closeButton: 'funnyCupcake-close-button',
    newestOnTop: true,
    showDuplicates: true
  }

  const info = (title, message, userOptions) =>
    preparefunnyCupcake({
      type: funnyCupcakeType.info,
      iconClass: defaultOptions.iconClasses.info,
      message,
      userOptions,
      title
    })
  const success = (title, message, userOptions) =>
    preparefunnyCupcake({
      type: funnyCupcakeType.success,
      iconClass: defaultOptions.iconClasses.success,
      message,
      userOptions,
      title
    })
  const warning = (title, message, userOptions) =>
    preparefunnyCupcake({
      type: funnyCupcakeType.warning,
      iconClass: defaultOptions.iconClasses.warning,
      message,
      userOptions,
      title
    })
  const error = (title, message, userOptions) =>
    preparefunnyCupcake({
      type: funnyCupcakeType.error,
      iconClass: defaultOptions.iconClasses.error,
      message,
      userOptions,
      title
    })

  const removefunnyCupcake = ($funnyCupcakeElement) => {
    if (!$container) {
      $container = getContainer()
    }
    if ($funnyCupcakeElement.offsetParent === null) {
      return
    }
    $funnyCupcakeElement.parentNode.removeChild($funnyCupcakeElement)
    $funnyCupcakeElement = null
    // TODO
    if ($container.childElementCount === 0) {
      $container.parentNode.removeChild($container)
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

    $container = getContainer(options, true)

    let intervalId = null
    const $funnyCupcakeElement = document.createElement('div')
    const $titleElement = document.createElement('div')
    const $messageElement = document.createElement('div')
    const $closeElement = document.createElement('button')

    const addUserDisplayOptions = () => {
      userDisplayOptions.type()
      userDisplayOptions.icons()
      userDisplayOptions.title()
      userDisplayOptions.message()
      userDisplayOptions.closeButton()
      userDisplayOptions.newestOnTop()
    }

    const bindEvents = () => {
      if (options.tapToDismiss) {
        $funnyCupcakeElement.addEventListener('click', hidefunnyCupcake)
      }

      if (options.closeButton && $closeElement) {
        $closeElement.addEventListener('click', (event) => {
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
        $closeElement.classList.add(options.closeButton)
      }
    }

    const displayfunnyCupcake = () => {
      $funnyCupcakeElement.style.display = 'block'
      // animation
      if (options.timeOut > 0) {
        intervalId = setTimeout(hidefunnyCupcake, options.timeOut)
      }
    }

    const userDisplayOptions = {
      type: () => {
        $funnyCupcakeElement.classList.add(
          options.identifierClass,
          `funnyCupcake-${obj.type}`
        )
      },
      icons: () => {
        if (obj.iconClass) {
          $funnyCupcakeElement.classList.add(iconClass)
        }
      },
      title: () => {
        // console.log('title')
        if (obj.title) {
          let _text = obj.title
          if (options.htmlTags) {
            _text = htmlescape(obj.title)
          }
          $titleElement.append(_text)
          $titleElement.classList.add(options.titleClass)
          $funnyCupcakeElement.append($titleElement)
        }
      },
      message: () => {
        // console.log('msg')
        if (obj.message) {
          let _text = obj.message
          if (!options.htmlTags) {
            _text = htmlescape(obj.message)
          }
          $messageElement.innerHTML = _text.trim()
          $messageElement.classList.add(options.messageClass)
          $funnyCupcakeElement.append($messageElement)
        }
      },
      closeButton: () => {
        if (options.closeButton) {
          $closeElement.setAttribute('type', 'button')
          $closeElement.classList.add(options.closeClass)
          $closeElement.setAttribute('role', 'button')
          $closeElement.innerHTML = options.closeHtml
          $funnyCupcakeElement.insertBefore(
            $closeElement,
            $funnyCupcakeElement.firstChild
          )
        }
      },
      newestOnTop: () => {
        if (options.newestOnTop) {
          document
            .querySelector(`#${$container.id}`)
            .insertBefore($funnyCupcakeElement, $container.firstChild)
        } else {
          document
            .querySelector(`#${$container.id}`)
            .appendChild($funnyCupcakeElement)
        }
      }
    }

    const htmlescape = (source) => {
      console.log(source)
      if (source === null) {
        source = ''
      }

      return source.replace(/(<([^>]+)>)/gi, '')
    }

    const hidefunnyCupcake = () => {
      // animation
      removefunnyCupcake($funnyCupcakeElement)
      clearTimeout(intervalId)
      if (options.hideAnimation.onComplete) {
        options.onHidden()
      }
    }

    addUserDisplayOptions()
    displayfunnyCupcake()
    bindEvents()

    return $funnyCupcakeElement
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

  const getContainer = (options, create) => {
    if (!options) {
      options = getOptions()
    }
    $container = document.querySelector(`#${options.containerId}`)
    if ($container) {
      return $container
    }
    if (create) {
      $container = createContainer(options)
    }
    return $container
  }

  const createContainer = (options) => {
    $container = document.createElement('div')
    $container.setAttribute('id', options.containerId)
    $container.classList.add(options.positionClass)
    document.querySelector(options.target).appendChild($container)
    return $container
  }

  const showDuplicates = (duplicate, obj) => {
    // eslint-disable-next-line no-debugger
    // debugger
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
    removefunnyCupcake
  }

  return funnyCupcake
})()

// call
funnyCupcake.info(
  'test',
  'this is a test funnyCupcake! and <br> <strong>test</strong>',
  {
    timeOut: 0
  }
)
funnyCupcake.success(
  'test',
  '<div>this is a test funnyCupcake! and <br> <strong>test</strong></div>',
  {
    timeOut: 0
  }
)
funnyCupcake.success(
  'test',
  '<div>this is a test funnyCupcake! and <br> <strong>test</strong></div>',
  {
    timeOut: 0
  }
)
// funnyCupcake.warning(
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
