window.addEventListener('load', function(){
    const canvas = document.getElementById("canvas1");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const selectAudioBtn1 = this.document.getElementById("selectAudioBtn");
    let audioSource;
    let analyser;

    const btn1 = document.getElementById("btn-1");
    const btn2 = document.getElementById("btn-2");
    const btn3 = document.getElementById("btn-3");
    const btn4 = document.getElementById("btn-4");
    const btn5 = document.getElementById("btn-5");


    btn1.addEventListener('click', function() {
      document.getElementById("demo").innerHTML = "sample-3s";
    });

    btn2.addEventListener('click', function() {
      document.getElementById("demo").innerHTML = "sample-9s";
    });

    btn3.addEventListener('click', function() {
      document.getElementById("demo").innerHTML = "sample-6s";
    });

    btn4.addEventListener('click', function() {
      document.getElementById("demo").innerHTML = "sample-12s";
    });

    btn5.addEventListener('click', function() {
      document.getElementById("demo").innerHTML = "sample-15s";
    });

    selectAudioBtn1.addEventListener('click', function() {

    const audio1 = document.getElementById("audio1");
      audio1.src = 'audioSamples/' + document.getElementById("demo").innerHTML + '.mp3';
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

