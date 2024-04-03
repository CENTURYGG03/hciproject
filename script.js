
window.onload = function () {
  const oriColor = getRandomColor()
  const invColor = invertColor(oriColor)
  document.body.style.background = oriColor
  document.getElementById("warn").style.color = invColor
}

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

function invertColor(hex) {
  // Remove the '#' if present
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // Invert color components
  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16);
  const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16);
  const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);

  // Pad each component with zeros and return the inverted color
  return `#${padZero(r)}${padZero(g)}${padZero(b)}`;
}

function padZero(str, len = 2) {
  const zeros = '0'.repeat(len);
  return (zeros + str).slice(-len);
}