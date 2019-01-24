/* eslint-disable no-undefined */
(function (define) {
  'use strict'

  define(['jquery'], ($) =>
    (function () {
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
          error: 'funnyCupcake-error',
          info: 'funnyCupcake-info',
          success: 'funnyCupcake-success',
          warning: 'funnyCupcake-warning'
        },
        positionClass: 'funnyCupcake-top-right',
        timeOut: 20000, // 0 --> sticky
        titleClass: 'funnyCupcake-title',
        messageClass: 'funnyCupcake-message',
        htmlTags: false,
        target: 'body',
        closeHtml: '<button type="button">&times;</button>',
        closeButton: 'funnyCupcake-close-button',
        newestOnTop: true,
        showDuplicates: false
      }

      const info = (message, title, userOptions) =>
        preparefunnyCupcake({
          type: funnyCupcakeType.info,
          iconClass: defaultOptions.iconClasses.info,
          message,
          userOptions,
          title
        })

      const removefunnyCupcake = ($funnyCupcakeElement) => {
        if (!$container) {
          $container = getContainer()
        }
        if ($funnyCupcakeElement.is(':visible')) {
          return
        }
        $funnyCupcakeElement.remove()
        $funnyCupcakeElement = null
        if ($container.children().length === 0) {
          $container.remove()
          previous = undefined
        }
      }

      // eslint-disable-next-line no-var
      const preparefunnyCupcake = (obj) => {
        let options = getOptions()
        let iconClass = obj.iconClass || options.iconClass

        if (typeof obj.userOptions !== 'undefined') {
          options = $.extend(options, obj.userOptions)
          iconClass = obj.userOptions.iconClass || iconClass
        }
        console.log(options)
        if (showDuplicates(options.showDuplicates, obj)) {
          return
        }

        $container = getContainer(options, true)

        let intervalId = null
        const $funnyCupcakeElement = $('<div/>')
        const $titleElement = $('<div/>')
        const $messageElement = $('<div/>')
        const $closeElement = $(options.closeHtml)

        const addUserDisplayOptions = () => {
          userDisplayOptions.icons()
          userDisplayOptions.title()
          userDisplayOptions.message()
          userDisplayOptions.closeButton()
          userDisplayOptions.newestOnTop()
        }

        const bindEvents = () => {
          if (options.tapToDismiss) {
            $funnyCupcakeElement.click(hidefunnyCupcake)
          }

          if (options.closeButton && $closeElement) {
            $closeElement
              .click((event) => {
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
              .addClass(options.closeButton)
          }
        }

        const displayfunnyCupcake = () => {
          $funnyCupcakeElement.hide()
          $funnyCupcakeElement[options.showAnimation.method]({
            duration: options.showAnimation.duration,
            easing: options.showAnimation.easing,
            complete: options.showAnimation.onComplete
          })
          if (options.timeOut > 0) {
            intervalId = setTimeout(hidefunnyCupcake, options.timeOut)
          }
        }

        const userDisplayOptions = {
          icons: () => {
            if (obj.iconClass) {
              $funnyCupcakeElement
                .addClass(options.identifierClass)
                .addClass(iconClass)
            }
          },
          title: () => {
            if (obj.title) {
              let _text = obj.title
              if (options.htmlTags) {
                _text = htmlescape(obj.title)
              }
              $titleElement.append(_text).addClass(options.titleClass)
              $funnyCupcakeElement.append($titleElement)
            }
          },
          message: () => {
            if (obj.message) {
              let _text = obj.message
              if (options.htmlTags) {
                _text = htmlescape(obj.message)
              }
              $messageElement.append(_text).addClass(options.messageClass)
              $funnyCupcakeElement.append($messageElement)
            }
          },
          closeButton: () => {
            if (options.closeButton) {
              $closeElement.addClass(options.closeClass).attr('role', 'button')
              $funnyCupcakeElement.prepend($closeElement)
            }
          },
          newestOnTop: () => {
            if (options.newestOnTop) {
              $container.prepend($funnyCupcakeElement)
            } else {
              $container.append($funnyCupcakeElement)
            }
          }
        }

        const htmlescape = (source) => {
          if (source === null) {
            source = ''
          }

          return source
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
        }

        const hidefunnyCupcake = () => {
          console.log($funnyCupcakeElement)
          return $funnyCupcakeElement[options.hideAnimation.method]({
            duration: options.hideAnimation.duration,
            easing: options.hideAnimation.easing,
            complete() {
              console.log('onComplete')
              removefunnyCupcake($funnyCupcakeElement)
              clearTimeout(intervalId)
              if (options.hideAnimation.onComplete) {
                options.onHidden()
              }
            }
          })
        }

        addUserDisplayOptions()

        displayfunnyCupcake()

        bindEvents()

        return $funnyCupcakeElement
      } // end prepare

      function getOptions() {
        return $.extend({}, defaultOptions, funnyCupcake.options)
      }

      const getContainer = (options, create) => {
        if (!options) {
          options = getOptions()
        }
        $container = $(`#${options.containerId}`)
        if ($container.length) {
          return $container
        }
        if (create) {
          $container = createContainer(options)
        }
        return $container
      }

      const createContainer = (options) => {
        $container = $('<div/>')
          .attr('id', options.containerId)
          .addClass(options.positionClass)

        $container.appendTo($(options.target))
        return $container
      }

      const showDuplicates = (duplicate, obj) => {
        if (duplicate) {
          if (obj.message === previous) {
            return true
          }
          previous = obj.message
        }
        return false
      }
      const funnyCupcake = {
        getContainer,
        info,
        options: {},
        removefunnyCupcake
      }

      return funnyCupcake
    }()))
}(
  /* eslint-disable no-undef, strict, global-require */
  typeof define === 'function' && define.amd
    ? define
    : (deps, factory) => {
      if (typeof module !== 'undefined' && module.exports) {
        // Node
        module.exports = factory(require('jquery'))
      } else {
        window.funnyCupcake = factory(window.jQuery)
      }
    }
))
// call
funnyCupcake.info('test', '', {
  timeOut: 2000000000
})
