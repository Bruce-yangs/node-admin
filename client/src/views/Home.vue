<template>
    <div class="home">
        <div class="container">
            <h1 class="title">在线</h1>
            <p class="lead">专注每一天的生活，当作最后一天</p>
        </div>
    </div>
</template>

<script>
    export default {
        'name': 'home'

    }
</script>
<style scoped lang="stylus">
.home
    width 100%
    height 100%
    background url("../assets/showcase.png") no-repeat center center
    background-size 100% 100%
.container
    width 100%
    height 100%
    box-sizing border-box
    padding-top 100px
    background-color rgba(0,0,0,.7)
    text-align center
    color #fff
.title
    font-size 28px
    padding-bottom 20px
.lead
    font-size 30px

</style>
