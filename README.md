`Note`

This plugin is build over jQuery you need to add jQuery to your app before calling the script
### Install
Using Yarn
`yarn add required-labels`

Using NPM
`npm install required-labels --save`
### Usage
* To use it with npm 
```require('required-labels')``` 

* Then call the function
`requiredLabels(selector)`

* Add the styles
`@import "~required-labels/dist/css/app.css";` 

### Examples
HTML markup as default 

```HTML
<div class="form-group">
  <label for="firstName">First name</label>
  <input id="firstName" class="form-control" type="text" placeholder="First name" required />
</div>
```
JQuery function Call
```JS
require('required-labels')

$(document).ready(function () {
    requiredLabels('#form')
  })
  
```

Add this code to your css file 
```Css
@import "~required-labels/dist/css/app.css";
```