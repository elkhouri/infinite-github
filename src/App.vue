<template>
  <div id="app">
    <Github/>
  </div>
</template>

<script lang="ts">
import Github from './components/Github/Github.vue';

export default {
  components: { Github }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 61px;
}
</style>
