var express = require('express');
var router = express.Router();
var util = require('../config/index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/add', function (req, res, next) {
  console.log(req.body);
  const mobile = req.body.mobile; //需要发送的号码
  var param = req.body.param; //变量内容

  if (mobile == '') {

    resp.send({
      message: '手机号不能为空',
      code: ''
    });

    return
  }

  if (param == '') {
    param = '';
  }

  util.getResult(param, mobile).then(function (response) {
    console.log('response.data');
    console.log(response.data);
    console.log('response.data.code');
    console.log(response.data.code);
    if (response.data.code == '000000') {
      console.log('发送成功')
      res.send({
        message: '发送成功',
        code: response.data
      });
    } else {
      console.log('请求失败')
      res.send({
        message: '请求失败',
        code: response.data
      });
    }

  }, function (err) {
    console.log('err');
    console.log(err);
    res.send({
      message: '请求失败',
      err: err
    });
    // res.status(500).send('database error').end();
  })

});

module.exports = router;
