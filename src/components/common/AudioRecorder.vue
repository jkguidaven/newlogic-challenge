<template>
  <div>
    <button type="button" class="audio-recorder-button"
        v-if="!onRecord && !onNoAudio"
        :disabled="!recognition"
        @click="beginRecording">
          <i class="fa fa-microphone" v-if="recognition"></i>
          <i class="fa fa-microphone-slash" v-else></i>
    </button>

    <button type="button" class="stop-button"
        v-if="onRecord && !onNoAudio"
        :disabled="!recognition"
        @click="stopRecording">
          <i class="fa fa-stop"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AudioRecorder',
  props: ['expect'],
  data () {
    return {
      onRecord: false,
      onNoAudio: false,
      recognition: null,
      recorder: null,
      audioChunks: []
    }
  },
  mounted() {
    // We need to check if speech recognition is available..
    if (window.webkitSpeechRecognition || window.SpeechRecognition) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.interimResults = true;
      this.recognition.continuous = true;
      this.recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        
        if(this.expect.includes(transcript)) {
          
          const response = {
            audioUrl: URL.createObjectURL(new Blob(this.audioChunks)),
            transcript
          };
          this.stopRecording();
          this.$emit("onResponseRecorded", response);
        }
      };
    }
  },
  methods: {
    beginRecording() {
      // we need to make sure audio recording and speech recognition is supported
      if(navigator.mediaDevices && this.recognition ) {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            this.audioChunks.length = 0; // clear current audio chunks
            this.recorder = new MediaRecorder(stream);
            this.recorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };
            this.recorder.start(100);
            this.recognition.start();
            this.onRecord = true;
          });
      }
    },
    stopRecording() {
      this.recognition.stop();
      this.recorder.stream.getAudioTracks().forEach(function(track) {
          track.stop();
      });
      this.onRecord = false;
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

.audio-recorder-button:active { background-color: grey; }
.audio-recorder-button:hover { background-color: darkgrey; }
.audio-recorder-button:disabled { background-color: lightgrey; }
</style>
