<template>
  <div class="top" v-show="isShowBlack"></div>
  <div class="index-container">
    <div class="welcome-page" ref="main">
      <div class="menu" @click="showMenu" ref="menu-button">
        <el-icon color="white"><Expand /></el-icon>
        <span style="font-family: 'Bradley Hand ITC';">MENU</span>
      </div>
      <div class="menu-container" ref="menu-container">
        <div class="menu-content" ref="menu-content">
          <el-icon class="menu-close-btn" @click="closeMenu"><Close /></el-icon>
          <div class="user-avatar">
            <p style="user-select: none;">
              {{ userAvatar }}
            </p>
          </div>
          <span style="font-family: '方正姚体';">
            {{ userName }}
            <el-tooltip
              class="box-item"
              effect="light"
              :content="userVip ? '(尊享服务专属标识) 您的尊享服务已开通。' : '尊享服务未开通。'"
              placement="right"
            >
              <el-icon :color="userVip ? 'gold' : 'var(--button-bgc)'"
                size="18"
                style="position: relative; top: 2px;"
              >
                <StarFilled />
              </el-icon>
            </el-tooltip>
          </span>
          <button @click="toMeCenter">
            个人中心
          </button>
          <button @click="toManage" v-if="userType">
            管理网站
          </button>
          <button @click="unLogin">
            退出登录
          </button>
        </div>
      </div>
      <div class="change-theme-btn" @click="changeTheme">
        <el-icon color="white"><Switch /></el-icon>
        <span style="font-family: '方正姚体';">切换主题</span>
      </div>
      <div class="theme-container" v-show="isShowChangeTheme">
          <li class="theme-container-item" 
            v-for="(item) in themeList"
            :key="item.id"
            @click="setTheme(item)"
            :style="item.isSelected ? 'border-bottom: 2px solid var(--text-color);' : ''"
          >
              <img :src="item.url" :alt="item.name">
              <p>{{ item.name }}</p>
          </li>
        <div class="theme-btn-container">
          <button class="theme-btn" @click="confirmTheme">保存</button>
          <button class="theme-btn" @click="closeTheme">关闭</button>
        </div>
      </div>
      <div class="welcome-text-container">
        <p :style="themeList[themeNow-1].needOutline ? 'text-shadow: 0 1px var(--text-border-color), 1px 0 var(--text-border-color), -1px 0 var(--text-border-color), 0 -1px var(--text-border-color);' : ''">飘尘·畅言地</p>
        <span :style="themeList[themeNow-1].needOutline ? 'text-shadow: 0 1px var(--text-border-color), 1px 0 var(--text-border-color), -1px 0 var(--text-border-color), 0 -1px var(--text-border-color);' : ''">{{ themeList[themeNow-1].text }}</span>
      </div>
    </div>
    <el-icon class="row-down" @click="scrollDown"><ArrowDownBold /></el-icon>
  </div>
  <div class="index-content-container" ref="content-blow">
    <div class="box" ref="message-box">
      <h2 class="message-box-title">
        留言板
        <el-icon class="refresh-btn" @click="refresh('message')"><Refresh /></el-icon>
      </h2>
      <div class="message-container">
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
    <div class="line" ref="line"></div>
    <div class="box" ref="chat-room">
      <h2 class="message-box-title">
        聊天室列表
        <el-icon class="refresh-btn" @click="refresh('chatRoom')"><Refresh /></el-icon>
      </h2>
      <div class="message-container" style="height: 90%;">
        <div class="room-item" v-for="(item, index) in roomList" :key="index">
          <span class="chat-name">{{ item.name }}</span>
          <span class="chat-people">目前人数：{{ item.peopleNow }}/{{ item.peopleMax }}</span>
          <button class="chat-join" @click="joinIn(item)">加入</button>
        </div>
      </div>
      <button class="chat-create-btn" @click="createChatRoom">创建房间</button>
    </div>
  </div>
  <div class="create-room-container" v-show="isShowRoom">
    <div class="create-room-input-container">
      <div>创建房间</div>
      <input type="text" placeholder="请输入房间名" v-model="roomName">
      <input type="text" placeholder="请输入房间密码(不输入就是不用)" v-model="roomPassword">
      <button @click="doCreateRoom">创建</button>
      <el-icon class="vip-close-btn" @click="closeCreate"><Close /></el-icon>
    </div>
  </div>
