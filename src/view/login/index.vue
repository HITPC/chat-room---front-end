<template>
  <div class="login-container" ref="container">
    <div class="login-input-container" ref="login">
      <h1 class="login-title">登录</h1>
      <input type="text" v-model="username" placeholder="请输入用户名(你的昵称)" class="input-underline-darkBG"/>
      <input type="password" v-model="password" placeholder="请输入密码" class="input-underline-darkBG"/>
      <button class="button-empty-large-dark" @click="doLogin">登录</button>
      <button class="button-empty-large-dark" @click="reverse('register')">去注册?</button>
    </div>
    <div class="login-input-container hide" ref="register">
      <h1 class="login-title">注册</h1>
      <input type="text" v-model="registerUsername" placeholder="请输入用户名(这以后就是你的昵称了，可以是中文)" class="input-underline-darkBG"/>
      <input type="password" v-model="registerPassword" placeholder="请输入密码" class="input-underline-darkBG"/>
      <input type="password" v-model="repeateRegisterPassword" placeholder="请再次输入密码" class="input-underline-darkBG"/>
      <input type="text" v-model="inviteCode" placeholder="请输入邀请码" class="input-underline-darkBG"/>
      <button class="button-empty-large-dark" @click="doRegister">注册</button>
      <button class="button-empty-large-dark" @click="reverse('login')">去登录?</button>
    </div>
  </div>
  <div class="wait" v-show="isWait">
    <el-icon class="is-loading" size="32" color="white"><Loading /></el-icon>
    <span style="font-size: 32px; color: white; padding-left: 8px; font-family: 'FZShuTi;">Please Wait...</span>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
// import useUserStore from "../../store/useUserStore";
// 导入my-css
import "@/style/my-css.css";
import { Login, Register } from "@/API/loginAndRegister";

export default {
  name: 'LoginPage',
  props: {},
  data() {
    return {
      username: "",
      password: "",
      registerUsername: "",
      registerPassword: "",
      repeateRegisterPassword: "",
      inviteCode: "",
      isWait: false,
    };
  },
  computed: {},
  mounted() {

  },
  methods: {
    doRegister() {
      if (this.registerUsername === "" || this.registerPassword === "") {
        ElMessage.error("用户名或密码为空！");
        return;
      }
      if (this.registerPassword !== this.repeateRegisterPassword) {
        ElMessage.error("两次输入的密码不一致！");
        return;
      }
      if(this.inviteCode === ""){
        ElMessage.error("请输入邀请码！");
        return;
      }
      // 发网络请求
      Register({
        username: this.registerUsername,
        password: this.registerPassword,
        inviteCode: this.inviteCode,
      }).then((data)=>{
        if(data.code == 200){
          ElMessage.success("注册成功!");
          this.reverse("login");
        }else if(data.code == 201){
          ElMessage.error("账户名已存在，请更换账户名！");
        }else if(data.code == 205){
          ElMessage.error("邀请码对应明文已被使用！");
        }else if(data.code == 204){
          ElMessage.error("邀请码错误！");
        }
      }).catch((error)=>{  
        ElMessage.error("注册失败！");
        console.log(error);
      });  
    },
    doLogin() {
      if (this.username === "" || this.password === "") {
        ElMessage.error("用户名或密码为空！");
        return;
      }
      // 发送网络请求
      Login({
        username: this.username,
        password: this.password
      }).then((data)=>{
        if(data.code == 200){
          ElMessage.success("登录成功!");
          this.$store.commit("setToken", data.data);
          this.$router.push("/index");
        }else if(data.code == 202){
          ElMessage.error("账户名或密码错误！");
        }
      }).catch((error)=>{
        console.log(error);
        ElMessage.error("登录失败。");
      });
    },
    reverse(toWhere) {
      this.isWait = true;
      this.username = this.password 
        = this.registerUsername = this.registerPassword 
        = this.repeateRegisterPassword = this.inviteCode = "";
      if (toWhere === "login") {
        this.$refs["register"].classList.add("hide");
        this.$refs["container"].classList.add("blur");
        setTimeout(()=>{
          this.$refs["login"].classList.remove("hide");
          this.$refs["container"].classList.remove("blur");
          this.isWait = false;
        }, 800);
      } else {
        this.$refs["login"].classList.add("hide");
        this.$refs["container"].classList.add("blur");
        setTimeout(()=>{
          this.$refs["register"].classList.remove("hide");
          this.$refs["container"].classList.remove("blur");
          this.isWait = false;
        }, 800);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: black;
}

.login-input-container {
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  flex-wrap: wrap;
  width: 50%;
  height: 60%;
  animation: RGB-SHADOW 6s infinite linear;
  border-radius: 15px;
}

.login-title {
  color: white;
  font-size: 36px;
  flex-basis: 100%;
  text-align: center;
}

.hide {
  display: none;
}

.blur {
  animation: blur .8s ease-in-out;
}

.wait{
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}

</style>
