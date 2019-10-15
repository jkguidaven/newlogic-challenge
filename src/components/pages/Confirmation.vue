<template>
  <Content title="Consent Form" class="text-center">
    <span class="consent-icon"><i class="fa fa-clipboard-check"></i></span>
    <br/>
    <br/>
    <p>Thank you, your consent has been successfully saved!</p>
    <router-link class="nav-link" to="/consents">
        View all consents
    </router-link>
  </Content>
</template>

<script>
import Content from '../common/Content';

export default {
  name: 'ConsentConfirmation',
  components: {
    Content
  }
}
</script>

<style scoped>
.consent-icon {
  background-color: lightgray;
  border: none;
  color: white;
  padding: 15px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 15px;
  border-radius: 50%;
  outline: none;
  margin: 30px;
  display: inline-block;
}

.nav-link {
  text-decoration-line: underline;
  text-decoration-style: dashed;
  color: black;
  font-weight: bold;
}
</style>