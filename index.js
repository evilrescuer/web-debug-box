import Hammer from 'hammerjs'

const CONTAINER_STYLE = {
  border: '2px red solid',
  position: 'absolute',
  display: 'flex',
  'z-index': 9999999,
  width: '200px',
  height: '200px',
  left: '0px',
  top: '0px',
  overflow: 'scroll',
  'box-sizing': 'border-box'
}

const TARGET_STYLE = {
  flex: 1,
  width: '100%',
  'box-sizing': 'border-box',
  padding: '30px',
  overflow: 'auto'
}

const DRAGGER_STYLE = {
  width: '40px',
  height: '40px'
}

class WebDebugBox {
  init() {
    console.log('There is a web debug box running on your website')
    this.container = document.createElement('div')
    this.target = document.createElement('pre')
    this.dragger = document.createElement('img')
    this.dragger.setAttribute('src', require('./dragger.png'))

    this.container.appendChild(this.target)
    this.container.appendChild(this.dragger)

    this.setStyle(this.container, CONTAINER_STYLE)
    this.setStyle(this.target, TARGET_STYLE)
    this.setStyle(this.dragger, DRAGGER_STYLE)

    this._addBoxToPage()
    this._bindEvent()
    this.currentPointerCenterX = 0
    this.currentPointerCenterY = 0
  }

  showData(data) {
    this.target.innerHTML = JSON.stringify(data, Object.keys(data), 2)
  }

  setStyle(target, style) {
    Object.keys(style).forEach(key => target.style[key] = style[key])
  }

  setClass(className) {
    this.container.className = className
  }

  _addBoxToPage() {
    document.body.appendChild(this.container)
  }

  _bindEvent() {
    const hammer = new Hammer(this.dragger)
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
    const left = `${Number.parseFloat(this.container.style.left) + Number.parseFloat(movedX)}px`
    const top = `${Number.parseFloat(this.container.style.top) + Number.parseFloat(movedY)}px`
    this.setStyle(this.container, { left, top })
  }
}

export default new WebDebugBox()


