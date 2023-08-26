import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.element.parentElement.style.height = window.innerHeight + "px"
  }
}
