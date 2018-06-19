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
`$('selector').requiredLabels()`

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
    $('#form').requiredLabels()
  })
  
```
If You want to pass an option 
```js
$(document).ready(function () {
    $('#form').requiredLabels({
    createLabel: true //default is set to false 
    })
  })

```

Add this code to your css file 
```Css
@import "~required-labels/dist/css/app.css";
```

#### Options
`createLabel: false` This option is used if you have an input without label and you want to create a label for that required input you set the option to true

Before
```HTML
<div class="form-group">
<input id="email" type="email" placeholder="email" required />
</div> 
```

After
```HTML
<div class="form-group">
<label for="email">email*</label>
<input id="email" type="email" placeholder="email" required />
</div> 
```
