const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const DB = require('./config/key');
const path = require('path');
const app = express();

//使用 body-parser中间件 接受post请求
app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser({uploadDir:'./upload'}));
app.use(bodyParser.json());
// 允许跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//引入routes   userjs
const users = require('./routes/api/user');
const profiles = require('./routes/api/profiles');
const upload = require('./routes/api/upload');

//连接mongo   此处imooc 是集合，如果没有mongo会自行创建
const DB_URL = DB.mongoURI;
//建立一个连接数据库
mongoose.connect(DB_URL, { useNewUrlParser: true });

//此处可以忽略，不是必须的，只是提示已经连接成功
mongoose.connection.on('connected', function () {
    console.log('mongo connect success')
});

//初始化passport
app.use(passport.initialize());
require('./config/passport')(passport);



const port = process.env.PORT || 3000;

app.use('/api/users',users);
app.use('/api/profiles',profiles);
app.use('/api/upload',upload);
app.use(express.static(path.join(__dirname, 'upload')));
/*app.get('/',(req,res) => {
    res.send('Hello World;');
})*/

app.listen(port,() => {
    console.log(`Sever running on port ${port}`);
})