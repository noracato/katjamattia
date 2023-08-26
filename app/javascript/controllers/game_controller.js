import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['addPoints', 'addName', 'add', 'removedPoints', 'removedName', 'removed', 'footer', 'listings'];

  connect() {
    this.last_change_id = this.element.getAttribute('data-lastchange');
    this.interval = setInterval(this.getNewRank.bind(this), 5000);
    this.setHeight()
    }

  setHeight() {
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let footerHeight = this.footerTarget.clientHeight
    this.listingsTarget.style.height = (h - footerHeight - 10) + "px"
  }

  disconnect() {
    clearInterval(this.interval);
  }

  getNewRank() {
    fetch(this.element.getAttribute('data-endpoint'), {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'error',
        headers: { accept: "application/json" }
    }).then((response) => response.json())
    .then((data) => {
        this.updateRanking(data);
    });
  }

  updateRanking(data){
    if (data['last_change']['id'] > this.last_change_id){
        this.last_change_id = data['last_change']['id'];
        this.setOverlay(data['last_change']);
        setTimeout(() => { this.removeOverlays() }, 2000);

        let pointsGuest = document.getElementById(data['last_change']['guest']).querySelector('.points');
        let newPoints = parseInt(pointsGuest.textContent) + parseInt(data['last_change']['points']);
        pointsGuest.textContent = newPoints;

        this.reorderPeople(data['order']);
    }
  }

  setOverlay(last_change_data) {
    if (parseInt(last_change_data['points']) > 0){
        this.addNameTarget.textContent = last_change_data['name'];
        this.addPointsTarget.textContent = '+' + last_change_data['points'];
        this.addTarget.classList.remove('hidden');
    } else {
        this.removedNameTarget.textContent = last_change_data['name'];
        this.removedPointsTarget.textContent = last_change_data['points'];
        this.removedTarget.classList.remove('hidden');
    }
    this.footerTarget.classList.add('hidden');
  }

  removeOverlays() {
    this.addTarget.classList.add('hidden');
    this.removedTarget.classList.add('hidden');
    this.footerTarget.classList.remove('hidden');
  }

  reorderPeople(order_data) {
    for (let i = 0; i < order_data.length; i++){
        let guest = document.getElementById(order_data[i]['id']);
        guest.querySelector('.index').textContent = "#" + (i + 1);
        this.listingsTarget.appendChild(guest);
    }
  }

}
