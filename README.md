# Foreword

This is a fork of the original unamohq/Typist to add a more SM oriented API. Also to add stopping. I will do my best to reply and address issues but if you want to draft up a PR fixing whatever issue you have there's a good chance I'll blindly merge.

## Basic GhostTyper

### JS
```javascript
let anchor = document.querySelector("#ghost-anchor")
let ghost = new Ghost(anchor, {
  letterInterval: 60,
}

ghost.display("Or is there???");
```

### HTML
```html
<strong id="ghost-anchor">There's no ghosts here??</strong>
```

### CSS
```CSS
@keyframes blink {
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}

@-webkit-keyframes blink {
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}

#ghost-anchor {
  &:after {
    content: " ";
    display: inline-block;
    height: 47px;
    position: relative;
    top: 10px;
    margin-left: 3px;
    margin-right: 7px;
    width: 4px;
    background: #06a44d;
    animation: blink 1s step-start 0s infinite;
    -webkit-animation: blink 1s step-start 0s infinite;
  }
}

.selectedText {
  display: none;
}
```

## Options

<table>
  <tr>
    <th class="name">Name</th>
    <th class="type">Type</th>
    <th class="default">Default</th>
    <th class="desc">Description</th>
  </tr>
  <tr>
    <td>selectClassName</td>
    <td>string</td>
    <td>selectedText</td>
    <td class="desc">Select element class name</td>
  </tr>
  <tr>
    <td>letterInterval</td>
    <td>number</td>
    <td>60</td>
    <td class="desc">Number of millis between letter modifications</td>
  </tr>
</table>

## Requirements
Typist is **framework-agnostic**. No need for jQuery.

## Source code
All efforts have been made to keep the source as clean and readable as possible.

## Requirements
GhostTyper is released under an MIT License, so do with it what you will.
