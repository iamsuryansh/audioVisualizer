function myFunction() {
  var x = document.getElementById("mySelect").value;
  document.getElementById("demo").innerHTML = x;
}
window.addEventListener('load', function(){
    const container = document.getElementById("container");
    const selectAudioBtn = document.getElementById("selectAudio");
    const canvas = document.getElementById("canvas1");
    
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    let audioSource;
    let analyser;

    selectAudioBtn.addEventListener('click', function() {

    const audio1 = document.getElementById("audio1");
      audio1.src = 'audioSamples/' + document.getElementById("mySelect").value + '.mp3';
      audio1.play();
      const audioContext = new AudioContext();
      console.log(audioSource)
      if (!audioSource) {
        audioSource = audioContext.createMediaElementSource(audio1);
        analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
      }
  
      analyser.fftSize = 64;
      console.log(analyser.fftSize)
      const bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);

      const dataArray = new Uint8Array(bufferLength);

      const barWidth = (canvas.width / bufferLength);
      let barHeight;
      let x = 0;

      function animate() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        x = 0;
        analyser.getByteFrequencyData(dataArray);

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] * 1.5;
          
          const red = 250 * (i/bufferLength);
          const green = 0;
          const blue = barHeight + (2 * (i/bufferLength));

          ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

          x += barWidth + 1;
        }
        requestAnimationFrame(animate);
      }

    animate();
  });
});

