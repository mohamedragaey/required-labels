/**
 * Required labels js
 */
/* global jQuery */

(function ($) {
  $.fn.requiredLabels = function (form) {
    let defaults = {
      createLabel: false
    }

    let settings = $.extend({}, defaults, form)

    this.find('input,select,textarea').each(function () {
      if ($(this).prop('required')) {
        $(this).siblings('label').addClass('required-label')
        /*
         This code will check if the input is required but have no label
         then will create a label and add it to the input
         */
        if (settings.createLabel && ($(this).siblings('label').length <= 0)) {
          $(this).parent().prepend('<label for=' + $(this).attr('id') + '>' + $(this).attr('placeholder') + '</label>')
          $(this).siblings('label').addClass('required-label')
        }
        /*
         This is if Input is wrapped in a label
         */
        if (($(this).parent('label').length > 0)) {
          $(this).siblings('label').remove()
        }
      }
    })
    return this
  }
}(jQuery))
