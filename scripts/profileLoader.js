window.onload = () => {
  if (localStorage.getItem('auth') != 'true')
    window.location.href = './register.html'
  document.getElementById('username').innerHTML = localStorage.getItem('username')
  document.getElementById('dob').innerHTML = localStorage.getItem('dob')
  document.getElementById('email').innerHTML = localStorage.getItem('email')
  document.getElementById('gender').innerHTML = localStorage.getItem('gender')
  const attempts = JSON.parse(localStorage.getItem('attempts'))
  console.log(attempts)
  let total = 0
  attempts.forEach(element => {
    total += element.score
  })
  const avg = total / attempts.length
  document.getElementById('avg').innerHTML = avg
}