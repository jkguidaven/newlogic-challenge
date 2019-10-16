<template>
  <div>
    <button
      type="button"
      class="audio-recorder-button"
      v-if="!onRecord && !onNoAudio"
      :disabled="!recognition"
      @click="beginRecording"
    >
      <i v-if="recognition" class="fa fa-microphone"></i>
      <i v-else class="fa fa-microphone-slash"></i>
    </button>

    <button
      type="button"
      class="stop-button"
      v-if="onRecord && !onNoAudio"
      :disabled="!recognition"
      @click="stopRecording"
    >
      <i class="fa fa-stop"></i>
    </button>
  </div>
</template>

<script>
  const methods = {
    beginRecording: function () {
      // we need to make sure audio recording and speech recognition is supported
      if(navigator.mediaDevices && this.recognition ) {
        /*
         * The speech API appears doesn't allow us to get the audio stream so we
         * could pull the audio data. Instead we create a new stream and listen
         * from that and pull audio chunks from the stream.
        */
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            // clear current audio chunks
            this.audioChunks.length = 0;

            this.recorder = new MediaRecorder(stream);
            this.recorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            // set time slice by 100 milisecond to capture quicker
            this.recorder.start(100);

            this.recognition.start();
            this.onRecord = true;
          });
      }
    },
    stopRecording: function () {
      this.recognition.stop();
      this.recorder.stream.getAudioTracks().forEach(function(track) {
          track.stop();
      });
      this.onRecord = false;
    }
  };

  export default {
    name: 'AudioRecorder',
    methods,
    props: {
      'language': String,
      'expect': Array
    },
    data: function () {
      return {
        onRecord: false,
        onNoAudio: false,
        recognition: null,
        recorder: null,
        audioChunks: []
      }
    },
    mounted: function () {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      
      // We need to check if speech recognition is available..
      if (SpeechRecognition) {
        /*
         * We want to capture transcript results as quick as possible.
         * setting 'intermiResults' to true will help us to do that.
         * We also want to keep capturing until we get correct response
         * so we set 'continuous' to true.
        */ 
        this.recognition = new SpeechRecognition();
        this.recognition.interimResults = true;
        this.recognition.continuous = true;
        this.recognition.lang = this.language;

        this.recognition.onresult = (event) => {

          // we only care about the current transcript result
          const transcript = event.results[event.resultIndex][0].transcript;
          
          /*
           * If we get expected words from the transcript result, we then
           * stop the recording and emit it as a response result
          */
          this.expect.forEach((value) => {
            if (value.toLowerCase() == transcript) {
              const response = {
                audio: new Blob(this.audioChunks),
                transcript: value
              };
              this.stopRecording();
              this.$emit("onResponseRecorded", response);
            }
          });
        };
      }
    }
  }
</script>

<style scoped>
  .stop-button {
    background-color: red;
    border: none;
    color: white;
    padding: 15px 20px;
    text-align: center;
    text-decoration: none;
    display: block;
    margin: 50px auto;
    font-size: 15px;
    border-radius: 50%;
    outline: none;
  }

  .audio-recorder-button {
    background-color: lightslategray;
    border: none;
    color: white;
    padding: 15px 20px;
    text-align: center;
    text-decoration: none;
    display: block;
    margin: 50px auto;
    font-size: 15px;
    border-radius: 50%;
    outline: none;
  }

  .audio-recorder-button:active {
    background-color: grey;
  }

  .audio-recorder-button:hover {
    background-color: darkgrey;
  }

  .audio-recorder-button:disabled {
    background-color: lightgrey;
  }
</style>
