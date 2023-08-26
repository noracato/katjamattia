import { Controller } from "@hotwired/stimulus"

export default class extends Controller {


  connect() {
    this.assetPath = '/assets/sounds/'
  }

  play(e) {
    e.target.firstChild.play()
    // let audio = new Audio(this.assetPath + e.target.getAttribute('data-sound')+ ".mp3")
    // audio.play
  }

}
