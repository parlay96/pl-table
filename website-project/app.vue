<template>
  <div id="app">
    <!--<Header></Header>-->
    <router-view/>
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
    padding: 50px;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    scroll-behavior: smooth;
    &::-webkit-scrollbar{
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow: -moz-scrollbars-none;
  }
</style>
