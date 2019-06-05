# funnyCupcake

funnyCupcake is a JavaScript library for notifications with no dependencies!!

## Current version

0.0.1

<!-- ### Demo


### Installing

[npm](http://www.npmjs.com)

```
npm install funnycupcake
```

[yarn](https://yarnpkg.com)

```
yarn add funnycupcake
```

### CDNs

```
cdn links
``` -->

## Quick start

add to your index.html

```
<link href="funnycupcake.css" rel="stylesheet"/>
```

```
<script src="funnycupcake.js"></script>
```

```
  funnyCupcake.info('this is a test funnyCupcake!','test')
```

and just like that, an info notification is displayed!!

## Options

#### funnyCupcake has 4 notification types

- info
- success
- warning
- error

and they called correspondingly

```
funnyCupcake.info(...)
```

```
funnyCupcake.success(...)
```

```
funnyCupcake.warning(...)
```

```
funnyCupcake.error(...)
```

#### Attributes

- Message (optional)
- Title (optional)
- UserOptions (optional)

An example with info notification

```
funnyCupcake.info('this is a test funnyCupcake!','test', {userOptions})
```

#### User options

#### closeOnTap:

- **Type**: boolean
- **Default**: false
- **Usage**: The nodification is dismissed on tap

#### identifierClass:

- **Type**: string
- **Default**: 'funnyCupcake'
- **Usage**: the identifier class has the basic style

#### containerId:

- **Type**: string
- **Default**: 'funnyCupcake-container'
- **Usage**: the id of wrapper container

#### showAnimationCallback:

- **Type**: function
- **Default**: undefined
- **Usage**: it runs a function after the nodification is shown

#### hideAnimationCallback:

- **Type**: function
- **Default**: undefined
- **Usage**: it runs a function after the nodification is hidden

#### iconClasses:

- **Type**: object
- **Default**: {  
   error: 'funnyCupcake-minus-circled',  
   info: 'funnyCupcake-info',  
   success: 'funnyCupcake-ok-circle',  
   warning: 'funnyCupcake-warning-empty'  
   }
- **Usage**: it asigns a new icon for every type

#### positionClass:

- **Type**: string
- **Default**: 'funnyCupcake-top-right',
- **Available**: funnyCupcake-top-right, funnyCupcake-top-left, funnyCupcake-bottom-left,  
  funnyCupcake-bottom-right, **also you can add a custom position**.
- **Usage**: it sets the container's postition

  #### timeOut:

- **Type**: number
- **Default**: 2000 // 0 --> sticky
- **Usage**: after how many milliseconds the nodification is autodismissed
  #### titleClass:
- **Type**: string
- **Default**: 'funnyCupcake-title'
- **Usage**: the div's class name which contains the title

#### messageClass:

- **Type**: string
- **Default**: 'funnyCupcake-message'
- **Usage**: the div's class name which contains the message

#### htmlTags:

- **Type**: boolean
- **Default**: true
- **Usage**: it allow html tags on title and message

#### target:

- **Type**: string
- **Default**: 'body'
- **Usage**: in which the container will append

#### hasCloseButton:

- **Type**: boolean
- **Default**: true
- **Usage**: it displays or not the close button

  #### closeHtml:

- **Type**: string
- **Default**: '&times;'
- **Usage**: the html of close button

  #### closeButton:

- **Type**: string
- **Default**: 'funnyCupcake-close-button'
- **Usage**: the div's class name of close button's wrapper

#### newestOnTop:

- **Type**: boolean
- **Default**: true
- **Usage**: the newest nodification goes on top

#### showDuplicates:

- **Type**: boolean
- **Default**: true
- **Usage**: allow duplicates

## Building funnyCupcake

To build and generate the .js file and the .css you need [node](https://nodejs.org/en/) installed.

Also

```
npm install -g gulp karma-cli
npm install

```

After that, all dependencies will be installed.

- run the watchers `npm run watch_source`
- prepare the minified js flies `npm run js_prepare`
- prepare the minified css flies `npm run css_prepare`

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Credits

Inspired by [Toastr](https://github.com/CodeSeven/toastr/)
