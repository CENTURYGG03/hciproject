window.onload = async () => {
  const response = await fetch("../apis/quiz.json")
  const quizzes = await response.json()
  const current = localStorage.getItem('current')
  showQuestions(quizzes, current)
}

function showQuestions(quizzes, current) {
  console.log(quizzes[current])
  document.getElementById('title').innerHTML = quizzes[current][0]
}