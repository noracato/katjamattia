import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['ball']

  connect() {
    this.directionX = 1
    this.directionY = 1
    this.speed = 1
    this.ballMoving = setInterval(this.moveBall.bind(this), 10)
  }

  destroy() {
    this.element.classList.add('fade')
    clearInterval(this.ballMoving)

    setTimeout(() => {this.element.remove()}, 2000)
  }

  moveBall(){
    let ballSize = this.ballTarget.style.height
    let offSetTop = this.ballTarget.offsetTop
    let offSetLeft = this.ballTarget.offsetLeft

    if (offSetTop + ballSize > window.innerHeight) {
      this.directionY = -1
    } else if (offSetTop  < 0) {
      this.directionY = 1
    }

    if (offSetLeft + ballSize > window.innerWidth) {
      this.directionX = -1;
    } else if (offSetLeft < 0) {
      this.directionX = 1;
    }

    this.ballTarget.style.top = offSetTop + (this.speed * this.directionY) + 'px'
    this.ballTarget.style.left = offSetLeft + (this.speed * this.directionX) + 'px'
  }
}




