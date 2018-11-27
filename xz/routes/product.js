const express = require('express');
//引入连接池
const pool = require('../pool.js');
//创建路由器
var router = express.Router();

//1.商品列表
router.get('/list',(req,res)=>{
	var obj=req.query;
//将页码和数量转为整型
var $pno=parseInt(obj.pno);
var $count=parseInt(obj.count);
//判断是否为空  如果页码和每页数量为空  设置默认值
if(!$pno)$pno=1;
if(!$count)$count=10;
//计算开始页码
var start=($pno-1)*$count;
//执行SQL语句,响应查询到的数据
pool.query('select * from xz_laptop limit ?,?',[start,$count],(err,result)=>{
	if(err) throw err;
	res.send(result);
	})
})

//2.商品详情
router.get('/detail',(req,res)=>{
	var obj=req.query;
	var $lid=obj.lid;
	if(!$lid){res.send({code:401,msg:'lid required'})
		return;
	}
	pool.query('select* from xz_laptop where lid=?',[$lid],(err,result)=>{
		if(err)throw err;
		if(result.length>0){res.send(result)}
		else{res.send({code:301,msg:'detail err'})};
	})
})

//3.商品删除
router.get('/delete',(req,res)=>{
	var obj=req.query;
	var $lid=obj.lid;
	if(!$lid){res.send({code:401,msg:'lid required'})
		return;
	}
	pool.query('delete from xz_laptop where lid=?',[$lid],(err,result)=>{
		if(err)throw err;
		if(result.affectedRows>0){res.send({code:200,msg:'delete sic'})}
		else{res.send({code:301,msg:'detail err'})};
	})
})

//4.商品添加
router.post('/add',(req,res)=>{
	var obj=req.body;
	console.log(obj);
	var $code=400;
	for(var key in obj){
		$code++
		if (!obj[key]){
			res.send({code:$code,msg:key+'  requried'});
			return;
		}
	}
	pool.query('insert into xz_laptop set ?',[obj],(err,result)=>{
	if(err)throw err;
//判断查询结果affectedRows大于0,说明有这个用户则登陆成功
	if(result.affectedRows>0){
		res.send({code:200,msg:'add suc'})
	}else{
		res.send({code:301,msg:'add err'})}
	})
});

//5.商品修改
router.post('/update',(req,res)=>{
	var obj=req.body;
	console.log(obj);
	var $lid=obj.lid
	var $code=400;
	for(var key in obj){
		$code++
		if (!obj[key]){
			res.send({code:$code,msg:key+'  requried'});
			return;
		}
	}
	pool.query('update	xz_laptop set ? where lid=?',[obj,$lid],(err,result)=>{
	if(err)throw err;
//判断查询结果affectedRows大于0,说明有这个用户则登陆成功
	if(result.affectedRows>0){
		res.send({code:200,msg:'update suc'})
	}else{
		res.send({code:301,msg:'update err'})}
	})
});



//导出路由器
module.exports=router;