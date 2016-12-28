# css-vars: Sass mixin to start using CSS Custom Properties
[![Build Status](https://travis-ci.org/malyw/css-vars.png)](https://travis-ci.org/malyw/css-vars)

## Installation

* With npm: `npm install css-vars`
* With yarn: `yarn add css-vars`
* With Bower: `bower install css-var`
* Manually: get [this file](https://raw.githubusercontent.com/malyw/css-vars/master/css-vars.scss)

Finally, include the main mixin file in your project using an `@import` statement:

```scss
@import "[%PATH%]/css-vars/css-vars";
```

## Usage

To declare variables, use `@include css-vars(<map of variables>)`:

```scss
@include css-vars((
      --main-color: black,
      --main-bg: #fff,
      --main-font-size: 14px
));
```

To use variables, use the `var()` function:
 
```scss
body{
  color: var(--main-color);
  background: var(--main-bg, #f00);
  font-size: var(--main-font-size);
}
```

Both these syntaxes are taken from the
[Custom Properties spec](https://drafts.csswg.org/css-variables/) which is already applied in most of the browsers.

## CSS output

The default output from the above is:

```css
body {
  color: black;
  background: #fff;
  font-size: 14px;
}
```

If in you Sass you add **`$css-vars-use-native: true;`** , you will have:

```css
:root {
  --main-color: black;
  --main-bg: #fff;
  --main-font-size: 14px;
}

body {
  color: var(--main-color);
  background: var(--main-bg, #f00);
  font-size: var(--main-font-size);
}
```

## Declaration in selectors, reassigning variables

Variables are declared on the global scope (`$css-vars` map for Sass, `root` for native CSS).

You can declare variables inside selectors
and, of course, redefine any variable, e.g.:
 
```scss
// declaration outside of any selectors
@include css-vars((
  --line-height: 1,
  --main-font-family: (Helvetica, Arial, sans-serif)
));

header{
  // declaration inside of a selector
  @include css-vars((
    --header-padding: 10px 20px,
    --line-height: 1.428571429,
    --border-color: rebeccapurple
  ));
  
  padding: var(--header-padding);
  line-height: var(--line-height); // 1.428571429 is applied
  border: 1px solid var(--other-border-color);
}
```

### Default values

`var()` function takes the second param to assign the default value if a variable is not defined:

```scss
a::after{
  content: var(--external-link, "external link");
  // "external link" is applied, as --external-link is not defined
}
```

## Advantages of the mixin

Usage of the mixin gives the useful debug information:

- logs when a variable was not assigned but used
- logs when some variable is reassigned
- provides info when a variable is not defined, but there is a default value passed, which is used instead

This information is helpful in both cases for Sass and CSS variables.

None browsers so far provide such debug info for CSS custom properties.

To enable the mixin debug messages output during the Sass compilation, just add the following to your project:

```scss
$css-vars-debug-log: true;
```

## Trigger using of native CSS Custom Properties

To switch the mixin to use native CSS Custom Properties, just provide:

```scss
$css-vars-use-native: true;
```

It's useful when:
 * You don't support [browsers without CSS Custom Properties](http://caniuse.com/#feat=css-variables)
 * To generate a separate CSS file which will be used for browsers which support them
 
E.g.
```js
    const isSupported = window.CSS && window.CSS.supports &&
    window.CSS.supports('--a', 0);
    if(!isSupported){
        removeCss('css-custom-properties.css');
        loadCss('without-css-custom-properties.css');
    }
```

## Caveats

There are some caveats, when CSS Custom Properties work in a different way.

E.g. they cannot be used inside Media Query values,
so the following code will work in Sass, but not in CSS (when you switch):

```scss
@include css-vars((
        --tablet: 768px
));

@media screen and (min-width: var(--tablet)) {
  body {
    background: #ff0;
  }
}
```

Another differences are regarding the different scopes for CSS and Sass variables.

E.g. when you use assigned variable to define something in CSS and then reassign it- the used value will be updated.
sass just inline values, so there will be no effect when you change a variable after.

To debug such cases when you switch just enable the debug messages:

```scss
$css-vars-debug-log: true;
```
 
## Limitations (**in case of Sass variables**)

There are some limitation because of the Sass nature:

- mixin uses the global map to reassign variables,
which may result in a different behavior from Custom Properties when non global variables are used.

- Before passing a map of variables to the mixin, Sass invokes all the functions in it, together with var().
As result you cannot reuse variables in one declaration, e.g. this will not work:

```scss
@include css-vars((
--link-color: #4183C4,
--title-hover-color: var(--link-color)
));
```

To make it work, just split the declaration and the usage:

```scss
@include css-vars((
--link-color: #4183C4,
));

@include css-vars((
--title-hover-color: var(--link-color)
));
```

- Sass doesn't invoke functions inside `calc()`, so in that case you have to trigger that using Sass interpolation `#{}`:

```scss
@include css-vars((
  --link-indent: calc(#{var(--main-vertical-indent)} / 2)
));
.link{
  width: calc(#{var(--btn-width)} * 2);
  margin-bottom: var(--link-indent);
}
```

---

![alt](https://hospodarets.com/img/blog/1482761911710817000.png)