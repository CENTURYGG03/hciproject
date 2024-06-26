window.onload = async () => {
  const response = await fetch("../apis/videos.json")
  const videos = await response.json()
  if (!localStorage.getItem('current'))
    localStorage.setItem('current', 0)
  var current = localStorage.getItem('current')
  console.log('hey')
  installCurrentVideo(videos, current)
}

function installCurrentVideo(videos, current) {
  console.log(videos[current].video)
  document.getElementById('main-video').innerHTML = `
  <div class="video">
    <video controls autoplay muted>
        <source id="main-video" src="${videos[current].video}" type="video/mp4">
    </video>
    <h2 class="title">${videos[current].title}</h2>
  </div>

  <div class="instructor">
    <img src="assets/img/profilepic-1.jpg" alt="profile picture">
    <div class="profile">
        <h3>${videos[current].teacher}</h3>
        <h5>${videos[current].degree}</h5>
    </div>
    <a href="#" class="action-btn" id="see-detail-btn">Take Quiz</a>
  </div>

  <div class="desc-container">
    <div class="desc">
        <h4>${videos[current].views} views</h4>
        <div class="list">
            <p id="learning-objectives">Learning Objectives :</p>
        </div>
    </div>
  </div>
  `
  const objectives = document.getElementById('learning-objectives')
  videos[current].objectives.forEach(element => {
    objectives.insertAdjacentHTML('beforeend', `
    <li>${element}</li>
    `)
  });
  const related = document.getElementById('related-videos')
  for (let index = 0; index < videos.length; index++) {
    if (index == current)
      continue
    console.log(videos[index].views)
    related.insertAdjacentHTML('beforeend', `
    <div class="vid" onclick="changeVideos(${index})">
      <video muted poster="assets/img/thumbnail${index + 1}.png">
      </video>
      <div class="text">
        <h2 class="title">${videos[index].title}</h2>
        <h3>${videos[index].teacher}</h3>
        <h5>${videos[index].views} views</h5>
      </div>
    </div>
    `)
  }
}

function changeVideos(num) {
  localStorage.setItem('current', num)
  window.location.reload()
}