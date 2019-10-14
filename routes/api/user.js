//@login & register
const express = require('express');
const bcrypt = require('bcrypt');//加密
const gravatar = require('gravatar');//头像
const jwt = require('jsonwebtoken');//token
const DB = require('../../config/key');//config
const passport = require('passport');//passport
const svgCaptcha = require('svg-captcha');//验证码
const router = express.Router();

const User = require('../../models/User');

/*
*  $route POST api/users/register
*  @desc 返回的请求json数据
*  @access public
* */
let code = null;
router.get('/captcha',  (req, res) => {
    let captcha = svgCaptcha.create({
        size: 4,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 37,
        width: 130,
        color: true
    });
    /*console.log(captcha)
    console.log(captcha.text)*/
    code = captcha.text;//toLowerCase() 都转成小写
    // res.type('svg');
    res.setHeader('Content-Type', 'image/svg+xml');
    res.write(String(captcha.data));
    res.end();


});


/*
*  $route POST api/users/register
*  @desc 返回的请求json数据
*  @access public
* */
router.get('/test', (req, res) => {
    const data = req.body;
    res.json({
        msg: 123123
    });
})

router.post('/register', (req, res) => {
    let data = req.body;
    //查询数据库中是否拥有邮箱 email:data.email
    User.findOne({email: data.email})
        .then(user => {
            if (user) {//如果查到了 就提示被占用
                return res.json({msg: '邮箱或名称已被占用!'})
            } else {
                const avatar = gravatar.url(data.email, {s: '200', r: 'pg', d: 'mm'});
                const newUser = new User({
                    name: data.name,
                    email: data.email,
                    identity: data.identity,
                    password: data.password,
                    avatar
                });

                // 10->是指加密模式
                bcrypt.genSalt(10, function (err, salt) {
                    // 给谁加密newUser.password  hash-> 指加密过后的密码
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.json({
                                    code:200,
                                    msg:'注册成功'
                                })
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        })
});

/*
*  $route POST api/users/login
*  @desc 返回的 token jwt passport
*  @access public
* */

router.post('/login', (req, res) => {
    console.log(code)
    let data = req.body;
    const email = data.email;
    const password = data.password;
    const imgKey = data.imgKey;
    console.log(code)
    console.log(imgKey)
    if (code.toLowerCase() === imgKey.toLowerCase()) {
        //查询数据库
        User.findOne({email})
            .then(user => {
                //如果没有查到
                if (!user) {
                    return res.json({msg: '用户不存在'});
                } else {
                    //匹配密码
                    bcrypt.compare(password, user.password)
                        .then(isMatch => {
                            if (isMatch) {
                                const rule = {
                                    id: user.id,
                                    name: user.name,
                                    avatar: user.avatar,
                                    identity: user.identity
                                };

                                jwt.sign(rule, DB.secretOrKey, {expiresIn: 3600}, (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        code: 200,
                                        token: "Bearer " + token
                                    })
                                });
                            } else {
                                return res.json({msg: '密码错误'})
                            }
                        });
                }
            })
    } else {
        return res.json({msg: '验证码错误!'})
    }

});

/*
*  $route GET api/users/current
*  @desc 返回的 当前用户信息
*  @access Private
* */
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) => {
    const data = req.user;
    res.json({
        id: data.id,
        name: data.name,
        email: data.email,
        identity: data.identity
    });
})

module.exports = router;



















