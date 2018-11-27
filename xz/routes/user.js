//创建空路由
const express = require('express');
const pool = require('../pool.js');

var router = express.Router();
//添加路由
//1.用户注册
router.post('/register',(req,res)=>{
	//获取post请求的数据
	var obj=req.body;
	console.log(obj);
	var $uname=obj.uname;
	if(!$uname){res.send({code:401,msg:'uname required'})
		return;	
	};
	var $upwd=obj.upwd;
	if(!$upwd){res.send({code:402,msg:'upwd required'})
		return;	
	};
	var $email=obj.email;
	if(!$email){res.send({code:403,msg:'email required'})
		return;	
	};
	var $phone=obj.phone;
	if(!$phone){res.send({code:404,msg:'phone required'})
		return;	
	};
	//res.send('注册成功');
	//将数据插入到学子xz_user数据表中
	pool.query('insert into xz_user set ?',[obj],(err,result)=>{
	if(err)throw err;
	if(result.affectedRows>0){
		res.send({code:200,msg:'register suc'})
	}
	})
});

//2.用户登录路由
//url:/login method:post
//创建路由,获取请求的数据,验证数据不为空
//401 'uname required'
//402 'upwd required'
router.post('/login',(req,res)=>{
	//获取post请求的数据
	var obj=req.body;
	console.log(obj);
	var $uname=obj.uname;
	if(!$uname){res.send({code:401,msg:'uname required'})
		return;	
	};
	var $upwd=obj.upwd;
	if(!$upwd){res.send({code:402,msg:'upwd required'})
		return;	
	};
//执行sql语句,查看是否登陆成功(使用用户名和密码两个条件能查询到数据)
	
	
	pool.query('select*from xz_user where uname=?and upwd=?',[$uname,$upwd],(err,result)=>{
	if(err)throw err;
//判断查询结果(数组)长度大于0,说明有这个用户则登陆成功
	if(result.length>0){
		res.send({code:200,msg:'login suc'})
	}else{
		res.send({code:301,msg:'login err'})}
	})
});

//3.用户检索
router.get('/detail',(req,res)=>{
	var obj=req.query;
	var $uid=obj.uid
	if(!$uid){
		res.send({code:401,msg:'uid require'})
		return;	}
	pool.query('select*from xz_user where uid=?',[$uid],(err,result)=>{
	if(err)throw err;
//判断查询结果(数组)长度大于0,说明有这个用户则返回检索结果
	if(result.length>0){
		res.send(result)
	}else{
		res.send({code:301,msg:'detail err'});
			}
	})
})

//4.用户修改
router.post('/update',(req,res)=>{
	var obj=req.body;

	var $uid=obj.uid;
	if(!$uid){res.send({code:401,msg:'uid required'})
		return;	
	};
	
	var $email=obj.email;
	if(!$email){res.send({code:402,msg:'email required'})
		return;	
	};

	var $phone=obj.phone;
	if(!$phone){res.send({code:403,msg:'phone required'})
		return;	
	};
	
	var $gender=obj.gender;
	if(!$gender){res.send({code:404,msg:'gender required'})
		return;	
	};
	
	var $user_name=obj.user_name;
	if(!$user_name){res.send({code:405,msg:'user_name required'})
		return;	
	};
	pool.query('update xz_user set email=?,phone=?,gender=?,user_name=? where uid=?',[$email,$phone,$gender,$user_name,$uid],(err,result)=>{
	if(err)throw err;
//判断查询结果(数组)长度大于0,说明有这个用户则登陆成功
	if(result.affectedRows>0){
		res.send({code:200,msg:'update suc'})
	}else{
		res.send({code:301,msg:'update err'})}
	})
});

//5.用户列表
//method:get url:/list
router.get('/list',(req,res)=>{
	var obj=req.query;
//如果页码和每页数量为空  设置默认值
var $pno=parseInt(obj.pno);
var $count=parseInt(obj.count);
if($pno)$pno=1;
if(!$count)$count=10;
var start=($pno-1)*$count;
pool.query('select * from xz_user limit ?,?',[start,$count],(err,result)=>{
	if(err) throw err
	res.send(result);
})
})

//6.用户删除
router.get('/delete',(req,res)=>{
	var obj=req.query;
	var $uid=obj.uid;
	if(!$uid){res.send({code:401,msg:'uid required'})
		return;
	}
	pool.query('delete from xz_user where uid=?',[$uid],(err,result)=>{
		if(err)throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'delete suc'
			})
		}else{res.send({code:401,msg:'delete err'})}
	})
})

//导出路由器
module.exports=router;
//把用户路由器挂载到/user




































