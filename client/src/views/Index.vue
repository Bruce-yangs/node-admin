<template>
    <div class="index">
        <Head></Head>
        <div class="contanter-box">
            <leftMenu></leftMenu>
            <div class="contanter-home" :class="{'active':flag}">
                <router-view />
            </div>
        </div>


    </div>
</template>
<script>
    import Head from '@/components/HeadNav'
    import leftMenu from '@/components/leftMenu'
    export default {
        name: 'index',
        data(){
            return {
                flag: true
            }
        },
        components: {
            Head, leftMenu
        },
        watch:{
            $route(to) {
                if(to.path.includes('home') || to.path.includes('index')) {
                    this.flag = false;
                }else {
                    this.flag = true;
                }
            }
        }
    }
</script>
<style lang="stylus">
    .index
        width 100%
        height 100%
        overflow hidden
    .contanter-box
        display flex
        height inherit
        .contanter-home
            width 100%
            height 92.5%
            &.active
                overflow-y scroll


</style>
