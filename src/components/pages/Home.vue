<template>
  <Content title="Consent Form">
    <form>
      <div class="form-group">
        <label for="Name">Email address</label>
        <input type="text" class="form-control" id="Name" v-model="currentName" placeholder="Enter your name">
      </div>
      
      <div class="form-group">
        <label for="Language">Language</label>
        <select class="form-control" id="Language" v-model="currentLanguage" aria-describedby="LanguageHelp" >
          <option
            v-for="language in languages"
            v-bind:key="language.value"
            v-bind:value="language.value">{{ language.text }}</option>
        </select>
      </div>
      
      <div class="btn-group float-right">
        <button type="button" class="btn btn-success" v-on:click="onNextPress">
          Next <i class="fa fa-arrow-right" />
        </button>
      </div>
    </form>
  </Content>
</template>

<script>
import Content from '../common/Content';
import { Router } from '../../routes';

export default {
  name: 'Home',
  components: {
    Content
  },
  data () {
    return {
        currentName: "",
        currentLanguage: "EN",
        languages: [
        { value: "EN", text: "English"},
        { value: "FR", text: "French"}
      ]
    };
  },
  methods: {
    onNextPress() {
      Router.push({
        path: "/form",
        query: {
          name: this.currentName,
          language: this.currentLanguage
        }
      });
    }
  }
}
</script>
