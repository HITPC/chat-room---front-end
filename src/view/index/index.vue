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
              content="VIP用户专属标识。"
              placement="right"
            >
              <el-icon color="gold" v-if="userVip"><IceCream /></el-icon>
            </el-tooltip>
          </span>
          <button>
            个人中心
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
          <button class="theme-btn" @click="confirmTheme">确定</button>
          <button class="theme-btn" @click="closeTheme">关闭</button>
        </div>
      </div>
      <div class="welcome-text-container">
        <p :style="themeList[themeNow-1].needOutline ? 'text-shadow: 0 1px var(--text-border-color), 1px 0 var(--text-border-color), -1px 0 var(--text-border-color), 0 -1px var(--text-border-color);' : ''">飘尘·畅言地</p>
        <span :style="themeList[themeNow-1].needOutline ? 'text-shadow: 0 1px var(--text-border-color), 1px 0 var(--text-border-color), -1px 0 var(--text-border-color), 0 -1px var(--text-border-color);' : ''">{{ themeList[themeNow-1].text }}</span>
      </div>
    </div>
    <el-icon class="row-down" @click="scrollDown()"><ArrowDownBold /></el-icon>
  </div>
  <div class="index-content-container" ref="content-blow">
    <div class="box" ref="message-box">
      <h2 class="message-box-title">留言板</h2>
      <div class="message-container">
        <div class="meaasge-item" v-for="(item, index) in messageList" :key="index">
          <span class="message-username">{{ item.userName }}</span>
          <span class="message-message">{{ item.message }}</span>
          <span class="message-date">{{ item.Date }}</span>
        </div>
      </div>
      <div class="send-message">
        <textarea v-model="messageText" cols="50" rows="4" placeholder="说点什么？使用win+.组合键可以打开表情。"></textarea>
        <button>发送</button>
      </div>
    </div>
    <div class="line" ref="line"></div>
    <div class="box" ref="chat-room">
      <h2 class="message-box-title">聊天室列表</h2>
      <div class="message-container" style="height: 90%;">
        <div class="room-item" v-for="(item, index) in roomList" :key="index">
          <span class="chat-name">{{ item.name }}</span>
          <span class="chat-people">目前人数：{{ item.peopleNow }}/{{ item.peopleMax }}</span>
          <button class="chat-join">加入</button>
        </div>
      </div>
      <button class="chat-create-btn">创建房间</button>
    </div>
  </div>
</template>

<script>
import "@/style/my-css.css";

