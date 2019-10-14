//@upload
const express = require('express');
const path = require('path');
const multer  = require('multer');
const fs = require('fs');
const upload = multer({ dest: path.join(__dirname, '../../upload/') });
const router = express.Router();
// express().use(upload.any());
// 注意：1、'upload_file'  对应于 form 表单中的 name 属性值。
// 2、代码 执行完 upload.single('upload_file') 的时候，文件就已经上传了，但是没有后缀名，得手动改一下

/*
*  $route POST api/upload
*  @desc 返回的请求json数据
*  @access public
* */
router.post('/', upload.single('upload_file'), function(req, res) {
  console.log(req.file)
  const temp_path = req.file.path;
  const ext = '.' + req.file.mimetype.split('/')[1];
  const target_path = req.file.path + ext;
  fs.renameSync(temp_path, target_path);
  // 设置响应类型及编码
  /*res.set({
    'content-type': 'application/json; charset=utf-8'
  });*/

  res.json({
    code: 200,
    msg: '上传成功'
  });
});


module.exports = router;



















