<template>
  <div class="container">
    <div style="width: 80%;">
      <el-table :data="userList" style="width: 100%" :stripe="true">
        <el-table-column prop="id" label="用户id" width="380" />
        <el-table-column prop="name" label="用户名" width="180" />
        <el-table-column prop="theme" label="用户主题" width="180" />
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
    <div style="width: 80%;">
      <el-input v-model="inviteCode" placeholder="按按钮取邀请码" style="width: 80%;"/> 
      <el-button type="primary" @click="getInviteCode" style="margin-left: 2%;">获取邀请码</el-button>
    </div>
    <div style="width: 80%;">
      <el-input v-model="vipCode" placeholder="按按钮取VIP激活码" style="width: 80%;"/> 
      <el-button type="primary" @click="getVIPCode" style="margin-left: 2%;">获取激活码</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManagePage',
  props: {},
  data () {
    return {
      userList: [
        {
          id: 1,
          name: "ss",
          theme: "泽地木屋",
          isVIP: "是",
          stop: "否",
        },
        {
          id: 1,
          name: "ss",
          theme: "泽地木屋",
          isVIP: "是",
          stop: "否",
        },
        {
          id: 1,
          name: "ss",
          theme: "泽地木屋",
          isVIP: "是",
          stop: "否",
        },
        {
          id: 1,
          name: "ss",
          theme: "泽地木屋",
          isVIP: "是",
          stop: "否",
        },
      ],
      inviteCode: "",
      vipCode: "",
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
    },
    noStop(row){
      console.log(row);
    },
    getInviteCode(){
      this.inviteCode = "asd";
    },
    getVIPCode(){
      this.vipCode = "werf";
    },
  },
  created () {
    
  },
  mounted () {
    
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