export default {
  name: 'IndexPage',
  props: {},
  data () {
    return {
      // 需要一个拿用户信息的接口？vuex的信息能不能长期保存？
      userName: localStorage.getItem("userName"),
      userId: localStorage.getItem("userId"),
      userTheme: Number.parseInt(localStorage.getItem("userTheme")), // 用户数据库里存的主题
      userVip: localStorage.getItem("userVIP") === "1",
      isShowChangeTheme: false,
      themeNow: this.$store.state.userTheme, // 当前选中的主题
      themeList: [
        {
          id: 1,
          name: "泽地木屋",
          url: require("./media/1.jpg"),
          isSelected: false,
          text: "深林独居，晨光初上",
          needOutline: false
        },
        {
          id: 2,
          name: "云笼山原",
          url: require("./media/2.jpg"),
          isSelected: false,
          text: "花遍村庄，水满陂塘。倚东风，云漫山旁",
          needOutline: true
        },
        {
          id: 3,
          name: "风暴岛礁",
          url: require("./media/3.jpg"),
          isSelected: false,
          text: "浪卷天地，云覆苍生",
          needOutline: false
        },
        {
          id: 4,
          name: "孤舟明灯",
          url: require("./media/4.jpg"),
          isSelected: false,
          text: "醉后不知天在水，满船清梦压星河",
          needOutline: false
        },
        {
          id: 5,
          name: "归人见鹿",
          url: require("./media/5.jpg"),
          isSelected: false,
          text: "柴门闻犬吠，风雪夜归人",
          needOutline: true
        },
        {
          id: 6,
          name: "倒悬之都",
          url: require("./media/6.jpg"),
          isSelected: false,
          text: "破碎霓虹争眼，举目前望忆昔，无人诉心悲",
          needOutline: true
        },
        {
          id: 7,
          name: "遥指星火",
          url: require("./media/7.jpg"),
          isSelected: false,
          text: "稻浪翻涌向天边，繁星点点落人间",
          needOutline: true
        },
        {
          id: 8,
          name: "秋日弄弦",
          url: require("./media/8.jpg"),
          isSelected: false,
          text: "半起秋风茶未凉，佳人为伴弄琴常",
          needOutline: true
        },
        {
          id: 9,
          name: "松山晚曦",
          url: require("./media/9.jpg"),
          isSelected: false,
          text: "落日照晚曦，倦鸟归林低",
          needOutline: false
        },
      ],
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
          name: "asasd",
          peopleNow: 2,
          peopleMax: 5,
        },
        {
          name: "asasd",
          peopleNow: 2,
          peopleMax: 5,
        },
        {
          name: "asasd",
          peopleNow: 2,
          peopleMax: 5,
        },
        {
          name: "asasd",
          peopleNow: 2,
          peopleMax: 5,
        },
        {
          name: "asasd",
          peopleNow: 2,
          peopleMax: 5,
        },
        {
          name: "asasd",
          peopleNow: 2,
          peopleMax: 5,
        },

      ],
      messageText: "",
    }
  },
  methods:{
    unLogin(){ // 退出登录
      localStorage.removeItem("token");
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
    changeTheme(){
      this.isShowChangeTheme = true;
    },
    closeTheme(){
      this.isShowChangeTheme = false;
    },
    setCssVarible(index){
      this.themeNow = index;
      switch(index){
        case 1:{
          document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(0, 0, 0, .5)');
          document.documentElement.style.setProperty('--button-bgc', 'rgb(66,75,70)');
          document.documentElement.style.setProperty('--text-color', 'rgb(239,232,215)');
          document.documentElement.style.setProperty('--border-color', 'rgb(66,75,70)');
          document.documentElement.style.setProperty('--text-border-color', 'rgb(255,255,255)');
          this.$refs["main"].style.backgroundImage = `url(${this.themeList[index-1].url})`;
          break;
        }
        case 2: {
          document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(255, 255, 255, .3)');
          document.documentElement.style.setProperty('--button-bgc', 'rgb(240,228,234)');
          document.documentElement.style.setProperty('--text-color', 'rgb(93,146,196)');
          document.documentElement.style.setProperty('--border-color', 'rgb(240,228,234)');
          document.documentElement.style.setProperty('--text-border-color', 'rgb(255,255,255)');
          this.$refs["main"].style.backgroundImage = `url(${this.themeList[index-1].url})`;
          break;
        }
        case 3: {
          document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(0, 0, 0, .5)');
          document.documentElement.style.setProperty('--button-bgc', 'rgb(110,73,89)');
          document.documentElement.style.setProperty('--text-color', 'rgb(247,187,184)');
          document.documentElement.style.setProperty('--border-color', 'rgb(110,73,89)');
          document.documentElement.style.setProperty('--text-border-color', 'rgb(255,255,255)');
          this.$refs["main"].style.backgroundImage = `url(${this.themeList[index-1].url})`;
          break;
        }
        case 4: {
          document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(0, 0, 102, .2)');
          document.documentElement.style.setProperty('--button-bgc', 'rgb(24,43,73)');
          document.documentElement.style.setProperty('--text-color', 'rgba(211,206,110)');
          document.documentElement.style.setProperty('--border-color', 'rgb(24,43,73)');
          document.documentElement.style.setProperty('--text-border-color', 'rgb(255,255,255)');
          this.$refs["main"].style.backgroundImage = `url(${this.themeList[index-1].url})`;
          break;
        }
        case 5: {
          document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(0, 0, 102, .2)');
          document.documentElement.style.setProperty('--button-bgc', 'rgb(240,196,219)');
          document.documentElement.style.setProperty('--text-color', '#fff');
          document.documentElement.style.setProperty('--border-color', 'rgb(240,196,219)');
          document.documentElement.style.setProperty('--text-border-color', 'rgb(0,0,0)');
          this.$refs["main"].style.backgroundImage = `url(${this.themeList[index-1].url})`;
          break;
        }
        case 6: {
          document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(0, 0, 0, .5)');
          document.documentElement.style.setProperty('--button-bgc', 'rgb(57,55,69)');
          document.documentElement.style.setProperty('--text-color', 'rgb(155,213,207)');
          document.documentElement.style.setProperty('--border-color', 'rgb(57,55,69)');
          document.documentElement.style.setProperty('--text-border-color', 'rgb(255,255,255)');
          this.$refs["main"].style.backgroundImage = `url(${this.themeList[index-1].url})`;
          break;
        }
        case 7: {
          document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(149,165,237, .2)');
          document.documentElement.style.setProperty('--button-bgc', 'rgb(63,71,84)');
          document.documentElement.style.setProperty('--text-color', 'rgb(136,197,131)');
          document.documentElement.style.setProperty('--border-color', 'rgb(63,71,84)');
          document.documentElement.style.setProperty('--text-border-color', 'rgb(0,0,0)');
          this.$refs["main"].style.backgroundImage = `url(${this.themeList[index-1].url})`;
          break;
        }
        case 8: {
          document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(255, 255, 255, .4)');
          document.documentElement.style.setProperty('--button-bgc', 'rgb(255,255,255)');
          document.documentElement.style.setProperty('--text-color', 'rgb(194,93,69)');
          document.documentElement.style.setProperty('--border-color', 'rgb(255,255,255)');
          document.documentElement.style.setProperty('--text-border-color', 'rgb(255,255,255)');
          this.$refs["main"].style.backgroundImage = `url(${this.themeList[index-1].url})`;
          break;
        }
        case 9: {
          document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(255, 255, 255, .3)');
          document.documentElement.style.setProperty('--button-bgc', 'rgb(34,96,130)');
          document.documentElement.style.setProperty('--text-color', 'rgb(3,20,44)');
          document.documentElement.style.setProperty('--border-color', 'rgb(34,96,130)');
          this.$refs["main"].style.backgroundImage = `url(${this.themeList[index-1].url})`;
          break;
        }
      }
    },
    setTheme(item){
      // 根据主题设置颜色 
      this.themeList.forEach(item=>item.isSelected = false);
      this.themeList[item.id - 1].isSelected = true;
      this.setCssVarible(item.id);
    },
    confirmTheme(){
      // 主要是为了发请求，服务端更新用户主题选择
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
  },
  mounted(){
    this.themeList[this.userTheme-1].isSelected = true;
    this.setCssVarible(this.userTheme);
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
    background-color: rgba(0, 0, 0, .5);
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
    background-image: url("./media/2.jpg");
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
  
</style>
