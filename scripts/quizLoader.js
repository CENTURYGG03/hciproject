window.onload = async () => {
  const response = await fetch("../apis/quiz.json")
  const quizzes = await response.json()
  const current = localStorage.getItem('current')
  showQuestions(quizzes, current)

  document.getElementById('quiz-form').addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(e.target);
    for (const [name, value] of data) {
      if (quizzes[current][name].answer == value)
        console.log('correct')
      else
        console.log('wrong')
      console.log(name, ":", value)
    }
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
        <input type="text" name="${index}" id="${index}" placeholder="Input your answer">
      </div>
      `)
    }
  }
  form.insertAdjacentHTML('beforeend', `
    <input type="submit" class="submitButton" value="Submit">
  `)
}