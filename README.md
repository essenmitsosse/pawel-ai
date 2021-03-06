# Possible Elements and Classes

## `SECTION` (chapter)

### Must have

- **class:** `chapter`

### possible child elements

- `P`
- `FIGURE`
- `HEADER`

## `HEADER` (HEADER)

### possible parent elements

- `SECTION`

The header is displayed at the beginning of each chapter. The header element needs to be the first element inside a `SECTION.chapter`, otherwise there most likely will be problems.

## `P` (paragraph)

### possible parent elements

- `SECTION`

### possible child elements

- `SPAN`

### classes

- **`.m1` -- `.m10`** top margin with a height of 1 -- 10 line-height
- **`.small`** makes the font-size and line-height of that paragraph smaller, changes font-style to italic

## `FIGURE` (figure)

### possible parent elements

- `SECTION`

### possible child elements

- `IMG`
- `VIDEO`
- ~~`IFRAME`~~

### classes

- **`.w1` -- `.w12`** sets the width of this element to the given column amoun
- **`.h1` -- `.h12`** sets the height of that element to the given multiple of a line-height
- **`.m1` -- `.m10`** sets the top margin to the given multiple of a line-height

## `VIDEO` (video)

### possible parent elements

- `FIGURE`

## `SPAN` (span)

### possible parent elements

- `P`

### possible child elements

- individual characters
- `DEL`
- `SPAN` (only one level deep, no classes allowed)

### classes

- **`.t1` -- `.t12`** moves the left side of that span to the given tab stop, text-align is left
- **`.tr1` -- `.tr12`** move the right side of that span to the given tab stop, text-align is right

### Data-attributes

- `delay`
- `delaylist`
- `removelist`

## `DEL` (span)

### Data-attributes

- `delay`
- `delaylist`
- `removelist`

Text inside a `DEL` will be written and then removed, making it look like it was corrected.

# Element Options

Element options are added to any element (unless otherwise stated) by giving it a data attribute. For example to set the typespeed to 1000ms you add `data-typespeed="1000"`

## `delay`

- **inherited:** yes
- **value:** time in miliseconds for each character.

If applied to an element, that is not a character, the value will be inherited by its children, thereby setting all characters of an element to a certain typespeed. If applied to a `del` element, only the deletion will be set to the given value

## `delayend`

- **inherited:** no
- **allowed elements:** `SPAN`, `DEL`
- **value:** time in miliseconds after the last character of the span.

This is a shorthand to add time between the last character of a `SPAN` and before the cursor moves to the beginning of the next `SPAN`. For `DEL` it is the time after the last character has been typed and before the word is deleted.

## `delaylist`

- **inherited:** no
- **allowed elements:** `SPAN`
- **value:** comma seperated list for time in miliseconds for each character.

Each element in the list corespondents to the delay of the character at the same position in the string. The first value will delay the first character and so on. If leaved empty the default delay will be used.

## `removelist`

- **inherited:** no
- **allowed elements:** `SPAN`
- **value:** comma seperated list position of characters from which given amount of character shall be removed.

Each element in the list corespondents to a character from which the given amount of character will be removed. Value needs to be negative or will be ignored.

# Debug Options

If you want to set a global option on startup you can add it as a query to the url. For example to set the grid flag to true and the noanimation flag to false add `?grid=1&noanimation=0`.

## `pause`

- **type:** `boolean`
- **default:** `false`
- **short-cut to toggle:** `SPACEBAR`

Pauses the animation

## `grid`

- **type:** `boolean`
- **default:** `false`
- **short-cut to toggle:** `CTRL`+`G`

Shows the basic grid.

## `superGrid`

- **type:** `boolean`
- **default:** `false`
- **short-cut to toggle:** `CTRL`+`SHIFT`+`G`

Shows additional information about the positioning of elements.

## `noAnimation`

- **type:** `boolean`
- **default:** `false`
- **short-cut to toggle:** `CTRL`+`A`

Doesn't show any animation, content is displayed immediately. NoAnimation also has the same effect as `allowScroll`.

## `allowScroll`

- **type:** `boolean`
- **default:** `false`
- **short-cut to toggle:** `CTRL`+`S`

When set to true, allows to user to scroll on their own. When set to false the user can't scroll by default.

## `defaultDelay`

- **type:** `number`
- **default:** `50`

Changes the default typespeed. Doesn't influence elements with individual typespeeds.

## `typeSpeedMultiplyer`

- **type:** `number`
- **default:** `1`
- **short-cut to increase:** `CTRL`+`+`
- **short-cut to decrease:** `CTRL`+`-`

Changes the typespeed by the given multiplyer. This affects all typespeeds.

## `hideMenu`

- **type:** `boolean`
- **default:** `false`

Hides the about and chapter menu

## `pauseAfterChapter`

- **type:** `boolean`
- **default:** `false`

Pauses the playback after a chapter is finished

# Creating Distribution folder

The distribution folder is automatically generated by a Grunt task. If you have npm and Grunt setup just run `grunt`

If you want to automatically watch for changes run `grunt w`

## Livereload

If you are running the watch task and have the [Chrome livereload plugin](https://chrome.google.com/webstore/detail/livereload/) installed you can automatically watch for changes on port `35729`.

[Get Lifereload for other browser](http://livereload.com/)

## Setting up NPM and Grunt

If you don't have NPM and Grunt installed have a look at the [Getting started guide](http://gruntjs.com/getting-started).

When you first pull the repo or when the dependencies have changed make sure to run `npm install` to download the necessary node modules.
