class navBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav class="shaded-box andika-regular">
      <a href="">Learn!</a>
      <a href="">Pricing</a>
      <a href="">Contact Us</a>
      <a href="./video.html" id="start-button">Start Journey</a>
    </nav>
    `
  }
}

customElements.define('navigation-bar', navBar)