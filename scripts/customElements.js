let currentPath = window.location.pathname
currentPath = currentPath.slice(currentPath.lastIndexOf('/') + 1)

class navBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav class="shaded-box andika-regular">
      <a href="./index.html">Learn!</a>
      <a href="./video.html">Materials</a>
      <a href="${(localStorage.getItem('auth') == 'true') ? (currentPath=='profile.html') ? './index.html' : './profile.html' : './register.html'}" ${(currentPath=='profile.html') ? 'onclick="signOut()" ':''}id="start-button">${(localStorage.getItem('auth') == 'true') ? (currentPath=='profile.html') ? 'Log Out' : localStorage.getItem('username') : 'Join us'}</a>
    </nav>
    `
  }
}

customElements.define('navigation-bar', navBar)

function signOut() {
  localStorage.removeItem('username')
  localStorage.removeItem('dob')
  localStorage.removeItem('email')
  localStorage.removeItem('gender')
  localStorage.setItem('auth', false)
}