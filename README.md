Possible Elements and Classes
===============

SECTION (chapter)
----------------
#### Must have
* **class:** chapter

#### possible child elements
* P
* FIGURE

P (paragraph)
-------------
#### possible child elements
* SPAN

#### classes
* **.m1 — .m10** top margin with a height of 1 — 10 line-height
* **.small** makes the font-size and line-height of that paragraph smaller, changes font-style to italic

FIGURE (figure)
---------------
#### possible child elements
* IMG
* IFRAME

#### classes
* **.w1 — .w12** sets the width of this element to the given column amoun
* **.h1 — .h12** sets the height of that element to the given multiple of a line-height
* **.m1 — .m10** sets the top margin to the given multiple of a line-height

SPAN (span)
-----------
#### possible child elements
* individual characters

#### classes
* **.t1 — .t12** moves the left side of that span to the given tab stop, text-align is left
* **.tr1 — .tr12** move the right side of that span to the given tab stop, text-align is right

Element Options
===============
Element options are added to any element (unless otherwise stated) by giving it a data attribute. For example to set the typespeed to 1000ms you add `data-typespeed="1000"`

### typespeed
inherited: true
value: time in miliseconds for each character. If applied to an element, that is not a character, the value will be inherited by its children, thereby setting all characters of an element to a certain typespeed

Debug Options
=============

If you want to set a global option on startup you can add it as a query to the url. For example to set the grid flag to true and the noanimation flag to false add `?grid=1&noanimation=0`.

#### grid (false, boolean) CTRL + G
Shows the basic grid.

#### superGrid (false, boolean) CTRL + SHIFT + G
Shows additional information about the positioning of elements.

#### noAnimation (false, boolean) CTRL + A
Doesn’t show any animation, content is displayed immediately.

#### allowScroll (false, boolean) CTRL + S
When set to true, allows to user to scroll on their own



