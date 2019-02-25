<template>
  <div class="top">
    <!-- 顶部
    
     -->
    <div class="header">
      <img :src="topimg" alt="">
      <span  @click="downClick">下载APP</span>
    </div>

    <!-- 导航栏 -->
    <mt-navbar v-model="selected">
      <mt-tab-item id="1" class="recommend">
        推荐
      </mt-tab-item>
      <mt-tab-item id="2">
        排行榜
      </mt-tab-item>
      <mt-tab-item id="3">
        搜索
      </mt-tab-item>
    </mt-navbar>

    <!-- 导航栏对应的内容 -->
    <mt-tab-container v-model="selected">

      <!-- 推荐页面开始 -->
      <mt-tab-container-item id="1" class="recommend_con">
        <!-- 首页轮播开始 -->
        <mt-swipe :auto="4000" >
          <mt-swipe-item v-for="item in imgBanners">
            <img :src="item.img" alt="">
          </mt-swipe-item>
        </mt-swipe>
        <!-- 首页轮播结束 -->
        <h2>电台</h2>
        <!-- 热歌 -->
        <div class="hot_music">
          <div class="hot_list" v-for="list in lists">
            <img :src="list.img" alt="">
            <span>{{list.name}}</span>
          </div>
        </div>
        <!-- 底部广告 -->
        <div class="recommend_footer">
          <a href="#"  @click="lookClick">查看电脑版网页</a>
          <img src="../images/logo2.png" alt="">
          <p>Copyright © 1998 - 2019  Tencent. All Rights Reserved.</p>
          <p>联系电话：0755-86013388 QQ群：55209235</p>
        </div>
      </mt-tab-container-item>
      <!-- 推荐页面结束 -->

      <!-- 排行榜页面开始 -->
      <mt-tab-container-item id="2" class="ranking_list">
            <!-- 上拉加载 -->
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange">
          <div class="ranking_con" v-for="i in ranks" >
            <img :src="i.img" alt="">
            <div class="ranking_right">
              <h3>{{i.title}}</h3>
              <p v-for="e in i.lists">{{e.num}}<span>{{e.sing}}</span>{{e.name}}</p>
            </div>
          </div>
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">Loading...</span>
          </div>
        </mt-loadmore>
      </mt-tab-container-item>
      <!-- 排行榜页面结束 -->

      <!-- 搜索页面开始 -->
      <mt-tab-container-item id="3" class="search">
        <!-- 没有取消 -->
        <div class="disappear"  v-if="show">
          <div class="disappear_con">
            <img src="../images/search.png" alt="">
            <span @click="searchClick">搜索歌曲、歌单、专辑</span>
          </div>
        </div>
        <!-- 有取消 -->
        <div class="appear" v-else>
          <div class="appear_con">
            <img src="../images/search.png" alt="">
            <input type="text" placeholder="搜索歌曲、歌单、专辑" v-model="singName"  @blur="searchInput" >
            <img src="../images/delate.png" alt="" class="delate" v-if="seen"  @click="delateClick">
          </div>
          <span @click="cancelClick">取消</span>
        </div>
        <!-- 搜索框内容 -->
        <div class="search_con" v-if="show">
          <h4>热门搜索</h4>
          <span v-for="name in names">{{name.sing}}</span>
          <p v-for="search in HistoryList">{{search.val}}</p>
        </div>
      </mt-tab-container-item>
      <!-- 搜索页面结束 -->
    </mt-tab-container>

  </div>
</template>

<script>
var searchList=[];

// 搜索历史封装函数
function History(val){
  if(val.length !== 0){ //清除空格
    if(searchList.length>0){
        if(searchList.indexOf(val)!==-1){ //有相同的 删除再添加
            searchList.splice(searchList.indexOf(val),1);
            searchList.unshift(val)
        }else{
            searchList.unshift(val)
        }
      }else{
        searchList.unshift(val)
      }
  }
  
  localStorage.setItem('HistoryList', JSON.stringify(searchList))
  console.log(searchList)
}

