# Sass mixin to prepare for a switch to CSS Custom Properties (aka CSS Variables)

## Installation

* With npm: `npm install css-vars`
* With yarn: `yarn add css-vars`
* With Bower: `bower install css-vars`
* Manually: get [this file](https://raw.githubusercontent.com/malyw/css-vars/master/css-vars.scss)

Finally, include the file in your project using an @import statement:

```scss
@import "[%PATH%/]css-vars";
```

## Usage

To declare variables, use `@include cssVars(<map of variables>)`:

```scss
@include cssVars((
      --main-color: rgb(0, 0, 0),
      --main-bg: #fff,
      --main-font-size: 14px
));
```

To use variables, use the `var()` function:
 
```scss
body{
  color: var(--main-color);
  background: var(--main-bg);
  font-size: var(--main-font-size);
}

```

Both these syntaxes are taken from the
[Custom Properties spec](https://drafts.csswg.org/css-variables/) which is already applied in most of the browsers.

## Declaration in selectors, reassigning variables

Variables are declared on the global scope (`$css-vars` map for Sass, `root` for native CSS).

You can declare/redefine variables inside selectors, e.g.:
 
```scss
@include cssVars((
  --line-height: 1
));

header{
  @include cssVars((
    --header-padding: 10px 20px,
    --line-height: 1.428571429,
    --border-color: rebeccapurple
  ));
  
  padding: var(--header-padding);
  line-height: var(--line-height);
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
@include cssVars((
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

so you will be notified when:

 * variable is not provided but tried to be used
 * variable is not provided, but default value was- so it's used
 * variable is reassigned