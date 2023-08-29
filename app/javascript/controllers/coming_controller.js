import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['ball', 'content', 'description']

  connect() {
    this.descriptionTarget.style.bottom = 'calc(100vh - '+ window.innerHeight + "px + 1rem)"

    this.directionX = Math.random() < 0.5 ? -1 : 1
    this.directionY = Math.random() < 0.5 ? -1 : 1
    this.speed = 1
    this.ballMoving = setInterval(this.moveBall.bind(this), 10)
  }

  destroy() {
    this.contentTarget.classList.add('fade')
    clearInterval(this.ballMoving)
    this.bigBall()

    setTimeout(() => {
      this.element.classList.add('fade')
    }, 1500)

    setTimeout(() => {
      this.element.remove()
    }, 3500)
  }

  moveBall(){
    let ballSize = this.ballTarget.offsetHeight
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

  bigBall() {
    this.ballTarget.classList.remove('initial')
    this.ballTarget.classList.add('blow-up')
  }
}




