//@login & register
const express = require('express');
const DB = require('../../config/key');//config
const passport = require('passport');//passport
const router = express.Router();

const Profile = require('../../models/Profile');

/*
*  $route GET api/profiles/test
*  @desc 返回的请求json数据
*  @access public
* */
/*router.get('/test', (req, res) => {
    const data = req.body;
    res.json({
        msg: 123123
    });
})*/

/*
*  $route GET api/profiles/add
*  @desc 创建信息
*  @access Private
* */
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    const data = req.body;
    const profileFields = {};
    if (data.type) profileFields.type = data.type;
    if (data.describe) profileFields.describe = data.describe;
    if (data.income) profileFields.income = data.income;
    if (data.expend) profileFields.expend = data.expend;
    if (data.cash) profileFields.cash = data.cash;
    if (data.remark) profileFields.remark = data.remark;
    new Profile(profileFields).save().then(profile => {
        res.json({
            code: 200,
            msg: '保存成功'
        });
    }).catch(res => {
        res.json({
            msg: '请求出错'
        });
    })
})

/*
*  $route GET api/profiles
*  @desc 获取所有信息
*  @access Private
* */
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    let data = req.query;
    let cPage = data.currentPage * 1;
    let pSize = data.pageSize * 1;
    console.log(data.startDate)
    console.log(data.endDate)
    let obj={};
    if(data.startDate && data.endDate) {
        obj = {"date":{ $gte: data.startDate, $lte: data.endDate}};
    }
    //给前端分页数据
    Profile.find(obj, {__v: false}).skip((cPage - 1) * pSize).limit(pSize).exec( (err, rs) => {
        if (err) {
            res.send(err);
        } else {
            Profile.find(obj,(err, result) => {
             let jsonArray = {
                    code: 200,
                    data: rs,
                    total: result.length
                };
                res.json(jsonArray);
            });
        }
    });

});

/*
*  $route GET api/profiles/:id
*  @desc 获取单条信息
*  @access Private
* */
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({_id: req.params.id})
        .then(profile => {
            if (!profile) return res.status(404).json({code: 200, msg: '没有任何数据'});
            let data = {
                code: 200,
                data: profile
            };
            res.json(data);
        })
        .catch(err => res.status(404).json(err))
});

/*
*  $route GET api/profiles/edit
*  @desc 编辑单条信息
*  @access Private
* */
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const data = req.body;
    const profileFields = {};
    if (data.type) profileFields.type = data.type;
    if (data.describe) profileFields.describe = data.describe;
    if (data.income) profileFields.income = data.income;
    if (data.expend) profileFields.expend = data.expend;
    if (data.cash) profileFields.cash = data.cash;
    if (data.remark) profileFields.remark = data.remark;

    Profile.findOneAndUpdate({_id: req.params.id}, {$set: profileFields}, {new: true})
        .then(profile => {
            if (!profile) return res.status(404).json({code: 200, msg: '没有任何数据'});
            let data = {
                code: 200,
                data: null,
                msg: '请求成功'
            };
            res.json(data);
        })
        .catch(err => res.status(404).json(err))
});

/*
*  $route GET api/profiles/delete/:id
*  @desc 删除单条信息
*  @access Private
* */
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOneAndRemove({_id: req.params.id})
        .then((profile) => {
            profile.save()
                .then(data => {
                    console.log(data)
                    res.json({
                        code: 200,
                        data: null,
                        msg: '删除成功'
                    })
                });
        })
        .catch(err => res.status(404).json({msg: '删除失败'}))
});
module.exports = router;



















