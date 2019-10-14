const mongoose = require('mongoose');
//实例化 Schema
const Schema = mongoose.Schema;

//创建模型 Schema   UserSchema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    identity: {
        type: String
    },
    date: {
        type: Number,
        default: new Date().getTime()
    }
});

module.exports = User = mongoose.model('user',UserSchema);

















