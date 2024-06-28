window.onload = () => {
  date = new Date()
  if (localStorage.getItem('auth') != 'true')
    window.location.href = './register.html'
  document.getElementById('username').innerHTML = localStorage.getItem('username')
  document.getElementById('dob').innerHTML = localStorage.getItem('dob')
  document.getElementById('email').innerHTML = localStorage.getItem('email')
  document.getElementById('gender').innerHTML = localStorage.getItem('gender')
  const attempts = JSON.parse(localStorage.getItem('attempts'))
  let total = 0
  const history = document.getElementById('history')
  if (attempts) {
    attempts.forEach(element => {
      total += element.score
    })
    const avg = total / attempts.length
    document.getElementById('avg').innerHTML = avg
    
    attempts.forEach((element, index) => {
      history.insertAdjacentHTML('afterbegin', `
    <hr>
    <a class="history" href="./results.html" onclick="updateReview(${index})">
      <p class="kalam-regular date">${element.date}</p>
      <p class="kalam-regular name">${element.name}</p>
      <div class="result">
        <p class="kalam-regular correct">${element.score + '%'}</p>
      </div>
      <p class="kalam-regular">></p>
    </a>
    `)
    })
  }
  history.insertAdjacentHTML('afterbegin', `
    <h1 class="andika-regular">History</h1>
  `)
}

function updateReview(index) {
  localStorage.setItem('currentReview', index)
}