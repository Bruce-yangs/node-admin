<template>
    <header class="head-nav">
        <el-row :gutter="20">
            <el-col :span="6" class="logo-container">
                <img src="../assets/logo.png" alt="" class="logo">
                <span class="title">后台管理系统</span>
            </el-col>
            <el-col :span="17">
                <div class="userInfo">
                    <div class="welcome">
                        <p class="name">
                            <img :src="userInfo.avatar" class="avatar" alt="">
                            欢迎
                            <el-dropdown @command="handleCommand">
                              <span class="el-dropdown-link avatarname">
                                {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                              </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="1">个人信息</el-dropdown-item>
                                    <el-dropdown-item divided command="2">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </p>
                    </div>
                </div>
            </el-col>
        </el-row>

    </header>
</template>

<script>
    export default {
        name: 'head-nav',
        created() {
        },
        computed: {
            userInfo() {
                return this.$store.getters.user
            }
        },
        methods: {
            handleCommand(command) {
                console.log(typeof command)
                console.log(command)
                switch (command) {
                    case '1':
                        this.showUserInfo();
                        break;
                    case '2':
                    this.logout();
                        break;
                }
            },
            showUserInfo() {
                this.$router.push('/infoShow');
                console.log('2222222222')
            },
            logout() {
                //清除 localStorage
                localStorage.removeItem('eleToken');
                //清除vuex 数据
                this.$store.dispatch('clearData');
                this.$router.push('/login');

            }
        }
    }
</script>

<style scoped lang="stylus">
    .head-nav
        width 100%
        height 60px
        min-width 600px
        padding 5px
        background #324057
        color #fff
        border-bottom 1px solid #1f2d3d
        .logo
            width 40px
            margin 10px
        .title
            position relative
            top -22px
            left 10px
        .welcome
            margin-top 5px
            text-align right
            .avatar
                position relative
                top 8px
                width 30px
                border-radius 50%
            .avatarname
                color cornflowerblue !important
                cursor pointer

</style>
