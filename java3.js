window.onload = function() {
    document.getElementById("greenBox").onclick = function() {
        document.getElementById("blackBox").style.display = 'flex';
    }
}

function hideBox() {
    document.getElementById("blackBox").style.display = 'none';
}



window.addEventListener("DOMContentLoaded", function() {
    var streaming = false,
        video        = document.querySelector('#video'),
        cover        = document.querySelector('#cover'),
        canvas       = document.querySelector('#canvas'),
        photo        = document.querySelector('#photo'),
        startbutton  = document.querySelector('#startbutton'),
        width = 320,
        height = 0;
  
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function(err) {
      console.log("An error occurred: " + err);
    });
  
    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);
  
    function takepicture() {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }
  
    startbutton.addEventListener('click', function(ev){
        takepicture();
      ev.preventDefault();
    }, false);
  
  }, false);

  async function takepicture() {
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(video, 0, 0, width, height);
  var data = canvas.toDataURL('image/png');

  let blob = await fetch(data).then(r => r.blob());
  let formData = new FormData();
  formData.append('image_file', blob);
  formData.append('size', 'auto');

  let requestOptions = {
    method: 'POST',
    headers: { 'X-Api-Key': 'your-api-key' },
    body: formData,
    redirect: 'follow'
  };

  fetch("https://api.remove.bg/v1.0/removebg", requestOptions)
    .then(response => response.blob())
    .then(result => {
      let objectURL = URL.createObjectURL(result);
      photo.setAttribute('src', objectURL);
    })
    .catch(error => console.log('error', error));
}

startbutton.addEventListener('click', function(ev) {
  takepicture();
  ev.preventDefault();
}, false);


async function takepicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');
  
    let blob = await fetch(data).then(r => r.blob());
    let formData = new FormData();
    formData.append('image_file', blob);
    formData.append('size', 'auto');
  
    let requestOptions = {
      method: 'POST',
      headers: { 'X-Api-Key': 'your-api-key' },
      body: formData,
      redirect: 'follow'
    };
  
    fetch("https://api.remove.bg/v1.0/removebg", requestOptions)
      .then(response => response.blob())
      .then(result => {
        let objectURL = URL.createObjectURL(result);
        photo.setAttribute('src', objectURL);
      })
      .catch(error => console.log('error', error));
  }
  
  startbutton.addEventListener('click', function(ev) {
    takepicture();
    ev.preventDefault();
  }, false);
  

  
