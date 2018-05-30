/* global $ */
/**
 * Required labels js
 */
$(document).ready(function () {
  $('form').find('input,select,textarea').each(function () {
    if (!$(this).prop('required')) {
      console.log('NR')
    } else {
      $(this).siblings('label').addClass('required-label')
    }
  })
})
