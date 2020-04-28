import Hammer from 'hammerjs'

const DEFAULT_STYLE = {
    border: '2px red solid',
    position: 'absolute',
    'z-index': 9999999,
    width: '200px',
    height: '200px',
    left: '0px',
    top: '0px',
    overflow: 'auto'
}

class WebDebugBox {
    init() {
        console.log('There is a web debug box running on your website')
        this.target = document.createElement('pre')
        this.setStyle(DEFAULT_STYLE)
        this._addBoxToPage()
        this._bindEvent()
        this.currentPointerCenterX = 0
        this.currentPointerCenterY = 0
    }
    showData(data) {
        this.target.innerHTML = JSON.stringify(data, Object.keys(data), 2)
    }
    setStyle(style) {
        Object.keys(style).forEach(key => this.target.style[key] = style[key])
    }
    setClass(className) {
        this.target.className = className
    }
    _addBoxToPage() {
        document.body.appendChild(this.target)
    }
    _bindEvent() {
        const hammer = new Hammer(this.target)
        const pan = new Hammer.Pan({threshold: 1})
        hammer.add(pan)
        hammer.on('panstart', (event) => {
            this.currentPointerCenterX = event.center.x
            this.currentPointerCenterY = event.center.y
        })
        hammer.on('panmove', (event) => {
            const movedX = event.center.x - this.currentPointerCenterX
            const movedY = event.center.y - this.currentPointerCenterY
            this._panBox(movedX, movedY)
            this.currentPointerCenterX = event.center.x
            this.currentPointerCenterY = event.center.y
        })
    }

    _panBox(movedX, movedY) {
        this.target.style.left = `${Number.parseFloat(this.target.style.left) + Number.parseFloat(movedX)}px`
        this.target.style.top = `${Number.parseFloat(this.target.style.top) + Number.parseFloat(movedY)}px`
    }
}

export default new WebDebugBox()


