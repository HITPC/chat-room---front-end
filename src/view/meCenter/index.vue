<template>
  <div class="me-container" ref="main">
    <div class="show-container">
      <div class="user-avatar">
        <p style="user-select: none;">
          {{ userAvatar }}
        </p>
      </div>
      <div class="message-item">
        <span>用户名称：</span>
        <span>{{ userName }}</span>
      </div>
      <div class="message-item">
        <span>用户ID：</span>
        <span>{{ userId }}</span>
      </div>
      <div class="message-item">
        <span>用户主题：</span>
        <span>{{ themeList[userTheme-1].name }}</span>
      </div>
      <div class="message-item">
        <span v-if="userVip">VIP：</span>
        <span v-if="userVip">
          当前尊享服务已开通
          <el-tooltip
            class="box-item"
            effect="light"
            :content="'(尊享服务专属标识) 您的尊享服务已开通。'"
            placement="right"
          >
            <el-icon color="gold" size="18"><StarFilled /></el-icon>
          </el-tooltip>
        </span>
        <div class="not-on" v-if="!userVip">
          <span>VIP：</span>
          <span>
            当前尊享服务未开通
            <button @click="isShowVIP = true" v-if="whoseIndexId === myUserId">激活服务</button>
          </span>
        </div>
      </div>
    </div>
    <el-icon class="row-down" @click="scrollDown"><ArrowDownBold /></el-icon>
  </div>
  <div class="index-content-container" ref="content-blow">
    <div class="box" ref="message-box">
      <h2 class="message-box-title">
        To: {{ userName }} 的留言板
        <el-icon class="refresh-btn" @click="refresh"><Refresh /></el-icon>
      </h2>
      <div class="message-container">
        <span v-if="messageList.length == 0" class="text">暂无留言！</span>
        <div class="meaasge-item" v-for="(item, index) in messageList" :key="index">
          <span class="message-username">{{ item.userName }}</span>
          <span class="message-message">{{ item.message }}</span>
          <span class="message-date">{{ item.Date }}</span>
        </div>
      </div>
      <div class="send-message">
        <textarea v-model="messageText" cols="50" rows="4" placeholder="说点什么？使用win+.组合键可以打开表情。"></textarea>
        <button @click="leaveMessage">留言</button>
      </div>
    </div>
  </div>
  <div class="vip-container" v-show="isShowVIP">
    <div class="vip-input-container">
      <div>激活尊享服务</div>
      <input type="text" placeholder="请输入激活码" v-model="vipCode">
      <button @click="vipOn">激活</button>
      <el-icon class="vip-close-btn" @click="closeVIP"><Close /></el-icon>
    </div>
  </div>
</template>

<script>
import setCssVarible from "../../untils/setCSS";
import "@/style/my-css.css";
import themeList from "@/data/themeList";
import { getUserData, getMyData, getUserMessageList, createUserMessage } from '@/API/getData';
import { ElMessage } from 'element-plus';
import { enableVIP } from '@/API/doOperations';

