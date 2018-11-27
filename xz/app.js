const express = require('express');
const userRouter = require('./routes/user.js');
const productRouter = require('./routes/product.js');
const bodyParser = require('body-parser');

//创建服务器
var server = express();
server.listen(3000);
//托管静态资源
server.use(express.static('public'));
//挂载路由
//使用body-parser中间件将post请求数据解析
//ps:一定要写在路由前
server.use(bodyParser.urlencoded({
	extended:false
}));
//挂载商品路由到/product
server.use('/product',productRouter);

//挂载用户路由到 /user
server.use('/user',userRouter);












































