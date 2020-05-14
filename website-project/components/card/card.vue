<template>
  <div class="firm-main-card">
    <div class="description active" ref="description">
      PL Table - 一个基于vue的表格插件
    </div>
    <div class="card-group">
      <cardCompass></cardCompass>
      <cardComponent></cardComponent>
      <cardConcat></cardConcat>
    </div>
    <span class="firm-mark"></span>
  </div>
</template>

<script>
  import cardComponent from './card-components'
  import cardCompass from './card-compass'
  import cardConcat from './card-concat'

  export default {
    name: "card",
    components: {
      cardComponent,
      cardCompass,
      cardConcat
    },
    data() {
      return {
        isActive: false,
      }
    }

  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/color-select";

  .description {
    color: $text1-light;
    margin-top: 30px;
    font-size: 30px;
    opacity: 0;
    transition: all .3s ease-out;
  }

  .firm-main-card {
    height: 100vh;
    background-color: $brand1-1;
    display: flex;
    flex-direction: column;
    align-items: center;

    .card-group {
      display: flex;
      justify-content: center;
      margin-top: 50px;

    }
  }

  .firm-mark {
    width: 30px;
    height: 10px;
    margin-top: 50px;
    border-radius: 7px;
    background-color: #27AE60;
    background-image: linear-gradient(120deg, #27AE60 0%, #FAC958 50%, #E74C3C 100%);
    background-image: -webkit-linear-gradient(120deg, #27AE60 0%, #FAC958 50%, #E74C3C 100%);
    background-image: -moz-linear-gradient(120deg, #27AE60 0%, #FAC958 50%, #E74C3C 100%);
    background-image: -o-linear-gradient(120deg, #27AE60 0%, #FAC958 50%, #E74C3C 100%);
  }

  .active {
    opacity: 1;
    transform: translateY(10px);
    transition-delay: .3s;
  }

</style>
