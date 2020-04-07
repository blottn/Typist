// Generated by CoffeeScript 2.5.1
(function() {
  var Utilities, ref,
    boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

  Utilities = class Utilities {
    constructor() {
      this._each = this._each.bind(this);
      this._empty = this._empty.bind(this);
      this._fireEvent = this._fireEvent.bind(this);
    }

    // some of the utilities methods are insipred or even copied from MooTools framework
    _addEvent(element, event, fn, useCapture = false) {
      return element.addEventListener(event, fn, useCapture);
    }

    _forEach(array, fn, bind) {
      var i, l, results;
      i = 0;
      l = array.length;
      results = [];
      while (i < l) {
        if (i in array) {
          fn.call(bind, array[i], i, array);
        }
        results.push(i++);
      }
      return results;
    }

    _each(array, fn, bind) {
      if (array) {
        this._forEach(array, fn, bind);
        return array;
      }
    }

    _pass(fn, args = [], bind) {
      return function() {
        return fn.apply(bind, args);
      };
    }

    _delay(fn, delay, bind, args = []) {
      return setTimeout(this._pass(fn, args, bind), delay);
    }

    _periodical(fn, periodical, bind, args = []) {
      return setInterval(this._pass(fn, args, bind), periodical);
    }

    _setHtml(element, string) {
      return element.innerHTML = string;
    }

    _getHtml(element) {
      return element.innerHTML;
    }

    _empty(element) {
      return this._setHtml(element, "");
    }

    _fireEvent(event, text) {
      if (this.options[event]) {
        return this.options[event].call(this, text, this.options);
      }
    }

    _extend(object, properties) {
      var key, val;
      for (key in properties) {
        val = properties[key];
        object[key] = val;
      }
      return object;
    }

  };

  ref = this.Typist = class Typist extends Utilities {
    constructor(element, options = {}) {
      super();
      this.setupDefaults = this.setupDefaults.bind(this);
      this.slide = this.slide.bind(this);
      this.fetchVariations = this.fetchVariations.bind(this);
      this.selectText = this.selectText.bind(this);
      this.selectOffset = this.selectOffset.bind(this);
      this.typeText = this.typeText.bind(this);
      this.typeLetters = this.typeLetters.bind(this);
      this.typeLetter = this.typeLetter.bind(this);
      this.options = {
        typist: element,
        letterSelectInterval: 60,
        interval: 3000,
        selectClassName: "selectedText"
      };
      this.options = this._extend(this.options, options);
      // elements
      this.elements = {
        typist: this.options.typist
      };
      // current values
      this.offsets = {
        current: {
          index: 0,
          text: ""
        }
      };
      if (this.elements.typist) {
        this.setupDefaults();
      }
    }

    setupDefaults() {
      boundMethodCheck(this, ref);
      // fetch all variations
      this.variations = this.fetchVariations(this.elements.typist);
      // this is for later
      this.newText = [];
      // set up the timer
      return this.timer = this._periodical(this.slide, this.options.interval);
    }

    slide(forcedText) {
      boundMethodCheck(this, ref);
      // pick the variation text
      this.offsets.current.text = this.variations[this.offsets.current.index];
      // split it up into letters
      this.offsets.current.text = this.offsets.current.text.split("");
      // select text per letter
      this._each(this.offsets.current.text, this.selectText);
      // set the next index
      this.offsets.current.index = this.offsets.current.index + 1;
      this._delay(() => {
        this.options.currentSlideIndex = this.offsets.current.index;
        return this.typeText(this.variations[this.offsets.current.index]);
      }, this.options.letterSelectInterval * this.offsets.current.text.length);
      // loop index
      if (this.variations.length <= this.offsets.current.index) {
        this.offsets.current.index = 0;
      } else if (this.offsets.current.index === 0) {
        this.offsets.current.index = this.variations.length;
      } else {
        this.offsets.current.index = this.offsets.current.index;
      }
      // empty the array with the newly typed text
      return this.newText.length = 0;
    }

    fetchVariations(element) {
      var text, value, variations;
      boundMethodCheck(this, ref);
      text = element.getAttribute("data-typist");
      value = this._getHtml(element);
      variations = text.split(",");
      variations.splice(0, 0, value);
      return variations;
    }

    selectText(letter, index) {
      boundMethodCheck(this, ref);
      return this._delay(() => {
        return this.selectOffset((this.offsets.current.text.length - index) - 1);
      }, index * this.options.letterSelectInterval);
    }

    selectOffset(offset) {
      var selected, text, unselected;
      boundMethodCheck(this, ref);
      text = this.offsets.current.text;
      selected = text.slice(offset, text.length);
      selected = selected.join("");
      unselected = text.slice(0, offset);
      unselected = unselected.join("");
      return this._setHtml(this.elements.typist, `${unselected}<em class="${this.options.selectClassName}">${selected}</em>`);
    }

    typeText(text) {
      boundMethodCheck(this, ref);
      // split word into letters
      this.typeTextSplit = text.split("");
      // type each letter individually
      this._each(this.typeTextSplit, this.typeLetters);
      return this._fireEvent("onSlide", text);
    }

    typeLetters(letter, index) {
      boundMethodCheck(this, ref);
      clearInterval(this.timer);
      // add some delay between typing letters
      return this._delay(() => {
        return this.typeLetter(letter, index);
      }, index * this.options.letterSelectInterval);
    }

    typeLetter(letter, index) {
      boundMethodCheck(this, ref);
      this._empty(this.elements.typist);
      this.newText.push(letter);
      this._setHtml(this.elements.typist, this.newText.join(""));
      if (this.typeTextSplit.length === index + 1) {
        return this.timer = this._periodical(this.slide, this.options.interval);
      }
    }

  };

}).call(this);
