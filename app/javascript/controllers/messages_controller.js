import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['list', 'form', 'footer', 'name', 'mess']

  connect() {
    this.last_message_id = this.element.getAttribute('data-lastmessage');
    this.interval = setInterval(this.getNewMessage.bind(this), 5000);
    this.setHeight()
    window.addEventListener('scroll', this.onScroll.bind(this))
    this.lastScroll = window.pageYOffset || document.documentElement.scrollTop
  }

  setHeight() {
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let footerHeight = this.footerTarget.clientHeight
    this.listTarget.style.margin =  "0 0 " + footerHeight + "px 0"
  }

  disconnect() {
    clearInterval(this.interval);
  }

  handleSubmit(){
    this.formTarget.reset()
    this.getNewMessage();
  }

  getNewMessage(){
    fetch(this.element.getAttribute('data-endpoint'), {
      method: 'GET',
      credentials: 'same-origin',
      redirect: 'error',
      headers: { accept: "application/json" }
    }).then((response) => response.json())
    .then((data) => {
        if (data['id'] > this.last_message_id){
          this.addMessage(data);
          this.last_message_id = data['id'];
        }
    });
  }

  addMessage(data) {
    var container = document.createElement("div");
    container.classList.add('col', 'message-container');

    let name = document.createElement("div");
    name.classList.add('row', 'name');
    name.appendChild(document.createTextNode(data['name']));

    let mess = document.createElement("div");
    mess.classList.add('row', 'message');
    mess.appendChild(document.createTextNode(data['message']));

    let time = document.createElement("div");
    time.classList.add('row', 'time');
    time.appendChild(document.createTextNode(data['time']));


    container.appendChild(name);
    container.appendChild(mess);
    container.appendChild(time);
    this.listTarget.prepend(container);
  }

  onScroll() {
    if (document.activeElement === this.nameTarget || document.activeElement === this.messTarget) {
      return
    }

    let currentScroll = window.pageYOffset || document.documentElement.scrollTop
    if (this.lastScroll < currentScroll && currentScroll > 0) {
      this.footerTarget.classList.add('down')
    } else {
      this.footerTarget.classList.remove('down')
    }
    this.lastScroll = currentScroll
  }
}
