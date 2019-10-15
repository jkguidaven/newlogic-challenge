<template>
    <div class="response-container">
        <button type="button" class="play-button" @click="play">
            <i class="fa fa-play"></i>
        </button> 
        You responded "{{ transcript }}"
    </div>
</template>

<script>
export default {
  name: 'AudioResult',
  props: ['audioUrl', 'transcript'],
  methods: {
    play() {
        const audio = new Audio(this.audioUrl);
        audio.play();
    }
  }
}
</script>

<style scoped>

.play-button {
  background-color: lightslategray;
  border: none;
  color: white;
  padding: 15px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 15px;
  border-radius: 50%;
  outline: none;
}

.play-button:active { background-color: grey; }
.play-button:hover { background-color: darkgrey; }
.play-button:disabled { background-color: lightgrey; }

.response-container {
  margin: 50px 0;
  text-align: center;
}
</style>