</template>

<script>
import "@/style/my-css.css";
import setCssVarible from "../../untils/setCSS";
import { ElMessage } from 'element-plus';
import themeList from "@/data/themeList";

export default {
  name: 'IndexPage',
  props: {},
  data () {
    return {
      // 需要一个拿用户信息的接口 正确的！就用接口存着信息，然后通过cookie里面的内容解析出来id放到vuex里（这个在mounted这里做）不要用localstorage!  (记得后面个人中心 和 聊天室在对上接口之后也要改掉这里！)
      userName: localStorage.getItem("userName"),
      userId: localStorage.getItem("userId"),
      userTheme: Number.parseInt(localStorage.getItem("userTheme")), // 用户数据库里存的主题
      userVip: localStorage.getItem("userVIP") === "1",
      userType: localStorage.getItem("userType") === "admin",
      isShowChangeTheme: false,
      themeNow: Number.parseInt(localStorage.getItem("userTheme")),// 当前选中的主题
      themeList: themeList,
      isShowBlack: false,
      messageList: [
        {
          userName: "a",
          message: "啊",
          Date: "aaaaaaa",
        },
        {
          userName: "aaaaa",
          message: "aa",
          Date: "aaaaa",
        },
        {
          userName: "aaaaa",
          message: "aa",
          Date: "aaaaa",
        },
      ],
      roomList: [
        {
          id: 0,
          name: "asasd",
          peopleNow: 2,
          peopleMax: 5,
        },
        {
          id: 1,
          name: "年后",
          peopleNow: 2,
          peopleMax: 5,
        },
        {
          id: 2,
          name: "asasd",
          peopleNow: 2,
          peopleMax: 5,
        },
        {
          id: 3,
          name: "asasd",
          peopleNow: 2,
          peopleMax: 5,
        },
        {
          id: 4,
          name: "asasd",
          peopleNow: 2,
          peopleMax: 5,
        },
        {
          id: 5,
          name: "asasd",
          peopleNow: 2,
          peopleMax: 5,
        },

      ],
      messageText: "",
      roomName: "",
      roomPassword: "",
      isShowRoom: false,
    }
  },
  methods:{
    unLogin(){ // 退出登录
      // 仅为了开发使用
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("userTheme");
      localStorage.removeItem("userVIP");
      localStorage.removeItem("userType");
      this.$router.push("/login");
    },
    showMenu(){
      if(this.$refs["menu-container"].classList.contains("menu-close")){
        this.$refs["menu-container"].classList.remove("menu-close");
      }
      this.$refs["menu-button"].style.opacity = 0;
      this.$refs["menu-content"].style.opacity = 0;
      this.$refs["menu-container"].classList.add("menu-show");
      setTimeout(()=>{
        this.$refs["menu-content"].style.opacity = 1;
      }, 500);
    },
    closeMenu(){
      if(this.$refs["menu-container"].classList.contains("menu-show")){
        this.$refs["menu-container"].classList.remove("menu-show");
      }
      this.$refs["menu-container"].classList.add("menu-close");
      setTimeout(()=>{
        this.$refs["menu-button"].style.opacity = 1;
        this.$refs["menu-content"].style.opacity = 0;
      }, 500);
    },
    changeTheme(){// 打开选取主题页面
      if(!this.userVip){
        ElMessage.error("您未开通尊享服务，不能使用此服务，请去个人中心激活服务！");
        return;
      }
      this.isShowChangeTheme = true;
    },
    closeTheme(){ // 关闭选取主题页面
      this.isShowChangeTheme = false;
      ElMessage.warning("已取消保存。");
    },
    setTheme(item){
      if(!this.userVip){
        ElMessage.error("您未开通尊享服务，不能使用此服务，请去个人中心激活服务！");
        return;
      }
      // 根据主题设置颜色 
      this.themeList.forEach(item=>item.isSelected = false);
      this.themeList[item.id - 1].isSelected = true;
      setCssVarible(item.id, this);
      this.themeNow = item.id;
    },
    confirmTheme(){
      ElMessage.success("切换成功！");
      // 主要是为了发请求，服务端更新用户主题选择 后面肯定是发请求的
      localStorage.setItem("userTheme", this.themeNow);
      this.isShowChangeTheme = false;
    },
    scrollDown(){
        this.isShowBlack = true;
        setTimeout(()=>{
          this.$refs["content-blow"].scrollIntoView({behavior: 'smooth'});
          setTimeout(()=>{
            this.isShowBlack = false;
          }, 600);
        }, 300);
    },
    handleScroll(){
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 已经读过被卷起来的文档部分
      var scrollHeight = document.documentElement.scrollHeight // 文档总高度
      var clientHeight = document.documentElement.clientHeight // 窗口可视高度
      this.$refs["message-box"].style.opacity = (scrollTop/(scrollHeight-clientHeight)).toFixed(2);
      this.$refs["line"].style.opacity = (scrollTop/(scrollHeight-clientHeight)).toFixed(2);
      this.$refs["chat-room"].style.opacity = (scrollTop/(scrollHeight-clientHeight)).toFixed(2);
      this.$refs["message-box"].style.transform = `translateY(${200-((scrollTop/(scrollHeight-clientHeight)).toFixed(2)*200)}px)`;
      this.$refs["chat-room"].style.transform = `translateY(${200-((scrollTop/(scrollHeight-clientHeight)).toFixed(2)*200)}px)`;
    },
    toMeCenter(){
      window.open(`me/${this.userId}`, "_blank"); // 打开新页面进行跳转
    },
    joinIn(item){
      window.open(`/chatroom/${item.id}/${item.name}`, "_blank");
    },
    toManage(){
      window.open(`/manage`, "_blank");
    },
    createChatRoom(){
      if(!this.userVip){
        ElMessage.error("您未开通尊享服务，不能使用此服务，请去个人中心激活服务！");
        return;
      }
      this.isShowRoom = true;
    },
    doCreateRoom(){
      if(!this.userVip){
        ElMessage.error("您未开通尊享服务，不能使用此服务，请去个人中心激活服务！");
        return;
      }
      // 此处发送请求
      this.isShowRoom = false;
    },
    closeCreate(){
      if(!this.userVip){
        ElMessage.error("您未开通尊享服务，不能使用此服务，请去个人中心激活服务！");
        return;
      }
      this.isShowRoom = false;
    },
    leaveMessage(){
      // 应该发请求，然后重新获取列表

    },
    refresh(type){
      console.log(type);
    }
  },
  mounted(){
    this.themeList[this.userTheme-1].isSelected = true;
    setCssVarible(this.userTheme, this);
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount(){
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed:{
    userAvatar(){
      return this.userName.charAt(0);
    }
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
  .index-container{
    position: relative;
    height: 100%;
    width: 100%;
  }

  .welcome-page{
    height: 100%;
    width: 100%;
    background-image: url("./media/1.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    overflow: hidden;
  }

  .menu{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100px;
    height: 32px;
    top: 3%;
    left: 1%;
    border: 1px solid hsla(0,0%,100%,.6);
    transition: all .2s;
    cursor: pointer;
    border-radius: 3px;
    animation: littleMove 3s linear infinite;
    z-index: 2;
  }

  .menu-content{
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-content: space-around;
    flex-wrap: wrap;
    opacity: 0; 
    transition: all .3s;
    z-index: 9;
  }

  .menu:hover, .change-theme-btn:hover{
    opacity: .6;
  }

  .menu span, .change-theme-btn span{
    padding: 5px;
    color: white;
    font-weight: 600;
  }

  .menu-container{
    position: fixed;
    top: 0;
    left: -20%;
    height: 100%;
    width: 20%;
    transition: all 1s;
    background-color: var(--menu-container-bgc);
    z-index: 2;
  }

  .menu-show{
    animation: flex-show .6s linear 1 forwards;
  }

  .menu-close{
    animation: slide-dispear-left .6s linear 1 forwards;
  }

  .menu-close-btn{
    position: absolute;
    right: 3%;
    top: 2%;
    font-size: 26px;
    cursor: pointer;
    color: var(--text-color);
  }

  .menu-close-btn:hover{
    animation: rorate .8s ease-out 1;
  }

  .user-avatar{
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
    font-weight: 600;
    font-size: 36px;
    width: 50%;
    height: 20%;
    border-radius: 100%;
    background-color: var(--button-bgc);
  }

  .menu-container button{
    width: 60%;
    height: 5%;
    background-color: var(--button-bgc);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    border-radius: 3px;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    transition: all .2s;
  }

  .menu-container button:hover,.theme-btn:hover {
    opacity: .6;
  }

  .menu-container span{
    width: 60%;
    color: var(--text-color);
    font-weight: 600;
    text-align: center;
    font-size: 22px;
  }

  .change-theme-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100px;
    height: 32px;
    top: 3%;
    right: 1%;
    border: 1px solid hsla(0,0%,100%,.6);
    transition: all .2s;
    cursor: pointer;
    border-radius: 3px;
    animation: littleMove 3s linear infinite;
    z-index: 2;
  }

  .theme-container{
    position: fixed;
    /* display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center; */
    /* align-content: space-around; */
    top: 10%;
    right: 1%;
    width: 30%;
    min-height: 35%;
    background-color: var(--menu-container-bgc);
    border-radius: 20px;
    /* overflow: auto; */
    z-index: 2;
  }

  .theme-container-item{
    position: relative;
    list-style: none;
    display: inline-block;
    margin: 10px;
    height: 40%;
    width: 20%;
    cursor: pointer;
  }

  .theme-container-item img{
    width: 100%;
    height: 80%;
  }

  .theme-container-item p{
    color: var(--text-color);
    padding: 2px;
    font-weight: 600;
    text-align: center;
    font-family: '幼圆';
    transition: all .2s;
  }

  .theme-btn{
    width: 30%;
    height: 30px;
    background-color: var(--button-bgc);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: 3px;
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  .theme-btn-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
  }

  .welcome-text-container{
    position: absolute;
    display: flex;
    justify-content: center;
    align-content: space-evenly;
    flex-wrap: wrap;
    width: 40%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .welcome-text-container p{
    display: inline-block;
    width: 60%;
    font-weight: 800;
    font-size: 55px;
    font-family: '华文楷体';
    color: var(--text-color);
    text-align: center;
    transition: all .2s;
  }
  .welcome-text-container span{
    display: inline-block;
    position: relative;
    top: -95px;
    width: 100%;
    font-weight: 800;
    font-size: 28px;
    font-family: '隶书';
    color: var(--text-color);
    text-align: center;
  }

  .welcome-text-container p:hover{
    transform: translateY(-3px);
  }

  .row-down{
    position: absolute;
    color: var(--text-color);
    font-size: 44px;
    font-weight: 600;
    bottom: 5%;
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

  .line{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 90%;
    width: 1px;
    border-right: 1px dashed var(--text-color);
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

  .room-item{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: space-around;
    flex-wrap: wrap;
    margin: 0 auto 10px auto;
    width: 80%;
    height: 40%;
    background-color: var(--text-color);
    color: var(--button-bgc);
    border-radius: 5px;
  }

  .room-item span{
    text-align: center;
  }

  .chat-name{
    width: 60%;
    font-weight: 600;
    font-size: 26px;
    font-family: '隶书';
  }

  .chat-people{
    width: 60%;
    font-weight: 600;
    font-size: 20px;
    font-family: '隶书';
  }

  .chat-join{
    width: 50%;
    height: 30px;
    font-weight: 600;
    border: none;
    outline: none;
    transition: all .2s;
    background-color: var(--button-bgc);
    color: var(--text-color);
    font-family: '隶书';
    border-radius: 5px;
    cursor: pointer;
    transition: all .2s;
  }

  .chat-join:hover, .chat-create-btn:hover{
    opacity: .6;
  }

  .chat-create-btn{
    position: absolute;
    bottom: -2%;
    left: 50%;
    transform: translateX(-50%);
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

  .create-room-container{
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    height: 100%;
    background-color: var(--menu-container-bgc);
    z-index: 99;
  }

  .create-room-input-container{
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

  .create-room-input-container div{
    width: 100%;
    color: var(--text-color);
    font-weight: 600;
    font-size: 36px;
    text-align: center;
    font-family: '方正姚体';
  }

  .create-room-input-container input{
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

  .create-room-input-container input:focus{
    animation: width-widder .5s ease-out 1;
  }

  .create-room-input-container button{
    width: 60%;
    height: 8%;
    border: none;
    cursor: pointer;
    background-color: var(--text-color);
    color: var(--button-bgc);
    border-radius: 15px;
    transition: all .2s;
  }

  .create-room-input-container button:hover{
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
