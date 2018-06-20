/**
 * Required labels js
 */
/* global jQuery */

(function ($) {
  $.fn.requiredLabels = function (form) {
    let defaults = {
      createLabel: false,
      placeholder: false

    }

    let settings = $.extend({}, defaults, form)

    this.find('input,select,textarea').each(function () {
      if ($(this).prop('required')) {
        $(this).siblings('label').addClass('required-label')
        /**
         * This code will check if the input is required but have no label
         * then will create a label and add it to the input
         */
        if (settings.createLabel && ($(this).siblings('label').length <= 0)) {
          let inputName = $(this).attr('name')
          let inputId = $(this).attr('id')
          let labelText = ''
          /**
           * If There is no id for the input we will make the input focus on click
           */
          if (inputId === undefined) {
            $(this).parent().prepend('<label>' + inputName + '</label>')
            $(this).siblings('label').addClass('required-label text-capitalize')
            $(this).siblings('label').on('click', function (e) {
              e.preventDefault()
              e.stopPropagation()
              $('input').focus()
            })
          } else {
            $(this).parent().prepend('<label for=' + inputId + '>' + inputName + '</label>')
            $(this).siblings('label').addClass('required-label text-capitalize')
          }

        }
        /**
         * If you need to add the astrisk * to the placehoder if you don't want to add a label
         */
        if (settings.placeholder && ($(this).siblings('label').length <= 0)) {
          let inputPlaceholder = $(this).attr('placeholder')
          // $(this).attr('placeholder', inputPlaceholder + ' * ').addClass('placeholder')
          $(this).parent().addClass('placeholder')
        }
        /**
         * This is if Input is wrapped in a label
         */
        if (($(this).parent('label').length > 0)) {
          $(this).siblings('label').remove()
        }
      }
    })
    return this
  }
}(jQuery))