export default {
  name: 'HelloWorld',
  data(){
    return{
      topStatus: '',
      topimg:require("../images/logo.png"),
      selected:'1',
      imgBanners:[
        {img:require("../images/lb1.jpg")},
        {img:require("../images/lb2.jpg")},
        {img:require("../images/lb3.jpg")},
        {img:require("../images/lb4.jpg")},
      ],
      lists:[
        {img:require("../images/music1.jpg"),name:"热歌"},
        {img:require("../images/music2.jpg"),name:"一人一首招牌歌"}
      ],
      ranks:[
        {img:require("../images/m1.jpg"),title:"巅峰榜·流行指数",lists:[{num:"1",sing:"没有意外",name:"蔡徐坤"},{num:"2",sing:"可不可以",name:"- 张紫豪"},{num:"3",sing:"岩石里的花",name:"- G.E.M. 邓紫棋/艾热"}]},
        {img:require("../images/m1.jpg"),title:"巅峰榜·流行指数",lists:[{num:"1",sing:"潇洒每一天",name:"- 小青龙"},{num:"2",sing:"可不可以",name:"- 张紫豪"},{num:"3",sing:"光年之外 (热爱版)",name:"- G.E.M. 邓紫棋/艾热"}]},
        {img:require("../images/m1.jpg"),title:"巅峰榜·流行指数",lists:[{num:"1",sing:"Who Do You Love (Explicit)",name:"- The Chainsmokers/5 Seconds Of Summer"},{num:"2",sing:"可不可以",name:"- 张紫豪"},{num:"3",sing:"潇洒每一天",name:"- 小青龙"}]},
        {img:require("../images/m1.jpg"),title:"巅峰榜·流行指数",lists:[{num:"1",sing:"没有意外",name:"蔡徐坤"},{num:"2",sing:"可不可以",name:"- 张紫豪"},{num:"3",sing:"岩石里的花",name:"- G.E.M. 邓紫棋/艾热"}]},
        {img:require("../images/m1.jpg"),title:"巅峰榜·流行指数",lists:[{num:"1",sing:"潇洒每一天",name:"- 小青龙"},{num:"2",sing:"可不可以",name:"- 张紫豪"},{num:"3",sing:"光年之外 (热爱版)",name:"- G.E.M. 邓紫棋/艾热"}]},
        {img:require("../images/m1.jpg"),title:"巅峰榜·流行指数",lists:[{num:"1",sing:"Who Do You Love (Explicit)",name:"- The Chainsmokers/5 Seconds Of Summer"},{num:"2",sing:"可不可以",name:"- 张紫豪"},{num:"3",sing:"潇洒每一天",name:"- 小青龙"}]},
        {img:require("../images/m1.jpg"),title:"巅峰榜·流行指数",lists:[{num:"1",sing:"没有意外",name:"蔡徐坤"},{num:"2",sing:"可不可以",name:"- 张紫豪"},{num:"3",sing:"岩石里的花",name:"- G.E.M. 邓紫棋/艾热"}]},
        {img:require("../images/m1.jpg"),title:"巅峰榜·流行指数",lists:[{num:"1",sing:"潇洒每一天",name:"- 小青龙"},{num:"2",sing:"可不可以",name:"- 张紫豪"},{num:"3",sing:"光年之外 (热爱版)",name:"- G.E.M. 邓紫棋/艾热"}]},
        {img:require("../images/m1.jpg"),title:"巅峰榜·流行指数",lists:[{num:"1",sing:"Who Do You Love (Explicit)",name:"- The Chainsmokers/5 Seconds Of Summer"},{num:"2",sing:"可不可以",name:"- 张紫豪"},{num:"3",sing:"潇洒每一天",name:"- 小青龙"}]},
      ],
      value:"",
      show:true,
      names:[
        {"sing":"元宵晚会 "},
        {"sing":"还是他们本就心怀鬼胎 "},
        {"sing":"NEVER ENOUGH  "},
        {"sing":"你要的全拿走  "},
        {"sing":"儿时  "},
        {"sing":"逆流而上的你 "},
        {"sing":"我和我的祖国  "},
        {"sing":"还是他们本就心怀鬼胎 "},
        {"sing":"可不可以 "}
      ],
      singName:"",
      seen:false,
      HistoryList:'',
    }
  },
  methods: {
    // 搜索点击
    searchClick(){
      this.show=false;
    },
    // 取消点击
    cancelClick(){
      this.show=true;
    },
    
    // 输入框是否有内容
    searchInput(){
      console.log(this.singName)
      var val=this.singName;
      if(val!=""){
        this.seen=true
      }
      // 将搜索内容保存至本地
      History(val)
    },
    // 点击删除内容
    delateClick(){
      this.singName="",
      this.seen=false
    },
    // 首页查看版本
    lookClick(){
        let instance = Toast('请您移至官网');
        setTimeout(() => {
          instance.close();
        }, 4000)
    },
    // 下载APP点击
    downClick(){
        let instance = Toast('请您移至官网进行下载');
        setTimeout(() => {
          instance.close();
        }, 4000)
    },
    handleTopChange(status) {
          this.topStatus = status;
      },
    loadTop() {
        this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header{
  width: 100%;
  height: 44px;
  background-color: #31c27c;
  position: relative;
  img{
    float: left;
    display: block;
    width: 90px;
    height: 25px;
    margin: 9px 0 0 10px;
  }
  span{
    position: absolute;
    display: inline-block;
    right: 10px;
    top: 8px;
    height: 28px;
    padding: 0 12px;
    line-height: 28px;
    border-radius: 99px;
    font-size: 14px;
    background: #149c5a;
    color: #fff;
  }
}
mt-tab-item .mint-tab-item-label{
  color: inherit !important;
  font-size: 16px !important;
  line-height: 1 !important;
}
.mint-navbar .mint-tab-item.is-selected{
  border-bottom: 2px solid #31c27c;
  color: #31c27c;
  margin-bottom: 0;
}
 // 推荐
.recommend_con{
  width: 100%;
  background-color: #f8f8f8;
    .mint-swipe{
        width: 100%;
        height: 150px;
          .mint-swipe-item{
            height: 150px;
            img{
              width: 100%;
              height: 150px;
            }
          }
    }
    h2{
      font-size: 16px;
      color: #000;
      margin-bottom: 11px;
      font-weight: 400;
      margin-left: 10px;
    }
    .hot_music{
      width: 96%;
      margin: auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .hot_list{
        width: 49%;
        background-color: #fff;
        img{
          width: 100%;
          height: 150px;
        }
        span{
          display: block;
          height: 33px;
          line-height: 18px;
          white-space: normal;
          word-wrap: break-word;
          padding: 0 7px 5px;
        }
      }
    }
    .recommend_footer{
      padding: 30px 0;
      a{
        font-family: "黑体";
        font-size: 16px;
        color: #000;
        text-decoration: none;
        width: 100%;
        display: inline-block;
        text-align: center;
      }
      img{
        width: 80px;
        height: 25px;
        display: block;
        margin:10px auto;
      }
      p{
        font-size: 12px;
        color: rgba(0,0,0,.6);
        text-align: center;
      }
    }
}
 // 排行榜
.ranking_list{
      width: 95%;
      display: inline-block;
      margin:10px  auto;
      .ranking_con{
        width: 100%;
        height: 100px;
        margin-bottom: 10px;
        background-color: #fff;
        img{
          width: 100px;
          height: 100px;
          float: left;
        }
        .ranking_right{
          width: 70%;
          height: 100px;
          float: left;
         
          h3{
            font-size: 16px;
            color: #000;
            font-weight: 400;
            margin-bottom: 3px;
            margin-top: 5px;
            margin-left: 10px;
          }
           p{
              width: 88%;
              font-size: 14px;
              color: rgba(0,0,0,.5);
              margin: 5px 10px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              span{
                color: #000;
                margin-left: 8px;
                margin-right: 5px;
              }
            }
        }
      }
}
// 搜索页面
.search{
   .disappear{
     width: 100%;
     height: 56px;
     background-color: #fff;
     overflow: hidden;
     .disappear_con{
        width: 96%;
        height: 38px;
        background-color: #f8f8f8;
        margin:9px auto;
       img{
         width: 24px;
         height: 24px;
         margin: 7px;
         float: left;
       }
       span{
          width: 80%;
          height: 36px;
          line-height: 36px;
          outline: none;
          border: 0;
          float: left;
          font-size: 14px;
          color: #999;
       }
     }
   }
   .appear{
     width: 100%;
     height: 56px;
     background-color: #fff;
     overflow: hidden;
     .appear_con{
        width: 83%;
        height: 38px;
        background-color: #f8f8f8;
        margin-top: 9px;
        margin-left: 9px;
        float: left;
       img{
         width: 24px;
         height: 24px;
         margin: 7px;
         float: left;
       }
       input{
          width: 86%;
          height: 36px;
          line-height: 36px;
          outline: none;
          border: 0;
          float: left;
          font-size: 14px;
          color: #999;
          background-color: #f8f8f8;
       }
       .delate{
         width: 20px;
         height: 20px;
         position: absolute;
         right:50px;
       }
      }
      span{
         float: right;
         line-height: 56px;
         margin-right: 10px;
         color: #061010;
      }
   }
   .search_con{
     padding:0 10px;
     h4{
       font-family: "黑体";
       color: #061010;
       font-weight: 500;
     }
     span{
        display: inline-block;
        font-size: 14px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        color: #000;
        border: 1px solid rgba(0,0,0,.6);
        border-radius: 99px;
        word-break: keep-all;
        margin-bottom: 10px;
        margin-right: 14px;
     }
     span:nth-of-type(1){
        color: #fc4524;
        border-color: #fc4524;
     }
   }
}
</style>
