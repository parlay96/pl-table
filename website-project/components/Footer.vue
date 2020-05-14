<template>
  <div style="height: 300px" class="firm-footer">
    <div class="firm-footer-link">
      <div class="firm-footer-link-to">
        <span>前往</span>
        <span @click="toTop">
           首页
        </span>
        <span>
          <router-link :to="`/components/install`">
            安装
          </router-link>
        </span>
        <span>
          <a target="_blank" href="https://github.com/livelyPeng/pl-table">
            github
          </a>
        </span>
      </div>
      <div class="firm-footer-link-dependence">
        <span>官网依赖</span>
        <span> <a target="_blank" href="https://github.com/vuejs/vue-router">Vue-router</a></span>
        <span> <a target="_blank" href="https://github.com/juliangarnier/anime">animeJs</a></span>
        <span> <a target="_blank" href="https://github.com/hongyangAndroid/Highlight">highlightJs</a></span>
        <span> <a target="_blank" href="https://github.com/markedjs/marked">marked</a></span>
      </div>
      <div class="firm-footer-link-about">
        <span>关于</span>
        <span> <a target="_blank" href="https://camo.githubusercontent.com/fc79243386477e968eb9194aba3e6d070954be4c/68747470733a2f2f6c6976656c7970656e672e6769746875622e696f2f706c2d7461626c652f6173736574732f706c5461626c65436f64652e706e67">联系qq</a></span>
      </div>
      <div class="firm-footer-link-more">
        <span>更多</span>
        <span class="nav-react">
             <f-icon style="margin-right: 10px" font-size="30px" name="Vue">
             </f-icon>
                    Vue UI组件库
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Footer",
    methods: {
      toTop() {
        window.scrollTo(0, 0)
        document.querySelector('#app').scrollTop = 0
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/styles/color-select";

  .firm-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &-link {
      display: flex;
      text-align: center;

      &-to, &-about, &-dependence, &-more {
        display: flex;
        margin-left: 60px;
        margin-right: 60px;
        flex-direction: column;

        span {
          font-size: 13px;

          a {
            text-decoration: none;
            color: #a4a4a4;
            transition: .25s color ease;

            &:hover {
              color: #eec24e;
            }
          }

          color: #a4a4a4;
          margin-top: 15px;
          cursor: pointer;

          &:hover {
            color: #eec24e;
          }

          &:first-child {
            font-size: 18px;
            cursor: text;
          }
        }

      }

      &-about {
        span {
          &:first-child {
            color: #27AE60;
          }
        }
      }

      &-to {
        span {
          &:first-child {
            color: #08AEEA;
          }
        }
      }

      &-dependence {
        span {
          &:first-child {
            color: #fdcb63;
          }
        }
      }

      &-more {
        span {
          &:first-child {
            color: #ab37cb;
            font-size: 18px;
          }
        }
      }
    }
  }

  .nav-react, .nav-svg {
    margin-top: 21px !important;
    padding: 9px;
    font-size: 23px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white !important;
    transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.35s cubic-bezier(0.215, 0.61, 0.355, 1);

    &:hover {
      transform: scale(1.03);
    }

  }

  .nav-react {
    width: 300px;
    height: 100px;
    cursor: pointer;
    background-color: #8D48C9;
    background-image: linear-gradient(20deg, #8D48C9 0%, #F76B1C 100%);
    background-image: -webkit-linear-gradient(20deg, #8D48C9 0%, #F76B1C 100%);
    background-image: -moz-linear-gradient(20deg, #8D48C9 0%, #F76B1C 100%);
    background-image: -o-linear-gradient(20deg, #8D48C9 0%, #F76B1C 100%);
    border-radius: 10px;
  }

  .nav-svg {
    width: 300px;
    height: 100px;
    background-color: #F4D03F;
    background-image: linear-gradient(132deg, #F4D03F 0%, #16A085 100%);
    background-image: -webkit-linear-gradient(132deg, #F4D03F 0%, #16A085 100%);
    background-image: -moz-linear-gradient(132deg, #F4D03F 0%, #16A085 100%);
    background-image: -o-linear-gradient(132deg, #F4D03F 0%, #16A085 100%);
    border-radius: 10px;
  }
</style>
