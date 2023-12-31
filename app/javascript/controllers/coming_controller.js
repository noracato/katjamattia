import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['ball', 'content']

  connect() {
    let alreadyViewed = localStorage.getItem("katjamattia-welcome") || 0;
    if (alreadyViewed == 1){
      this.element.remove();
    }

    this.element.style.height = window.innerHeight + "px"
    this.contentTarget.style.height = window.innerHeight + "px"

    this.directionX = Math.random() < 0.5 ? -1 : 1
    this.directionY = Math.random() < 0.5 ? -1 : 1
    this.speed = 1
    this.ballMoving = setInterval(this.moveBall.bind(this), 10)
  }

  destroy() {
    localStorage.setItem("katjamattia-welcome", 1);

    this.contentTarget.classList.add('fade')
    clearInterval(this.ballMoving)
    this.bigBall()

    // bigBall transition takes 5000
    // stay for 100 -> remove elem at 5100
    // full thing fading takes 2000
    // 5100 - 2000 = start fade at 3200

    setTimeout(() => {
      this.element.classList.add('fade')
    }, 3100)

    setTimeout(() => {
      this.element.remove()
    }, 5100)
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




