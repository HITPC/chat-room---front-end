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

export default {
  name: 'ChatRoom',
  props: {},
  data () {
    return {
      roomId: this.$route.params.id,
      roomName: this.$route.params.name,
      userName: localStorage.getItem("userName"),
      userId: localStorage.getItem("userId"),
      userTheme: Number.parseInt(localStorage.getItem("userTheme")), // 用户数据库里存的主题
      userVip: localStorage.getItem("userVIP") === "1",
      themeList: themeList,
      members: [
        {
          id: 1,
          name: "xx",
          isVIP: false,
        },
        {
          id: 2,
          name: "xx",
          isVIP :true,
        },
        {
          id: 3,
          name: "xx",
          isVIP: true,
        },
        {
          id: 4,
          name: "xx",
          isVIP: false,
        },
      ],
      messageToSend: "",
      messageList: [
        {
          fromId: "1",
          fromName: "xx",
          fromVIP: true,
          message: "xasdased",
          date: "xxxxx",
        },
        {
          fromId: "3",
          fromName: "xx",
          message: "xasdased",
          fromVIP: false,
          date: "xxxxx",
        },
        {
          fromId: "2",
          fromName: "xx",
          message: "xasdased",
          fromVIP: false,
          date: "xxxxx",
        },
        {
          fromId: "888",
          fromName: "xx",
          message: "xasdased",
          fromVIP: false,
          date: "xxxxx",
        },
        {
          fromId: "3456",
          fromName: "xx",
          message: "xasdased",
          fromVIP: false,
          date: "xxxxx",
        },
        {
          fromId: "23523",
          fromName: "xx",
          message: "xasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdasedxasdased",
          fromVIP: false,
          date: "xxxxx",
        },
        {
          fromId: "45475",
          fromName: "xx",
          message: "xasdased",
          date: "xxxxx",
          fromVIP: false,
        },

      ],
      creator: "qwd", // 房间创建者
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

    },
  },
  created () {
    
  },
  mounted () {
    setCssVarible(this.userTheme, this);
    document.title = "聊天室：" + this.roomName;
    // 开始的时候记得根据聊天室id获取members

    // 绑定回车发消息
    window.addEventListener("keyup", (e) => {
      if(e.code === "Enter"){
        this.sendMessage();
      }
    });
  },

  onUnmounted(){
    window.onkeyup = null;
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
