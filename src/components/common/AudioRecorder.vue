<template>
    <div>
        <button type="button" class="audio-recorder-button"
            v-if="!onRecord && !onNoAudio"
            :disabled="!recorder"
            @click="beginRecording">
              <i class="fa fa-microphone" v-if="recorder"></i>
              <i class="fa fa-microphone-slash" v-if="!recorder"></i>
        </button>

        <button type="button" class="stop-button"
            v-if="onRecord && !onNoAudio"
            :disabled="!recorder"
            @click="stopRecording">
              <i class="fa fa-stop"></i>
        </button>
    </div>
</template>

<script>
export default {
  name: 'AudioRecorder',
  data () {
    return {
      onRecord: false,
      onNoAudio: false,
      recorder: null,
      result: null,
    }
  },
  mounted() {
    // We need to check if speech recognition is available..
    if (window.webkitSpeechRecognition || window.SpeechRecognition) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      this.recorder = new SpeechRecognition();
      this.recorder.onresult = (event) => {
        this.result = event.results[0][0];
      };
    }
  },
  methods: {
    beginRecording() {
      if(this.recorder) {
        this.recorder.start();
        this.onRecord = true;
      }
    },
    stopRecording() {
      if(this.recorder) {
        this.recorder.stop();
        this.onRecord = false;
      }
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

.stop-button:hover {
  background-color: red;
}

.stop-button:active {
  background-color: red;
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

.audio-recorder-button:hover {
  background-color: darkgrey;
}

.audio-recorder-button:active {
  background-color: grey;
}
.audio-recorder-button:disabled {
  background-color: lightgrey;
}
</style>
