<template>
  <div id="app" class="container">
    <Navigation :items="routes"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from './components/common/Navigation.vue'
import { routes } from './routes';

export default {
  name: 'app',
  components: {
    Navigation
  },
  data() {
    return {
      routes
    };
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
