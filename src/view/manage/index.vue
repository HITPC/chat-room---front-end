<template>
  <div class="container">
    <div style="width: 80%; height: 30%; background-color: #fff;">
      <el-table :data="userList" style="width: 100%" :stripe="true">
        <el-table-column prop="id" label="用户id" width="380" />
        <el-table-column prop="name" label="用户名" width="180" />
        <el-table-column prop="theme" label="用户主题" width="180" />
        <el-table-column prop="trueName" label="激活码明文" width="180"/>
        <el-table-column prop="isVIP" label="是否为vip" width="180"/>
        <el-table-column prop="stop" label="被禁言？" width="180"/>
        <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="stop(scope.row)">禁言</el-button>
          <el-button link type="primary" size="small" @click="noStop(scope.row)">解除禁言</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <div style="display: flex; justify-content: center; align-items: center; width: 80%; height: 30%; background-color: #fff;">
      <el-input v-model="inviteTrueName" placeholder="输入激活码明文" style="width: 30%;"/> 
      <el-input v-model="inviteCode" placeholder="按按钮取邀请码" style="width: 40%; margin-left: 5px;"/> 
      <el-button type="primary" @click="getInviteCode" style="margin-left: 2%;">获取邀请码</el-button>
    </div>
    <div style="display: flex; justify-content: center; align-items: center; width: 80%; height: 30%; background-color: #fff;">
      <el-input v-model="vipCode" placeholder="按按钮取VIP激活码" style="width: 80%;"/> 
      <el-button type="primary" @click="getVIPCode" style="margin-left: 2%;">获取激活码</el-button>
    </div>
  </div>
</template>

<script>
import { getVIPCode, getInviteCode } from '@/API/doOperations';
import { getUserList } from '@/API/getData';
import { ElMessage } from 'element-plus';
import themeList from '@/data/themeList';

export default {
  name: 'ManagePage',
  props: {},
  data () {
    return {
      userList: [],
      inviteCode: "",
      vipCode: "",
      inviteTrueName: "",
    }
  },
  components: {
    
  },
  computed: {
    
  },
  watch: {
    
  },
  methods: {
    stop(row){
      console.log(row);
      ElMessage.error("未开放此功能！");
    },
    noStop(row){
      console.log(row);
      ElMessage.error("未开放此功能！");
    },
    getInviteCode(){
      getInviteCode({realName: this.inviteTrueName}).then((data)=>{
        if(data.code == 200){
          this.inviteCode = data.data;
          ElMessage.success("获取成功！");
        }else if(data.code == 204){
          ElMessage.error("明文未注册！");
        }else if(data.code == 208){
          ElMessage.error("该明文已被使用！");
        }
      }).catch((error)=>{
        console.log(error);
        ElMessage.error("获取失败！");
      });
    },
    getVIPCode(){
      getVIPCode().then((data)=>{
        this.vipCode = data.data;
        ElMessage.success("获取成功！");
      }).catch((error)=>{
        console.log(error);
        ElMessage.error("获取失败！");
      });
    },
    getUserList(){
      getUserList().then((data)=>{
        if(data.code == 200){
          data.data.forEach((item)=>{
            this.userList.push({  
              id: item.id,
              name: item.username,
              theme: themeList[item.userTheme-1].name,
              isVIP: item.userVIP?'是':'否',
              trueName: item.userTrueName,
              stop: "无",
            });
          });
        }
      }).catch((error)=>{
        console.log(error);
        ElMessage.error("获取用户列表失败!");
      });
    },
  },
  created () {
    
  },
  mounted () {
    this.getUserList();
  },
}
</script>

<style scoped>
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    align-content: space-around;
    width: 100%;
    height: 100%;
    background-color: #CDD0D6;
  }
</style>
