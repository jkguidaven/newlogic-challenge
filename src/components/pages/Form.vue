<template>
  <section>
    <h1>Consents Form</h1>
    <p>
      You understand that by using this site or site services, you agree to be bound
      by this agreement. If you do not accept this agreement in its entirety, you must
      not access or use the site or the site services.
    </p>
    
    <p>
      Do you agree to this agreement? Please response by saying "{{ strYes }}" or "{{ strNo }}".
    </p>

    <AudioRecorder />
  </section>
</template>

<script>
import AudioRecorder from '../common/AudioRecorder';
import { Router } from '../../routes'

export default {
  name: 'ConsentForm',
  components: {
    AudioRecorder
  },
  data () {
    return {
      strYes: "Yes",
      strNo: "No",
      audioUrl: "",
      name: this.$route.query.name,
      language: this.$route.query.language,
    }
  },
  mounted() {
    if(!this.name || this.name.trim() == "" ||
      !this.language || this.language.trim() == "") {
        Router.push("/home");
    }
  }
}
</script>

