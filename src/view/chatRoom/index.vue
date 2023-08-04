<template>
  <div class="container" ref="main"></div>
  <div class="real-container">
    <div class="chat-container">
      <div class="title">
        {{ roomName }} <span style="font-size: 22px; line-height: 32px;">房间创建者： {{ creator }}</span>
      </div>
      <div class="memeber-list">
        <div class="list-title">
          成员列表
        </div>
        <div class="memeber-item" v-for="item in members" :key="item.id" @click="toCenter(item)">
          <div class="avatar">{{ item.name.charAt(0) }}</div>
          <span class="name">
            {{ item.name }}
            <el-tooltip
              class="box-item"
              effect="light"
              :content="item.isVIP ? '(尊享服务专属标识) 尊享服务已开通。' : '尊享服务未开通' "
              placement="right"
            >
              <el-icon :color="item.isVIP ? 'gold' : 'var(--text-color)'"
                size="18"
                style="position: relative; top: 2px;"
              >
                <StarFilled />
              </el-icon>
            </el-tooltip>
          </span>
        </div>
      </div>
      <div class="message-box">
        <div class="message-item"
          v-for="item in messageList"
          :key="item.id"
          :style="item.fromId === userId ? 'margin-left: 20%;' : ''"
        >
          <div class="message-avatar" :style="item.fromId === userId ? 'right: 3%;' : 'left: 3%;'">
            {{ item.fromName.charAt(0) }}
          </div>
          <div class="message" :style="item.fromId === userId ? 'right: 9%;' : 'left: 9%;'">
            <div class="message-from">
              {{ item.fromId === userId ? '您' : item.fromName }}
              <el-tooltip
                class="box-item"
                effect="light"
                content=" (尊享服务专属标识) 尊享服务已开通。"
                placement="right"
                v-if="item.fromVIP"
              >
                <el-icon color="gold"
                  size="18"
                  style="position: relative; top: 2px;"
                >
                  <StarFilled />
                </el-icon>
              </el-tooltip>
            </div>
            <div class="message-time">
              {{ item.date }}
            </div>
            <span class="message-message">
              {{ item.message }}
            </span>
          </div>
        </div>
      </div>
      <div class="edit-message">
        <textarea v-model="messageToSend" placeholder="说点什么？使用win+.组合键可以打开表情。"></textarea>
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/style/my-css.css';
import setCssVarible from '@/untils/setCSS';
import themeList from '@/data/themeList';
import { getMyData, getRoomData, getRoomUserList, getMessageList, sendMessage, leaveRoom } from '@/API/getData';
import { ElMessage } from 'element-plus';
// import websocket from '@/API/websocket'

export default {
  name: 'ChatRoom',
  props: {},
  data () {
    return {
      roomId: "",
      roomName: "",
      userName: "",
      userId: "",
      userTheme: 1, // 用户数据库里存的主题
      userVip: false,
      themeList: themeList,
      members: [],
      messageToSend: "",
      messageList: [],
      creator: "", // 房间创建者
      // socket: null,
      timer1: null,
      timer2: null,
    }
  },
  components: {
    
  },
  computed: {
    
  },
  watch: {
    
  },
  methods: {
    toCenter(item){
      window.open(`/me/${item.id}`, "_blank");
    },
    sendMessage(){
      if(this.messageToSend === ""){
        ElMessage.error("不能发送空消息！");
        return;
      }
      // 向服务器发送消息
      // if (this.socket) {
      //   // this.socket.send(this.messageToSend);
      //   this.socket.sendFn(this.messageToSend)
      //   this.messageToSend = "";
      // }
      sendMessage({roomId: this.roomId, message: this.messageToSend}).then((data)=>{
        if(data.code == 200){
          ElMessage.success("发送成功！");
          this.messageToSend = "";
        }
      }).catch((error)=>{
        console.log(error);
        ElMessage.error("消息发送失败！");
      });
    },
    getRoomData(){
      getRoomData({roomId: this.roomId}).then((data)=>{
        this.roomName = data.data.roomName;
        this.creator = data.data.creatorName;
        document.title = "聊天室：" + this.roomName;
      }).catch((error)=>{
        console.log(error);
        ElMessage.error("获取房间信息失败！");
      });
    },  
    getMyData(){
      getMyData().then((data)=>{
        let item = data.data;
        this.userId = item.id;
        this.userName = item.username;
        this.userTheme = item.userTheme;
        this.userVip = item.userVIP;
        setCssVarible(this.userTheme, this);
      }).catch((error)=>{
        console.log(error);
        ElMessage.error("获取个人信息失败！");
      });
    },
    getRoomUserList(){
      getRoomUserList({roomId: this.roomId}).then((data)=>{
        data.data.forEach((item)=>{
          if(!this.members.find(i=>i.id === item.id)){
            this.members.push({
              id: item.id,
              name: item.userName,
              isVIP: item.userVIP
            });
          } 
        });
      }).catch((error)=>{
        console.log(error);
        ElMessage.error("获取用户列表失败！");
      });
    },  
    getMessageList(){
      getMessageList({roomId: this.roomId}).then((data)=>{
        if(data.code == 200){
          data.data.forEach((item)=>{
            if(!this.messageList.find(i=>i.id === item.id)){
              this.messageList.push({
                id: item.id,
                fromId: item.fromId,
                fromName: item.fromName,
                fromVIP: item.fromVIP,
                message: item.message,
                date: item.date,
              })
            }
          });
        }else{
          console.log(data);
          ElMessage.error("拉取消息列表失败！");
        }
      }).catch((error)=>{
        console.log(error);
        ElMessage.error("拉取消息列表失败！");
      });
    },

    leaveRoom(){
      leaveRoom({roomId: this.roomId}).then(()=>{}).catch((error)=>{console.log(error);});
    },
  },
  created () {
    
  },
  mounted () {
    this.roomId = this.$route.params.id
    this.getMyData();
    this.getRoomData();
    // 开始的时候记得根据聊天室id获取members
    this.getRoomUserList();
    this.timer1 = setInterval(()=>{// 只能轮询了...  不知道为什么后端websocket连不起来...
      this.getRoomUserList();
    }, 1500);
    this.getMessageList();
    this.timer2 = setInterval(()=>{
      this.getMessageList();
    }, 800);
    // this.socket = new WebSocket("ws://localhost:3000/submessage");
    // // 监听连接打开事件
    // this.socket.addEventListener('open', (event) => {
    //   // 连接已打开
    //   console.log('WebSocket connection opened:', event);
    // });
    // this.socket.onerror = (e) => {
    //         console.error('连接错误', e)
    // }
    // // 监听消息事件
    // this.socket.addEventListener('message', (event) => {
    //   // 处理从服务器接收到的消息
    //   console.log('Message from server:', event.data);
    // });
    // this.socket = new websocket("ws://localhost:3000/submessage");
    // this.socket.createFn();
    // 绑定回车发消息
    window.addEventListener("keyup", (e) => {
      if(e.code === "Enter"){
        this.sendMessage();
      }
    });
    window.onbeforeunload = (e)=>{
      e.preventDefault();
      alert("ok")
      window.onkeyup = null;
      // 关闭 WebSocket 连接
      // if (this.socket) {
      //   this.socket.close();
      // }
      // this.socket.closeFn();
      clearInterval(this.timer1);
      clearInterval(this.timer2);
      this.leaveRoom();
    }
  },

  beforeUnmount(){
    
  },
}
</script>

