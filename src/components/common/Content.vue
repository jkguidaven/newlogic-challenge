<template>
    <section class="content-container">
        <h1 class="text-center">{{ title }}</h1>
        <br/>
        <slot></slot>
    </section>
</template>

<script>
export default {
  name: 'Content',
  props: {
      title: String
  }
}
</script>

<style scoped>
.content-container {
    max-width: 600px;
    margin: 50px auto;
}
</style>