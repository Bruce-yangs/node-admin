<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">在线后台管理系统</span>
                <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="用户名：" prop="name">
                        <el-input placeholder="请输入用户名" :clearable="true" v-model.trim="registerForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：" prop="email">
                        <el-input placeholder="请输入邮箱" :clearable="true" v-model.trim="registerForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input placeholder="请输入密码" type="password" :clearable="true"
                                  v-model.trim="registerForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="password2">
                        <el-input type="password" placeholder="请再次输入密码" :clearable="true"
                                  v-model.trim="registerForm.password2"></el-input>
                    </el-form-item>
                    <el-form-item label="类型：" prop="identity">
                        <el-select v-model="registerForm.identity" placeholder="请选择类型">
                            <el-option
                                    v-for="item in arrList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="foot-btn">
                        <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
                        <el-button @click="resetForm('registerForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>
<script>
    export default {
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.registerForm.password2 !== '') {
                        this.$refs.registerForm.validateField('password2');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                arrList: [
                    {
                        value: 'employee',
                        label: '员工'
                    },
                    {
                        value: 'manager',
                        label: '管理员'
                    }
                ],
                registerForm: {
                    name: '',
                    email: '',
                    identity: '',
                    password: '',
                    password2: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    password: [
                        // {required: true, message: '请输入密码', trigger: 'blur'},
                        {validator: validatePass, required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    password2: [
                        // {required: true, message: '请再次输入密码', trigger: 'blur'},
                        {validator: validatePass2, required: true, message: '请再次输入密码', trigger: 'blur'}
                    ],
                    identity: [
                        {required: true, message: '请选择类型', trigger: 'change'}
                    ]
                }
            }
        },
        name: 'register',
        methods: {
            submitForm(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/users/register",this.registerForm).then(res => {
                            if (res.data.code === 200) {
                                this.$alert('注册成功', '提示', {
                                    confirmButtonText: '返回',
                                    callback: action => {
                                        this.$router.push('/login');
                                    }
                                });
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
            resetForm(form) {
                this.$refs[form].resetFields();
            }
        },
        components: {}
    }
</script>
<style scoped lang="stylus">
    .register
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
            padding 20px 68px 0 0
            border-radius 8px
            margin-top 20px
            .foot-btn
                margin-left 20px
                padding-bottom 20px
                text-align left
        .manage_tip .title
            font-family 'Microsoft YaHei'
            font-weight bold
            font-size 26px
            color #fff
        .el-select
            width 232px
</style>
