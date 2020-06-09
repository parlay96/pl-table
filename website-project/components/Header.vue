<template>
    <div class="header" :class="{other:!atHome,'components-page':!atHome}">
        <div class="header-brand">
            <router-link :to="'/'">
                <f-icon :color="fColor" font-size="30" name="pl"></f-icon>
                <f-icon style="margin-left: 7px" :color="fColor" font-size="20" name="table"></f-icon>
            </router-link>
        </div>
        <div class="header-nav">
            <f-icon :color="fColor" name="left"></f-icon>
            <router-link class="header-nav-item" :to="`/${item.value}`" v-for="(item,index) in routerItems"
                         :key="index">
                {{item.name}}
            </router-link>
            <f-icon :color="fColor" name="right"></f-icon>
        </div>
      <a href="https://github.com/livelyPeng/pl-table" target="_blank">
        <div :class="{'header-angle':atHome}">
          <f-icon :color="fColor"
                  font-size="35px"
                  :class="atHome?'header-angle-icon-home':'header-angle-icon-other'" name="github1">
          </f-icon>
        </div>
      </a>
    </div>
</template>

<script>
    export default {
        name: "Header",
        computed:{
            fColor(){
                return this.atHome?'white':'#ffb311'
            }
        },
        data() {
            return {
                routerItems: [
                    {name: '首页', value: ''},
                    {name: '组件', value: 'components'},
                    {name: '指南', value: ''},
                ],
                atHome: true
            }
        },
        mounted() {
            this.isHome()
        },
        methods: {
            isHome() {
                this.atHome = this.$route.name === 'home'
            }
        },
        watch: {
            '$route'() {
                this.isHome()
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/color-select";
    @import "../assets/styles/shadow-select";

    .header {
        position: relative;
        background-color: $header-dark-2;
        z-index: 9999;
        width: 100%;
        padding: 19px;
        display: flex;
        transition: 0.36s color ease;
        align-items: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        &-brand {
            cursor: pointer;
            float: left;
          a{
            display: inline-flex;
            align-items: center;
            vertical-align: center;
          }
        }

        &-nav {
            width: 100%;
            display: inline-flex;
            align-items: center;
            justify-content: flex-end;
            text-align: end;
            margin-right: 120px;

            &-item {
                margin-left: 15px;
                margin-right: 15px;
                color: white;
                cursor: pointer;
                text-decoration: none;
                transition: color .38s ease;

                &::after {
                    position: absolute;
                    display: block;
                    content: '';
                    width: 33px;
                    height: 2px;
                    background-color: white;
                    transition: all .2s;
                    opacity: 0;
                }

                &:hover {
                    &::after {
                        transform: translateY(2px);
                        opacity: 1;
                    }
                }
            }
        }

        &-angle {
            position: absolute;
            right: 0;
            top: 0;
            width: 120px;
            height: 120px;
            border-width: 60px;
            border-style: solid;
            border-color: #1d2022 #1d2022 #313639 #313639;
            background-color: white;

            &-icon-home {
                cursor: pointer;
                position: absolute;
                top: -40px;
                transform: rotate(45deg);
                transition: .25s all ease;

                &:hover {
                    transform: rotate(56deg) scale(1.05);
                }
            }

            &-icon-other {
                cursor: pointer;
                transition: .25s all ease;

                &:hover {
                    transform: rotate(6deg) scale(1.05);
                }
            }
        }
    }

    .other {
        color: $text1-orange;
        padding-top: 16px;
        padding-bottom: 16px;
        box-shadow: $shadow-down-white;

        .header-nav {
            margin-right: 85px;
            transform: translateY(1px);
            &-item {
                color: $text1-orange;
                &::after {
                    position: absolute;
                    display: block;
                    content: '';
                    width: 33px;
                    height: 2px;
                    background-color: white;
                    transition: all .2s;
                    opacity: 0;
                }

                &:hover {
                    &::after {
                        transform: translateY(2px);
                        opacity: 1;
                    }
                }
            }
        }
    }
    .components-page{
        background-color: $header-dark-1;
    }
</style>
