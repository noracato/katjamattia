import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['addPoints', 'addName', 'add', 'removedPoints', 'removedName', 'removed', 'listings', 'footer', 'wtf'];

  connect() {
    this.last_change_id = this.element.getAttribute('data-lastchange');
    this.interval = setInterval(this.getNewRank.bind(this), 5000);
    this.currentOrder = []
    this.buildCurrentOrder()
  }

  disconnect() {
    clearInterval(this.interval);
  }

  buildCurrentOrder() {
    let guests = this.element.querySelectorAll('.guest')
    for (let i =0; i < guests.length; i++){
      this.currentOrder.push(parseInt(guests[i].id))
    }
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
        setTimeout(() => { this.removeOverlays() }, 3000);

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
        this.addTarget.querySelector('.icon').classList.add('active');
    } else {
        this.removedNameTarget.textContent = last_change_data['name'];
        this.removedPointsTarget.textContent = last_change_data['points'];
        this.removedTarget.classList.remove('hidden');
        this.removedTarget.querySelector('.icon').classList.add('active');
    }
    this.footerTarget.classList.add('hidden');
  }

  removeOverlays() {
    this.footerTarget.classList.remove('hidden');
    this.addTarget.classList.add('hidden');
    this.removedTarget.classList.add('hidden');
    // Based on fade out transition time of overlay
    setTimeout(() => {
      this.addTarget.querySelector('.icon').classList.remove('active');
    this.removedTarget.querySelector('.icon').classList.remove('active');
    }, 800)

  }

  reorderPeople(order_data) {
    let newOrder = []
    // overlay stays 3000, so we can remove the up down at 6000
    let timefactor = 6000;

    for (let i = 0; i < order_data.length; i++){
        let guestId = order_data[i]['id'];
        let guest = document.getElementById(guestId);
        guest.querySelector('.index').textContent = "#" + (i + 1);
        this.listingsTarget.appendChild(guest);
        newOrder.push(guestId);

        let change = guest.querySelector('.change');
        if (this.currentOrder.indexOf(guestId) > i){
          change.classList.remove('down');
          change.classList.add('up');
          change.classList.remove('hidden');
        } else if (this.currentOrder.indexOf(guestId) < i) {
          change.classList.remove('up');
          change.classList.add('down');
          change.classList.remove('hidden');
        } else {
          change.classList.add('hidden');
        }
    }
    this.currentOrder = newOrder;
  }



  wtf(){
    this.wtfTarget.classList.remove('hidden');
  }
  wtfGone(){
    this.wtfTarget.classList.add('hidden')
  }

}
