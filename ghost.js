class Ghost {
    constructor(anchor, options = {}) {
        let defaults = {
            letterSelectInterval: 60,
            interval: 3000,
            selectClassName: "selectedText",
        };

        this.options = {...defaults, ...options};

        this.ctrl = new TextController(anchor);
    }

    async display(word) {
        let selectAll = this.ctrl.selectAll.bind(
            this.ctrl,
            this.options.selectClassName
        );
        let showWord = this.ctrl.typeWord.bind(
            this.ctrl,
            word,
        );
        await this.withDelay(selectAll, this.options.letterSelectInterval)
        await this.withDelay(showWord, this.options.letterSelectInterval)
    }
    
    async withDelay(func, time) {
        let next = func();

        while (next) {
            next = next();
            await this.delay(time);
        } 
    }

    delay(time) {
        return new Promise((resolve) => setTimeout(resolve, time))
    }
}

class TextController {
    constructor(dom) {
        this.dom = dom;
        this.content = dom.innerText
    }

    selectAll(selectionClass) {
        let offset = 0;
        if (offset >= this.content.length) {
            return false;
        }

        let next = () => {
            this.select(selectionClass, offset)
            offset += 1
            if (offset < this.content.length) {
                return next
            }
            return false;
        }
        return next.bind(this);
    }

    select(selectionClass, offset) {
        let pivot = this.content.length - offset - 1;
        let selected = this.content.slice(pivot, this.content.length);
        let unselected = this.content.slice(0, pivot);
        this.dom.innerHTML = `${unselected}<em class="${selectionClass}">${selected}</em>`
    }

    
    typeWord(word) {
        let index = 0;
        if (index >= word.length) {
            return false
        }
        let next = () => {
            this.dom.innerHTML = word.slice(0, index)
            index += 1
            if (index <= word.length)
                return next;
            this.content = word;
            return false;
        }
        return next.bind(this);
    }
}
