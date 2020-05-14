<template>
  <div class="f-catalogue">
    <div v-if="h2Lists.length>0" class="f-catalogue-ul">
      <div ref="line" class="f-catalogue-active-bar"></div>
      <div v-for="li in h2Lists" :key="li.id" :class="{'f-catalogue-active':li.id===activeId}"
           class="f-catalogue-li">
        <router-link :to="`#`+li.id">{{getLiName(li)}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "catalogue",
    data() {
      return {
        h2Lists: [],
        activeId: null
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.h2Lists = this.getAllH2Tag()
        if (this.h2Lists.length === 0) return
        let {hash} = this.$route
        if (hash) this.activeId = hash.slice(1)
        this.$nextTick(() => this.activeLineMove())
      },
      isOnScroll(el) {
        let {scrollTop} = el
        let elShow = this.h2Lists.find(_el => _el.offsetTop - 32 >= scrollTop)
        this.activeId = elShow.id
        this.activeLineMove()
      },
      getAllH2Tag() {
        return Array.prototype.slice.call(document.querySelectorAll('h2'))
      },
      getLiName(li) {
        return li.innerText.slice(1)
      },
      getActiveLiIndex() {
        if (!this.activeId) return null
        return this.h2Lists.findIndex(list => list.id === this.activeId)
      },
      activeLineMove() {
        let index = this.getActiveLiIndex()
        if (index !== null && index !== -1) {
          let top = index * 18
          this.$refs.line.style.transform = `translateY(${top}px)`
        } else {
          this.$refs.line.style.transform = ''
        }
      }
    },
    watch: {
      '$route'() {
        this.init()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/color-select";
  @import "../../assets/styles/shadow-select";

  .f-catalogue {
    font-size: 12px;
    cursor: pointer;

    &-ul {
      position: relative;

      &::before {
        content: '';
        display: block;
        position: absolute;
        left: -13px;
        top: 0;
        height: 100%;
        width: 3px;
        transition: .3s all ease-in-out;
        background-color: #c2c5cb;
        z-index: 1;
      }

      a {
        text-decoration: none;
        color: #606266;
        transition: .3s color ease-in-out;
      }
    }

    &-li {
      height: 18px;
      position: relative;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &-active-bar {
      display: block;
      position: absolute;
      left: -13px;
      top: 0;
      height: 17px;
      width: 3px;
      transition: .3s transform ease-in-out;
      background-color: #ffb311;
      z-index: 2;
    }

    &-active {
      a {
        color: #ffb311;
      }
    }
  }
</style>
