/**
 * Required labels js
 */
try {
  window.$ = window.jQuery = require('jquery')
  require('required-labels')
} catch (e) {
  console.log('error' + e.message)
}
