/**
 * Main Script file
 * Here you can add all your cutome scripts and requires.
 */
try {
  window.$ = window.jQuery = require('jquery')
  require('./bootstrap-sass')
  require('./admin')

  if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!')
  }
} catch (e) {
  // window.location.href = "http://stackoverflow.com/search?q=[js]+" + e.message;
}
