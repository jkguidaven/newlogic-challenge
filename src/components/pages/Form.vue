<template>
  <Content title="Consent Form">
    <p>
      You understand that by using this site or site services, you agree to be bound
      by this agreement. If you do not accept this agreement in its entirety, you must
      not access or use the site or the site services.
    </p>
    
    <p>
      Do you agree to this agreement? Please response by saying "{{ language.translation.yes }}"
      or "{{ language.translation.no }}".
    </p>

    <!-- Audio recording component -->
    <AudioRecorder
      v-if="!response"
      @onResponseRecorded="handleResponse"
      :expect="[
        language.translation.yes,
        language.translation.no
      ]"
      :lang="language.code"
    />
    <!-- response is displayed here -->
    <AudioResult
      v-else
      :transcript="response.transcript"
      :audio="response.audio"
    >
      <!-- actions for clearing or saving consent recorded audio -->
      <div class="btn-group float-right">
        <button type="button" class="btn btn-success" @click="clear">
          Retry <i class="fa fa-redo" />
        </button>

        <button type="button" class="btn btn-success" @click="save">
          Save <i class="fa fa-arrow-right" />
        </button>
      </div>
    </AudioResult>
  </Content>
</template>

<script>
  import AudioRecorder from '../common/AudioRecorder';
  import AudioResult from '../common/AudioResult';
  import { ConsentsRepository } from '../../repository';
  import Content from '../common/Content';
  import { Router } from '../../routes';
  import { Languages } from '../../languages';

  const components = {
      AudioRecorder,
      AudioResult,
      Content
  }

  const methods = {
    handleResponse: function (response) {
      this.response = response;
    },
    clear: function () {
      this.response = null;
    },
    save: function () {
      const consent = {
        response: this.response.transcript == this.language.translation.yes,
        language: this.language.code,
        audio: this.response.audio,
        name: this.name
      };

      // we know insert the data and wait to finish through callback
      ConsentsRepository.insert(consent, function () {
          Router.push("/confirmation");
        });
    }
  };
  
  export default {
    name: 'ConsentForm',
    components,
    methods,
    data: function () {
      return {
        language: Languages[this.$route.query.language],
        name: this.$route.query.name,
        response: null,
      }
    },
    mounted: function () {
      if(!this.name || this.name.trim() == "" || !this.language) {
          Router.push("/");
      }
    }
  }
</script>
