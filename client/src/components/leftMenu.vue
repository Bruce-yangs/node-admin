<template>
    <el-row class="leftMenu">
        <el-col>
            <el-menu
                    class="el-menu-vertical-demo"
                    background-color="#324057"
                    :default-active="$route.path"
                    text-color="#fff"
                    :unique-opened="true"
                    active-text-color="#409eff">
                <router-link to="/home">
                    <el-menu-item index="0">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-tickets"></i>
                        <span>资金管理</span>
                    </template>
                    <router-link to="/dataList">
                        <el-menu-item index="1-4-1">资金明细</el-menu-item>
                    </router-link>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-service"></i>
                        <span>信息管理</span>
                    </template>
                    <router-link to="/infoShow">
                        <el-menu-item index="2-4-1">个人信息</el-menu-item>
                    </router-link>
                    <router-link to="/infoMsg">
                        <el-menu-item index="2-4-2">配置管理</el-menu-item>
                    </router-link>
                </el-submenu>
                <!--<el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                </el-submenu>-->

            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
  export default {
    'name': 'leftMenu',
    computed: {
      userInfo() {
        return this.$store.getters.user
      }
    },
    methods: {

    }
  }
</script>
<style scoped lang="stylus">
    .leftMenu
        width 201px
        overflow-y auto
        background #324057
        .el-menu
            border-right none
        .el-submenu
            .el-menu--inline
                padding-left: 8px;

</style>
<style>
    /*.leftMenu .el-submenu .el-menu--inline {
    }*/
    .el-submenu .el-menu a > li.el-menu-item {
        padding-left: 60px !important;
    }
</style>