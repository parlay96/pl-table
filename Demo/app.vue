<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/Header'

  export default {
    name: 'app',
    components: {
      Header,
    },
  }
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
    font-family: helvetica neue, Helvetica, Arial, sans-serif;;
  }

  #app {
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
</style>
