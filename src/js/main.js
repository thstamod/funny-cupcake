(function (define) {
  'use strict'

  define(['jquery'], ($) =>
    (function () {
      let $container
      let _id = 0
      let previous
      const funnyCupcakeType = {
        error: 'error',
        info: 'info',
        success: 'success',
        warning: 'warning'
      }

      const defaultOptions = {
        identifierClass: 'funnyCupcake',
        containerId: 'funnyCupcake-container',
        iconClasses: {
          error: 'funnyCupcake-error',
          info: 'funnyCupcake-info',
          success: 'funnyCupcake-success',
          warning: 'funnyCupcake-warning'
        },
        positionClass: 'funnyCupcake-top-right',
        titleClass: 'funnyCupcake-title',
        messageClass: 'funnyCupcake-message',
        escapeHtml: false,
        target: 'body',
        showDuplicates: false
      }

      const info = (message, title, userOptions) =>
        prepareFunnyCupcake({
          type: funnyCupcakeType.info,
          iconClass: defaultOptions.iconClasses.info,
          message,
          userOptions,
          title
        })

      const prepareFunnyCupcake = (obj) => {
        let options = getOptions()
        let iconClass = obj.iconClass || options.iconClass

        if (typeof obj.userOptions !== 'undefined') {
          options = $.extend(options, obj.userOptions)
          iconClass = obj.userOptions.iconClass || iconClass
        }

        if (showDuplicates(options.showDuplicates, obj)) {
          return
        }

        _id++

        $container = getContainer(options, true)

        const $funnyCupcakeElement = $('<div/>')
        const $titleElement = $('<div/>')
        const $messageElement = $('<div/>')
        const $closeElement = $(options.closeHtml)

        addUserDisplayOptions()

        const addUserDisplayOptions = () => {
          userDisplayOptions.icons()
          userDisplayOptions.title()
          userDisplayOptions.message()
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
            // TODO
          },
          message: () => {
            // TODO
          },
          closeButton: () => {
            // TODO
          }
        }

        return $funnyCupcakeElement
      }

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
        console.log($container)
        return $container
      }

      const createContainer = (options) => {
        $container = $('<div/>')
          .attr('id', options.containerId)
          .addClass(options.positionClass)

        $container.appendTo($(options.target))
        return $container
      }

      const funnyCupcake = {
        getContainer,
        info,
        options: {}
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
