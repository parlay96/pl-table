<template>
    <div class="firm-wrapper">
        <f-button class="firm-enter-button">快速开始</f-button>
    </div>
</template>

<script>

    export default {
        name: "logo",
        mounted() {

        },

    }
</script>

<style scoped lang="scss">
    @import "../../../assets/styles/color-select";
    .firm-enter-button {
        position: absolute;
        cursor: pointer;
        top: 70%;
        left: 50%;
        width: 140px;
        font-size: 18px !important;
        height: 50px !important;
        transform: translateX(-50%);
        color: white;
        background-color: #ea9518;
        border-color: #ea9518;
    }

</style>
