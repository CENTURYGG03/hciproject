window.onload = async () => {
  const response = await fetch("../apis/quiz.json")
  const quizzes = await response.json()
  const current = localStorage.getItem('currentReview')
  const attempts = JSON.parse(localStorage.getItem('attempts'))
  showResults(quizzes[attempts[current].quizindex], attempts[current])
}

function showResults(quiz, attempt) {
  document.getElementById('title').innerHTML = `Review: ${attempt.name}`
  const answer = document.getElementById('review-list')
  for (let index = 0; index < attempt.questions.length; index++) {
    console.log(attempt.questions[index].key)
    if (quiz[index + 1].type == "mc") {
      answer.insertAdjacentHTML('beforeend', `
      <div class="web">
        <h3 class="${attempt.questions[index].status.toLowerCase()}">${attempt.questions[index].status}</h3>
        <h2>${quiz[index + 1].question}</h2>
        <fieldset class="answerButtons">
          <div>
            <label class="review${(quiz[index + 1].choices[0] == attempt.questions[index].key) ? ' key' : (quiz[index + 1].choices[0] == attempt.questions[index].answer) ? ' chosenwrong' : ''}">${quiz[index + 1].choices[0]}</label>
          </div>
          <div>
            <label class="review${(quiz[index + 1].choices[1] == attempt.questions[index].key) ? ' key' : (quiz[index + 1].choices[1] == attempt.questions[index].answer) ? ' chosenwrong' : ''}">${quiz[index + 1].choices[1]}</label>
          </div>
          <div>
            <label class="review${(quiz[index + 1].choices[2] == attempt.questions[index].key) ? ' key' : (quiz[index + 1].choices[2] == attempt.questions[index].answer) ? ' chosenwrong' : ''}">${quiz[index + 1].choices[2]}</label>        
          </div>
          <div>
            <label class="review${(quiz[index + 1].choices[3] == attempt.questions[index].key) ? ' key' : (quiz[index + 1].choices[3] == attempt.questions[index].answer) ? ' chosenwrong' : ''}">${quiz[index + 1].choices[3]}</label>        
          </div>
        </fieldset>
      </div>
      `)
    }
    else {
      console.log(attempt.questions[index].key)
      answer.insertAdjacentHTML('beforeend', `
      <div class="web">
        <h3 class="${attempt.questions[index].status.toLowerCase()}">${attempt.questions[index].status}</h3>
        <h2>${quiz[index+1].question}</h2>
        <input type="number" class="review" name="${index}" id="${index}" value="${attempt.questions[index].answer}">
        ${(attempt.questions[index].answer !== attempt.questions[index].key) ? `<h4 class="correct">Correct Answer: ${attempt.questions[index].key}</h4>` : ''}
      </div>
      `)
    }
  }
  answer.insertAdjacentHTML('beforeend', `
    <a href="./video.html">Return to Video</a>
  `)
}