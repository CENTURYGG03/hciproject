document.getElementById('register-form').addEventListener('submit', e => {
  e.preventDefault()
  const firstName = document.getElementById('first-name').value
  if (firstName.length == 0) {
    alert('First name must be filled')
    e.preventDefault()
    return
  }
  const lastName = document.getElementById('last-name').value
  if (lastName.length == 0) {
    alert('Last name must be filled')
    e.preventDefault()
    return
  }
  const email = document.getElementById('email').value
  const regexemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!regexemail.test(email)) {
    alert('Incorrect email format')
    e.preventDefault()
    return
  }
  const dateofbirth = document.getElementById('dob').value
  if (dateofbirth.length == 0) {
    e.preventDefault()
    return
  }
  const gender = document.querySelector('input[name="gender"]:checked')?.value ?? '';
  if (gender.length == 0) {
    e.preventDefault()
    return
  }
  const password = document.getElementById('password').value
  const regexpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
  if (!regexpass.test(password)) {
    alert('Password must contain lowercase and uppercase letter, a digit, a special character, and be at least 8 characters')
    e.preventDefault()
    return
  }
  const confpass = document.getElementById('confpassword').value
  if (password != confpass) {
    alert('Confirmation password must be same as password')
    e.preventDefault()
    return
  }
  localStorage.setItem('username', firstName + ' ' + lastName)
  localStorage.setItem('email', email)
  localStorage.setItem('dob', dateofbirth)
  localStorage.setItem('gender', gender)
  localStorage.setItem('auth',true)
})