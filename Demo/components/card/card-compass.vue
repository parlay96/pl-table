<template>
    <div class="card-group-item"
         @mouseenter="compass.play()"
         @mouseleave="compass.pause()"
    >
        <div class="card-group-item-title">
            <svg ref="card" class="rotate" stroke="#fafaf1" stroke-width="24" viewBox="0 0 1024 1024"
                 width="200" height="240">
                <path stroke="white" stroke-width="30"
                      d="M512 30.117647C246.964706 30.117647 30.117647 246.964706 30.117647 512s216.847059 481.882353 481.882353 481.882353 481.882353-216.847059 481.882353-481.882353S777.035294 30.117647 512 30.117647z m0 903.529412C280.094118 933.647059 90.352941 743.905882 90.352941 512S280.094118 90.352941 512 90.352941s421.647059 189.741176 421.647059 421.647059-189.741176 421.647059-421.647059 421.647059z"
                      fill="white" p-id="3712"></path>
                <path class="path" stroke="white" stroke-width="30"
                      d="M256 768l382.494118-126.494118 126.494117-382.494117-382.494117 126.494117-126.494118 382.494118z m415.623529-415.623529L602.352941 560.188235 463.811765 421.647059l207.811764-69.270588zM560.188235 602.352941l-207.811764 69.270588 69.270588-207.811764 138.541176 138.541176z"
                      fill="white" p-id="3713"></path>
            </svg>
        </div>
        <div class="card-group-item-content">
            <div class="card-group-item-content-header">
                指南
            </div>
            <div class="card-group-item-content-main">
               从安装到使用
            </div>
            <div class="card-group-item-content-more">
              <router-link  to="components/install">
                更多
              </router-link>
                <f-icon color="white" name="right"></f-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import anime from 'animejs'
    export default {
        name: "card-compass",
        mounted() {
            this.compassInit()
        },
        methods: {
            compassInit() {
                this.compass = anime({
                    targets: '.rotate',
                    duration: 1500,
                    rotate: {
                        value: 360,
                        duration: 1800,
                        easing: 'easeInOutSine'
                    },
                    delay: function (el, i) {
                        return i * 250
                    },
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutSine'

                })
                this.compass.pause()
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "public";
</style>

