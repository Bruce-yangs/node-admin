<template>
    <div class="infoShow">
       <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8" class="row-bg-left">
                <div class="user">
                    <img :src="userInfo.avatar" alt="" class="avatar">
                </div>
            </el-col>
           <el-col :span="16" class="userInfoBox">
                <div class="userInfo">
                    <p class="user-item"><i class="el-icon-service"></i> {{userInfo.name}}</p>
                    <p class="user-item"><i class="el-icon-info"></i>
                        {{userInfo.identity === 'employee' ? '员工' : '管理员'}}</p>
                </div>
            </el-col>
       </el-row>
    </div>
</template>
<script>
    export default {
        'name': 'infoShow',
        computed: {
            userInfo() {
                return this.$store.getters.user
            }
        }
    }
</script>
<style scoped lang="stylus">
.infoShow
    width 100%
    height 100%
    .row-bg
        width 100%
        height 100%
    /*background url("../assets/showcase.png") no-repeat center center*/
    /*background-size 100% 100%*/
    .row-bg-left
        display flex
        align-items center
        justify-content center
        .avatar
            border-radius 50%
    .userInfoBox
        background #ccc
        display flex
        align-items center
        justify-content space-between
        font-size 28px
        p
            padding 10px 20px
</style>
