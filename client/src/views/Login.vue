<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">在线后台管理系统</span>
                <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="邮箱：" prop="email">
                        <el-input placeholder="请输入邮箱" :clearable="true"
                                  @keyup.enter.native="submitForm('loginForm')" v-model="loginForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input placeholder="请输入密码" type="password" :clearable="true"
                                  v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码：" prop="imgKey" class="imgKey">
                        <el-input placeholder="请输入验证码"   maxLength="4"
                                  v-model="loginForm.imgKey" @keyup.enter.native="submitForm('loginForm')"></el-input>
                        <p v-html="imgKey" @click="getCode" class="imgKey-code"></p>
                    </el-form-item>
                    <el-form-item class="foot-btn">
                        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>
                    <p class="text">还没有账号？现在 <router-link to="/register" class="text-login" >注册</router-link></p>
                </el-form>

            </div>
        </section>
    </div>
</template>
<script>
    import jwt_decode from 'jwt-decode'
    export default {
        data() {
            return {
                imgKey:'',//图片验证码
                loginForm: {
                    email: '',
                    password: '',
                    imgKey: ''
                },
                rules: {
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur']}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    imgKey: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                }
            }
        },
        name: 'login',
        created(){
            this.getCode();
        },
        methods: {
            //点击登录
            submitForm(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/users/login",this.loginForm).then(res => {
                            if (res.data.code === 200) {
                                const {token} = res.data;
                                //存储ls
                                localStorage.setItem('eleToken',token);

                                //解析token
                                const decode = jwt_decode(token);
                                console.log(decode)
                                //token 存储到vuex中
                                this.$store.dispatch('setAuthenticated',!this.isEmpty(decode));
                                this.$store.dispatch('setUser',decode);

                                this.$router.push('/index');
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //校验返回数据 类型 true false
            isEmpty(value) {
                return(
                    value === undefined
                    || value === null
                    || (typeof value === "object" && Object.keys(value).length === 0)
                    || (typeof value === "string" && value.trim().length === 0)
                )
            },
            //获取code
            getCode() {
                this.$axios.get("/api/users/captcha").then(res => {
                    this.imgKey = res.data;
                })
            }
        },
        components: {}
    }
</script>
<style scoped lang="stylus">
    .login
        position relative
        width 100%
        height 100%
        background url("../assets/bg.jpg") no-repeat center center
        background-size 100% 100%

    .form_container
        width 400px
        height 210px
        position absolute
        top 40%
        left 50%
        transform: translate(-50%, -78%)
        padding 25px
        border-radius 5px
        text-align center
        .demo-ruleForm
            background #fff
            padding 50px 68px 0 0
            border-radius 8px
            margin-top 20px
            .foot-btn
                margin-left 20px
                text-align left
                .el-button
                    width 160px
        .imgKey
            position relative
            .imgKey-code
                width 130px
                position absolute
                top 0
                right 0
        .text
            margin -9px -46px 0 0
            padding-bottom 16px
            text-align right
            font-size 14px
            color #ccc
            .text-login
                color #409EFF
        .manage_tip .title
            font-family 'Microsoft YaHei'
            font-weight bold
            font-size 26px
            color #fff
        .el-select
            width 232px
</style>
