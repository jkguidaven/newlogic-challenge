<template>
  <section>
    <h1>Consent Form</h1>
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
        <small id="LanguageHelp" class="form-text text-muted">
          Select a language
        </small>

        <div class="btn-group float-right">
          <button type="button" class="btn  pull-right btn-success" v-on:click="onNextPress">
            Next <i class="fa fa-arrow-right" />
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { Router } from '../../routes'

export default {
  name: 'Home',
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
      Router.push({path: "/form", query: { name: this.currentName, language: this.currentLanguage } });
    }
  }
}
</script>
