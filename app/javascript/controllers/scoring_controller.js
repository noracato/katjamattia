import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['points', 'add', 'subtract', 'submit'];

  connect() {
    this.addTarget.addEventListener('click', this.addPoint.bind(this));
    this.subtractTarget.addEventListener('click', this.subtractPoint.bind(this));
    this.submitTarget.addEventListener('click', this.submitPoints.bind(this));
  }

  addPoint() {
    let points = parseInt(this.pointsTarget.textContent);
    this.pointsTarget.textContent = points + 1;
    this.showCircle();
  }

  subtractPoint() {
    let points = parseInt(this.pointsTarget.textContent);
    if (points - 1 < 0){
      return;
    } else {
      this.pointsTarget.textContent = points - 1;
      this.showCircle();
    }
  }

  submitPoints() {
    // console.log(JSON.stringify({points: this.pointsDifference()}));
    fetch(this.submitTarget.getAttribute('data-postto') + "?points=" + this.pointsDifference(), {
      method: 'POST',
      credentials: 'same-origin',
      redirect: 'error'
    }).then((response) => {
      if (response.ok) {
        this.removeCircle();
        this.pointsTarget.setAttribute('data-points', parseInt(this.pointsTarget.textContent));
      }
    });
  }

  pointsDifference() {
    return (parseInt(this.pointsTarget.textContent) - this.pointsTarget.getAttribute('data-points'));
  }

  showCircle(){
    this.pointsTarget.classList.add('dirty');

    if (this.pointsDifference() ==  0) {
      this.removeCircle();
    }
  }

  removeCircle(){
    this.pointsTarget.classList.remove('dirty');
  }
}
