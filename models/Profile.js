const mongoose = require('mongoose');
//实例化 Schema
const Schema = mongoose.Schema;

//创建模型 Schema   UserSchema
const ProfileSchema = new Schema({
    type: {
        type: String
    },
    describe: {//描述
        type: String
    },
    income: {//收入
        type: String,
        required: true
    },
    expend: {//支出
        type: String,
        required: true
    },
    cash: {//现金
        type: String,
        required: true
    },
    remark: {
        type: String
    },
    date: {
        type: Number,
        default: new Date().getTime()
    }
});

module.exports = Profile = mongoose.model('profile',ProfileSchema);

















