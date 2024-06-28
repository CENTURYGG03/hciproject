class navBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav class="shaded-box andika-regular">
      <a href="./index.html">Home</a>
      <a href="./video.html">Learning</a>
      <a href="">Contact Us</a>
      <a href="${(localStorage.getItem('auth')) ? './profile.html' : './register.html'}" id="start-button">${(localStorage.getItem('auth')) ? localStorage.getItem('username') : 'Join us'}</a>
    </nav>
    `
  }
}

customElements.define('navigation-bar', navBar)