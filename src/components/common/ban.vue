<template>
    <div class="banner">
    <div class="bannerbox">
        <a href="javascript:;" class='bannerimg' v-for="(item,i) in banners" :key="i">
            <img :src="item" alt="加载失败">
        </a>
    </div>
    <div class="btn_left">
        <a href="#"></a>
    </div>
    <div class="btn_right">
        <a href="#"></a>
    </div>
    <div class="ul1">
        <ul class="circle">
            <li v-for="(item,i) in '1234'" :key="i">
                <div class='dian'></div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
    data(){
        return{
            banners:[]
        }
    },
    beforeCreate(){
        var url="http://127.0.0.1:3000/banner";
        this.axios.get(url).then(result=>{
            this.banners = result.data;                     
        })
    },
}
$(function() {
    var i = 0; //记录点击次数
    const bWidth = $(".bannerimg").outerWidth()
    //获取banner宽度 确定动画活动距离    
    $(".bannerbox").css("width",bWidth*5)
    console.log($(".bannerbox").width());
    
    $(".bannerbox").append($(".bannerimg").eq(0).clone())
    //克隆一个banner1添加到尾部
    $('.circle li:first-child').addClass('active').siblings().removeClass('active');
    //为第一个li添加激活状态的类  然后遍历兄弟姐妹元素li后的li(siblings) 并且删除激活类
    $('.btn_left').click(function() {
        i--;
        move();
        //为左边按钮添加点击事件 并调用滚动函数move()
    });
    $('.btn_right').click(function() {
        i++;
        move();
    });
    $('.circle li').click(function() {
        var index = $(this).index();
        i = index;
        $(this).addClass('active').siblings().removeClass('active');
        //点击li时将li索引赋值给i 为被点击的li添加激活  删除其余li的激活类名
        $('.bannerbox').stop().animate({ left: -bWidth * i }, 500);
        //停止当前动画 然后向左移动i个图像宽度 500毫秒执行完成
    });

    function move() {
        if (i === 5) {
            $('.bannerbox').css('left', 0);
            i = 1;
            //i等于4 瞬间归零
        }
        if (i == -1) {
            $('.bannerbox').css('left', -4 * bWidth);
            i = 3;
            //页面刚加载完i为0时右移导致i为-1 右移1200像素 然后i赋值为2
        }
        if (i == 4) {
            $('.circle li').eq(0).addClass('active').siblings().removeClass('active');
            //i为3 给第1个li添加激活 删除兄弟元素的激活
        }        
        $('.circle li').eq(i).addClass('active').siblings().removeClass('active');
        $('.bannerbox').stop().animate({ left: -bWidth * i }, 500);
    }
    var interval = setInterval(()=>{
        i++;
        move();
    }, 3000);
    var interval2 = ""
    //设置间歇调用 每两秒增加一次i  然后调用滚动函数
    $('.banner').hover(function() {
        clearInterval(interval);        
        clearInterval(interval2);//用两个不同名定时器避免BUG
    }, function() {      
        interval2 = setInterval(()=>{
            i++;
            move();
        }, 3000);
    });
})
</script>

<style lang="scss" scoped="" type="text/css">
$BannerWidth:1300px;
.banner{width:$BannerWidth;height:520px;position:relative;overflow:hidden;margin:70px auto 0;border-radius:10px;}
.bannerbox{width:99999px;height:520px;float:left;position:relative;left:-0px}
.bannerimg{float:left;width:$BannerWidth;height:520px}
.banner>.bannerbox>.bannerimg>img{
    width:100%;
    height:100%;
}
.btn_left,.btn_right{
    position: absolute;
    top: 50%;
    z-index: 2;
    width: 35px;
    height: 70px;
    margin-top: -35px;
    border-radius: 3px;
    background:#666;
    opacity:0.5;
    background-repeat: no-repeat;
    background-position:center;
}
.btn_left:hover,.btn_right:hover{
    opacity:0.8;
}
.btn_left{
    left:5px;
    background-image:url("http://127.0.0.1:3000/test2/img/arrow-left.png");
    background-position:center;
    transition:1s;
}
.btn_right{
    right:5px;
    background-image:url("http://127.0.0.1:3000/test2/img/arrow-right.png");
    background-position:center;
    transition:1s;
}
.ul1{
    width:130px;
    height:20px;
    position:absolute;
    bottom:25px;
    list-style: none;
    left:50%;
    z-index:2;
    margin: 0;
    padding: 0;
    margin-left:-65px
}
.circle{list-style:none}
.ul1 li{float:left}
.dian{width:12px;height:12px;border-radius:50%;background:#fff;margin:3px;opacity: 0.8;}
.active{border-radius:50%;background:#0099ff;transition:.5s;opacity:1;}
</style>
