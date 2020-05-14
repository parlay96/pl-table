<template>
    <div class="firm-main">
        <card></card>
        <div class="divide-line"></div>
        <Footer></Footer>
    </div>
</template>

<script>
    import card from '../card/card'
    import {destroyEventListener, elementShowAddActive} from "../../utils/lazy-active"
    import Footer from '../Footer'

    export default {
        name: "Main",
        components: {
          card,
            Footer
        },
        mounted() {
            elementShowAddActive(this)
        },
        beforeDestroy(){
          destroyEventListener()
        },
        methods: {}

    }
</script>

<style scoped lang="scss">

    body {
        display: flex;
        justify-content: center;
        position: absolute;
        width: 100%;
        height: 100vh;
    }

    .divide-line {
        &::after {
            content: '';
            display: block;
            position: relative;
            border-radius: 0 100% 47% 53% / 0% 0% 100% 100%;
            background-size: cover;
            background-color: #313639;
            height: 80px;
            z-index: 100;
        }
    }

</style>
