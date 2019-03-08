$(function() {
    var i = 0; //记录点击次数
    var bWidth = 1530;
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
            //i为3 给第1个li添加激活 删除item2,item3的激活
        }
        $('.circle li').eq(i).addClass('active').siblings().removeClass('active');
        $('.bannerbox').stop().animate({ left: -bWidth * i }, 500);
    }
    var interval = setInterval(()=>{
        i++;
        move();
    }, 5000);
    var interval2 = ""
    //设置间歇调用 每两秒增加一次i  然后调用滚动函数
    $('.banner').hover(function() {
        clearInterval(interval);        
        clearInterval(interval2);//用两个不同名定时器避免BUG
    }, function() {      
        interval2 = setInterval(()=>{
            i++;
            move();
        }, 5000);
    });
})