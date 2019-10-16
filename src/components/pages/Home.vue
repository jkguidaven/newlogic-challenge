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
            v-for="(data, code) in Languages"
            :key="code"
            :value="code">{{ data.label }}</option>
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
  import { Languages, DefaultLanguage } from '../../languages';

  const components = {
    Content
  };

  const methods = {
    onNextPress: function () {
      Router.push({
        path: "/form",
        query: {
          name: this.currentName,
          language: this.currentLanguage
        }
      });
    }
  };

  export default {
    name: 'Home',
    components,
    methods,
    data: function () {
      return {
          currentName: "",
          currentLanguage: DefaultLanguage.code,
          Languages
      };
    }
  }
</script>
