var  express = require('express');
var  config = require('./config/index');
var opn = require('opn')
var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/',function(req,res,next) {
    req.url = '/index.html';
    next();
});

app.use(router);

// 获取服务器数据
var appData = require('./data.json');

var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
// 创建路由
var apiRoutes = express.Router();
// 商家
apiRoutes.get('/seller',function(req,res){
  res.json({
    errno:0,
    data:seller,
  });
});
// 商品
apiRoutes.get('/goods',function(req,res){
  res.json({
    errno:0,
    data:goods
  });
});
// 评价
apiRoutes.get('/ratings',function(req,res){
  res.json({
    errno:0,
    data:ratings
  });
});
// 测试
apiRoutes.get('/io',function (req, res) {
  res.send('<h1>hello world</h1>');
});

app.use('/api',apiRoutes);
app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
});