export default {
  name: 'MeCenter',
  props: {},
  data () {
    return {
      // 这里的内容是需要依靠发送请求通过userid进行获取的
      userName: "",
      userId: "",
      userTheme: 1, // 用户数据库里存的主题
      userVip: false,
      myUserName: "",
      myUserId: "",
      themeList: themeList,
      messageList: [],
      whoseIndexId: this.$route.params.id,
      isShowVIP: false,
      messageText: "",
      vipCode: "",
    }
  },
  components: {
    
  },
  computed: {
    userAvatar(){
      return this.userName.charAt(0);
    }
  },
  watch: {
    
  },
  methods: {
    scrollDown(){
      if (this.isShowVIP) this.isShowVIP = false;
      setTimeout(()=>{
        this.$refs["content-blow"].scrollIntoView({behavior: 'smooth'});
      }, 100);
    },
    handleScroll(){
      if (this.isShowVIP) this.isShowVIP = false;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 已经读过被卷起来的文档部分
      var scrollHeight = document.documentElement.scrollHeight // 文档总高度
      var clientHeight = document.documentElement.clientHeight // 窗口可视高度
      this.$refs["message-box"].style.opacity = (scrollTop/(scrollHeight-clientHeight)).toFixed(2);
      this.$refs["message-box"].style.transform = `translateY(${200-((scrollTop/(scrollHeight-clientHeight)).toFixed(2)*200)}px)`;
    },
    vipOn(){
      if(this.userVip){
        ElMessage.error("已激活尊享服务！不可重复激活！");
        return;
      }
      enableVIP({code: this.vipCode}).then((data)=>{
        console.log(data);
        if(data.code == 202){
          ElMessage.error("已激活尊享服务！不可重复激活！");
          this.vipCode = "";
          this.isShowVIP = false;
          return;
        }else if(data.code == 200){
          ElMessage.success("激活成功！请刷新此页面和主页！");
          this.vipCode = "";
          this.isShowVIP = false;
          return;
        }else if(data.code == 203){
          ElMessage.error("激活码错误！");
          return;
        }else if(data.code == 250){
          console.log("Aaa");
          ElMessage.error("被使用过的激活码！");
          return;
        }
      }).catch((error)=>{
        console.log(error);
        ElMessage.error("激活失败！");
        this.isShowVIP = false;
      });
    },
    closeVIP(){
      this.isShowVIP = false;
      this.vipCode = "";
    },
    refresh(){
      // 刷新列表
      // 使用whoseIndexId进行刷新
      this.getUserMessageList();
    },
    getMyData(){
      getMyData().then((data)=>{
        let item = data.data;
        this.myUserId = item.id;
        this.myUserName = item.username;
      }).catch((error)=>{
        console.log(error);
        ElMessage.error("获取个人信息失败！");
      });
    },
    getUserData(){
      getUserData({id: this.whoseIndexId}).then((data)=>{
        if(data.code == 200){
          let item = data.data;
          this.userId = item.id;
          this.userName = item.username;
          this.userTheme = item.userTheme;
          this.userVip = item.userVIP;
          setCssVarible(this.userTheme, this);
        }
      }).catch((error)=>{
        console.log(error);
        setCssVarible(this.userTheme, this);
        ElMessage.error("拉取用户信息失败！");
      });
    },
    getUserMessageList(){
      getUserMessageList({belongToId: this.whoseIndexId}).then((data)=>{
        if(data.code == 200){
            data.data.forEach((item)=>{
            if(!this.messageList.find(i => i.id === item._id)){
              this.messageList.unshift({
                id: item._id,
                userName: item.userName,
                Date: item.date,
                message: item.message
              });
            }else if(this.messageList.length == 0){
              this.messageList.push({
                id: item._id,
                userName: item.userName,
                Date: item.date,
                message: item.message
              });
            }
          });
        }
      }).catch((error)=>{
        console.log(error);
        ElMessage.error("获取留言失败！");
      });
    },
    leaveMessage(){
      if(this.messageText === "" || this.messageText === " "){
        ElMessage.error("内容不能为空！");
        return;
      }else{
        createUserMessage({
          belongToId: this.whoseIndexId,
          message: this.messageText
        }).then((data)=>{
          if(data.code == 200){
            ElMessage.success("留言成功！");
            this.messageText = "";
            this.getUserMessageList();
          }
        }).catch((error)=>{
          console.log(error);
          ElMessage.error("留言失败！");
        });
      }
    },
  },
  created () {
    
  },
  mounted () {
    this.getMyData();
    this.getUserData();
    this.getUserMessageList();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount(){
    window.removeEventListener("scroll", this.handleScroll);
  },
}
</script>

<style scoped>
  .top{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--menu-container-bgc);
    z-index: 100;
  }
  .me-container{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-image: url("../index/media/8.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    transition: all .2s;
  }

  .show-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    align-content: space-evenly;
    width: 50%;
    height: 80%;
    background-color: var(--menu-container-bgc);
    border-radius: 30px;
  }

  .text{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    font-size: 30px;
    color: var(--text-color);
  }

  .user-avatar{
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
    font-weight: 600;
    font-size: 36px;
    width: 150px;
    height: 150px;
    border-radius: 150px;
    background-color: var(--button-bgc);
  }

  .message-item, .not-on{
    width: 100%;
    text-align: center;
  }
  .message-item span:first-child, .not-on span:first-child{
    font-weight: 600;
    font-size: 22px;
    color: var(--text-color);
  }

  .message-item span:nth-child(2), .not-on span:nth-child(2){
    display: inline-block;
    width: 40%;
    font-size: 20px;
    color: var(--text-color);
  }

  .not-on button{
    width: 100px;
    height: 30px;
    background-color: var(--button-bgc);
    color: var(--text-color);
    border-radius: 5px;
    border: none;
    outline: none;
    cursor: pointer;
    margin-bottom: 2px;
    margin-left: 5px;
    font-weight: 600;
    transition: all .2s;
  }

  .not-on button:hover{
    opacity: .9;
  }

  .row-down{
    position: absolute;
    color: var(--text-color);
    font-size: 44px;
    font-weight: 600;
    bottom: 2%;
    left: 50%;
    transform: translateX(-50%);
    animation: arrow-down 2s linear infinite;
    cursor: pointer;
  }    

  .index-content-container{
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--button-bgc);
  }

  .box{
    position: relative;
    width: 45%;
    height: 80%;
    transition: all .7s;
  }

  .message-box-title{
    position: absolute;
    top: -6%;
    width: 100%;
    text-align: center;
    color: var(--text-color);
    font-family: '方正姚体';
  }

  .message-container{
    position: relative;
    width: 100%;
    height: 70%;
    /* margin-left: 20%; */
    /* background-color: var(--menu-container-bgc); */
    overflow: auto;
  }

  .meaasge-item{
    position: relative;
    margin: 0 auto 10px auto;
    width: 80%;
    height: 40%;
    background-color: var(--text-color);
    color: var(--button-bgc);
    border-radius: 5px;
  }

  .meaasge-item:first-child{
    margin-top: 10px;
  }

  .meaasge-item:last-child{
    margin-bottom: 0;
  }

  .meaasge-item span{
    position: absolute;
  }

  .message-username{
    font-weight: 600;
    font-size: 26px;
    left: 5%;
    top: 5%;
    font-family: '隶书';
  }

  .message-message{
    width: 100%;
    height: 60%;
    overflow: auto;
    font-size: 20px;
    top: 40%;
    white-space: pre-wrap;
    word-wrap: break-word;
    padding-left: 5%;
    padding-right: 5%;
    box-sizing: border-box;
    font-family: '黑体';
    font-weight: 600;
  }

  .message-date{
    font-weight: 600;
    font-size: 22px;
    right: 5%;
    top: 5%;
    font-family: '隶书';
  }

  .send-message{
    position: absolute;
    top: 72%;
    width: 100%;
    height: 32%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: space-around;
    flex-wrap: wrap;
  }

  .send-message button{
    width: 50%;
    height: 40px;
    cursor: pointer;
    border-radius: 10px;
    background-color: var(--text-color);
    color: var(--button-bgc);
    font-family: '隶书';
    font-size: 28px;
    font-weight: 600;
    border: none;
    outline: none;
    transition: all .2s;
  }

  .send-message textarea{
    outline: none;
    border: none;
    background-color: var(--text-color);
    color: var(--button-bgc);
    font-family: '黑体';
    padding: 8px;
    font-size: 20px;
    overflow: auto;
    font-weight: 600;
    border-radius: 5px;
    transition: all .2s;
  }

  .send-message textarea:hover, .send-message button:hover{
    opacity: .6;
  }

  .vip-container{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--menu-container-bgc);
    z-index: 99;
  }

  .vip-input-container{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    align-content: space-evenly;
    width: 50%;
    height: 80%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--button-bgc);
    border-radius: 30px;
  }

  .vip-input-container div{
    width: 100%;
    color: var(--text-color);
    font-weight: 600;
    font-size: 36px;
    text-align: center;
    font-family: '方正姚体';
  }

  .vip-input-container input{
    border: none;
    border-bottom: 1px solid var(--text-color);
    outline: none;
    width: 60%;
    height: 8%;
    padding-left: 5px;
    color: var(--text-color);
    background-color: transparent;
    transition: all .2s;
  }

  .vip-input-container input:focus{
    animation: width-widder .5s ease-out 1;
  }

  .vip-input-container button{
    width: 60%;
    height: 8%;
    border: none;
    cursor: pointer;
    background-color: var(--text-color);
    color: var(--button-bgc);
    border-radius: 15px;
    transition: all .2s;
  }

  .vip-input-container button:hover{
    opacity: .6;
  }

  .vip-close-btn{
    position: absolute;
    right: 3%;
    top: 2%;
    font-size: 26px;
    cursor: pointer;
    color: var(--text-color);
  }

  .vip-close-btn:hover{
    animation: rorate .8s ease-out 1;
  }

  .refresh-btn{
    position: relative;
    font-size: 22px;
    top: 2px;
    border: 1px solid var(--text-color);
    border-radius: 5px;
    cursor: pointer;
  }

  .refresh-btn svg:hover{
    animation: rorate .8s ease-out 1;
  }

</style>
