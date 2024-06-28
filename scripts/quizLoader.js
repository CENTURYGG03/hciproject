window.onload = async () => {
  const response = await fetch("https://kengomatsuo.github.io/hciproject/apis/quiz.json")
  const quizzes = await response.json()
  const current = localStorage.getItem('current')
  showQuestions(quizzes, current)

  document.getElementById('quiz-form').addEventListener('submit', e => {
    let valid = true
    for (let index = 1; index < quizzes[current].length; index++) {
      const inputs = document.getElementsByName(index)
      if (quizzes[current][index].type == "mc") {
        let totalchoice = inputs.length
        for (var i = 0; i < inputs.length; i++) {
          if (!inputs[i].checked) {
            totalchoice--
          }
        }
        if (totalchoice == 0)
          valid = false
      }
      else {
        if (inputs[0].value.length < 1) {
          valid = false
        }
      }
    }

    if (!valid) {
      alert('Please input all answers before submitting')
      e.preventDefault();
      return
    }

    const data = new FormData(e.target);

    let array = []
    let correct = 0
    let wrong = 0
    for (const [name, value] of data) {

      array.push({
        question: quizzes[current][name].question,
        answer: value,
        key: quizzes[current][name].answer,
        status: (value == quizzes[current][name].answer) ? 'Correct' : 'Wrong'
      })

      if (quizzes[current][name].answer == value)
        correct++
      else
        wrong++
    }
    const date = new Date()
    const save = {
      date: date.toLocaleString(),
      name: quizzes[current][0],
      quizindex: current,
      questions: array,
      score: correct * 100 / (correct + wrong),
    }

    let stored = JSON.parse(localStorage.getItem('attempts'))
    if (!stored)
      stored = []
    stored.push(save)
    localStorage.setItem('attempts', JSON.stringify(stored))
    localStorage.setItem('currentReview', stored.length - 1)
    
    window.location.href = './results.html'
  })
}

function showQuestions(quizzes, current) {
  document.getElementById('title').innerHTML = quizzes[current][0]
  const form = document.getElementById('quiz-form')
  for (let index = 1; index < quizzes[current].length; index++) {
    if (quizzes[current][index].type == "mc") {
      form.insertAdjacentHTML('beforeend', `
      <div class="web">
        <h2>${quizzes[current][index].question}</h2>
        <fieldset class="answerButtons">
          <div>
            <input type="radio" name="${index}" id="${index}-1" value="${quizzes[current][index].choices[0]}">
            <label for="${index}-1">${quizzes[current][index].choices[0]}</label>
          </div>
          <div>
            <input type="radio" name="${index}" id="${index}-2" value="${quizzes[current][index].choices[1]}">
            <label for="${index}-2">${quizzes[current][index].choices[1]}</label>
          </div>
          <div>
            <input type="radio" name="${index}" id="${index}-3" value="${quizzes[current][index].choices[2]}">
            <label for="${index}-3">${quizzes[current][index].choices[2]}</label>
          </div>
          <div>
            <input type="radio" name="${index}" id="${index}-4" value="${quizzes[current][index].choices[3]}">
            <label for="${index}-4">${quizzes[current][index].choices[3]}</label>
          </div>
        </fieldset>
      </div>
      `)
    }
    else {
      form.insertAdjacentHTML('beforeend', `
      <div class="web">
        <h2>${quizzes[current][index].question}</h2>
        <input type="number" name="${index}" id="${index}" placeholder="Input your answer">
      </div>
      `)
    }
  }
  form.insertAdjacentHTML('beforeend', `
    <input type="submit" class="submitButton" value="Submit">
  `)
}