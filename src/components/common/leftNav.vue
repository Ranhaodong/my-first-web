<template>
<div class="app">
    <div class="left-nav">
        <a class="nav-top" v-for="(item,i) in items" :key="i+3">{{item.text}}</a>
        <div class="nav-con-box" v-for="(title,i) in navList" :key="i">
            <a href="javascript:;" class="nav-title">{{title}}</a>
            <a href="javascript:;" class="nav-more">更多+</a>
            <ul class="game-list">
                <a href="javascript:;" class="game-item" v-for="(item,i) in game" :key="i">{{item}}</a>
            </ul>
        </div>
        <img class="nav-put" src="https://pic.52112.com/icon/256/20181002/22433/1076651.png">
    </div>
    <div class="left-nav-s">
        <ul class="game-list2">
            <li class="game-item2" v-for=" (item,i) in items2" :key="i">
               <a href="javascript:;">{{item.text}}</a> 
            </li>
        </ul>
        <div class="nav-s-zk" >
            <img src="https://pic.52112.com/icon/256/20181002/22433/1076651.png" alt="">
        </div>
        <div class="nav-s-kf">
            <a href="javascript:;">客服</a>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
    name:"leftNav",
    data(){
        return{
            navShow:false,
            items:[],  
            items2:[],  
            navList:[],  
            game:[],
        }
    },
    beforeCreate(){
        var url="http://127.0.0.1:3000/gameList";
        this.axios.get(url).then(result=>{
            this.items = result.data.items;    
            this.items2 = result.data.items2;    
            this.navList = result.data.navList;    
            this.game = result.data.game;         
        })
    },
    methods:{},
    created(){}
}
$(function(){
    console.log($(".nav-s-zk"));
    
    $(".nav-s-zk").click(function(){
        $(".left-nav-s").css("left",-50)
        $(".left-nav").css("left",0)
    })    
    $(".nav-put").click(e=>{
        $(".left-nav-s").css("left",0)
        $(".left-nav").css("left",-240)
    })
})
</script>   

<style>
    .left-nav *{
        margin: 0;padding: 0;box-sizing: border-box;transition: .5s;
        border-radius: 5px;
    }
    * a{
        color:#ddd;
        text-decoration:none;
        display: block;
    }
    * a:hover{
        background: #fff;
        color:#666;
    }
    .left-nav-s{
        background: #000;
        height: 786px;
        width: 40px;
        position: absolute;
        left: 0px;
        top: 50px;
        border-radius: 10px;
        transition: .5s;
    }
    .left-nav{
        background: #000;
        position: absolute;
        left: -240px;
        top: 50px;
        width: 200px;
        height: 786px;
        border-radius: 10px;
        color:#ddd;
        transition: .5s;
        z-index: 999;
    }
    div::before{
        content: "";
        display: table;
    }
    .nav-top{
        background:#777;
        padding: 0;
        margin: 3px;
        height: 40px;
        color:#ddd;
        line-height: 40px;
        border-radius: 5px;
    }
    .nav-con-box{
        background:#777;
        padding: 0;
        margin: 3px;
        height: 200px;
        color:#ddd;
        line-height: 40px;
        transition: .5s;
    }
    .nav-title{
        float: left;
        width: 80px;
        margin-left: 5px;
    }
    .nav-more{
        height: 24px;
        width: 36px;
        font-size: 10px;   
        float: right;
        margin-right: 12px;    
        margin-top: 10px; 
        text-align: center;
        line-height: 24px
    }
    .game-list{
        float: left;
        width: 190px;
        height: 155px;   
        list-style: none;
        /* background: #f00;  */
    }
    .game-list2{
        float: left;
        width: 40px;
        height: 155px;   
        list-style: none;
        padding-left: 0;
        /* background: #f00;  */
    }
    .game-item{
        float: left;
        width: 63px;
        height: 30px;
        font-size: 10px;
        line-height: 30px;
    }
    .game-item2{
        float: left;
        width: 40px;
        height: 30px;
        font-size: 10px;
        line-height: 30px;
    }
    .nav-put{
        background: #000;
        width: 40px;
        height: 40px;
        position: absolute;
        top: 48%;
        margin-top: -20px;
        right: -20px;
        line-height: 80px;
        font-size: 20px;
        border-radius: 50%;
    }
    .nav-put:hover{
        background: #666;
    }
    .nav-s-kf{
        width: 40px;
        height: 40px;
        position: absolute;
        bottom: 50px;
        left: 0;
    }
    .nav-s-zk{
        width: 40px;
        height: 40px;
        position: absolute;
        bottom: 50%;
        left: 0;
        border-radius: 50%;
        transform: rotate(180deg)
    }
    .nav-s-zk img{
        width: 100%;
        height: 100%;
    }

</style>
