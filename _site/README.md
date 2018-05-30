## Welcome to Required label plugin
### Install
Using Yarn
`yarn add required-labels`

Using NPM
`npm install required-labels --save`
### Usage
* To use it with npm 
```require('required-labels')``` 

* Then call the function
--> `requiredLabels(selector)` 

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
$(document).ready(function () {
    requiredLabels('#form')
  })
```