<style scoped>
  .container{
    height: 100%;
    width: 100%;
    background-image: url("../index/media/8.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    transition: all .2s;
    filter: blur(2px);
  }

  .real-container{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .chat-container{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 70%;
    height: 90%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background-color: var(--menu-container-bgc);
  }

  .title{
    position: absolute;
    top: 0;
    left: 0;
    height: 5%;
    width: 100%;
    font-size: 32px;
    color: var(--text-color);
    font-weight: 700;
    font-family: '隶书';
    text-align: center;
    border-bottom: 1px dashed var(--text-color);
    z-index: 40;
  }

  .memeber-list{
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    right: 0;
    top: 5%;
    height: 95%;
    width: 20%;
    border-left: 1px dashed var(--text-color);
    overflow: auto;
  }

  .memeber-item{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 6%;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all .2s;
    overflow: auto;
    color: var(--text-color);
  }

  .memeber-item::after{
    content: "";
    width: 80%;
    position: absolute;
    top: 95%;
    border-bottom: 1px dashed var(--text-color);
  }

  .memeber-item:hover{
    opacity: .6;
  }

  .list-title{
    width: 100%;
    font-weight: 600;
    font-size: 24px;
    font-family: '方正姚体';
    color: var(--text-color);
    text-align: center;
    margin-bottom: 10px;
    margin-top: 5px;
  }

  .avatar{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 31px;
    width: 31px;
    border-radius: 31px;
    font-weight: 600;
    background-color: var(--button-bgc);
    user-select: none;
  }

  .message-avatar{
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 31px;
    width: 31px;
    border-radius: 31px;
    font-weight: 600;
    background-color: var(--button-bgc);
    color: var(--text-color);
    top: 20%;
    z-index: 10;
    user-select: none;
  }

  .message{
    position: absolute;
    width: 80%;
    min-height: 100%;
    background-color: var(--button-bgc);
    color: var(--text-color);
    font-size: 18px;
    border-radius: 5px;
    overflow: auto;
  }

  .message-from{
    position: absolute;
    top: 5%;
    left: 3%;
    font-weight: 600;
  }

  .message-time{
    position: absolute;
    top: 5%;
    right: 3%;
    font-weight: 600;
  }

  .message-message{
    position: absolute;
    display: inline-block;
    word-wrap: break-word;
    width: 95%;
    top: 25%;
    left: 3%;
  }

  .name{
    font-weight: 600;
  } 

  .message-box{
    position: absolute;
    width: 80%;
    height: 70%; 
    top: 5%;
    left: 0;
    border-bottom: 1px dashed var(--text-color);
    overflow: auto;
  }

  .edit-message{
    position: absolute;
    width: 80%;
    height: 25%;
    top: 75%;
    left: 0;
  }

  .edit-message textarea{
    height: 80%;
    width: 98%;
    border: none;
    outline: none;
    background-color: transparent;
    font-weight: 600;
    color: var(--text-color);
    font-size: 17px;
    padding-left: 10px;
    padding-top: 5px;
  }

  .edit-message button{
    position: absolute;
    right: 5px;
    bottom: 2%;
    width: 80px;
    height: 35px;
    border-radius: 3px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: var(--button-bgc);
    color: var(--text-color);
    font-weight: 600;
    font-size: 22px;
    font-family: '方正姚体';
    transition: all .2s;
  }

  .edit-message button:hover{
    opacity: .8;
  }

  .message-item{
    position: relative;
    width: 80%;
    min-height: 28%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
