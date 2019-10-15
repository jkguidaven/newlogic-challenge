<template>
  <Content title="Consent Form">
    <p>
      You understand that by using this site or site services, you agree to be bound
      by this agreement. If you do not accept this agreement in its entirety, you must
      not access or use the site or the site services.
    </p>
    
    <p>
      Do you agree to this agreement? Please response by saying "{{ strYes }}" or "{{ strNo }}".
    </p>

    <AudioRecorder v-if="!response" v-bind:expect="['yes', 'no']" @onResponseRecorded="handleResponse"/>
    <div v-else>
      <AudioResult v-bind:transcript="response.transcript" v-bind:audioUrl="response.audioUrl" />
      <div class="btn-group float-right" >
        <button type="button" class="btn btn-success" @click="clear">
          Retry <i class="fa fa-redo" />
        </button>

        <button type="button" class="btn btn-success" @click="save">
          Save <i class="fa fa-arrow-right" />
        </button>
      </div>
    </div>
  </Content>
</template>

<script>
import AudioRecorder from '../common/AudioRecorder';
import AudioResult from '../common/AudioResult';
import Content from '../common/Content';
import { Router } from '../../routes';

export default {
  name: 'ConsentForm',
  components: {
    AudioRecorder,
    AudioResult,
    Content
  },
  data () {
    return {
      strYes: "Yes",
      strNo: "No",
      response: null,
      name: this.$route.query.name,
      language: this.$route.query.language,
    }
  },
  mounted() {
    if(!this.name || this.name.trim() == "" ||
      !this.language || this.language.trim() == "") {
        Router.push("/");
    }
  },
  methods: {
    handleResponse(response) {
      this.response = response;
    },
    clear() {
      this.response = null;
    },
    save() {
      Router.push("/confirmation");
    }
  }
}
</script>
