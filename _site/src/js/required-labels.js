/* global $ */
/**
 * Required labels js
 */
window.requiredLabels = function (form) {
  $(form).find('input,select,textarea').each(function () {
    if ($(this).prop('required')) {
      $(this).siblings('label').addClass('required-label')
      /*
       This code will check if the input is required but have no label
       then will create a label and add it to the input
       */
      if (($(this).siblings('label').length <= 0)) {
        console.log('label')
        $(this).parent().prepend('<label>' + $(this).attr('placeholder') + '</label>')
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
}
