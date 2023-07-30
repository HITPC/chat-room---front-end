<template>
  <div class="container-404">
    <div class="text-404">
      <p style="font-size: 36px; font-weight: 600;">不好意思😥，页面不见了！</p>
      <p style="margin-top: 120px; font-size: 24px; font-weight: 600;">请点击下方按钮返回↓</p>
      <button class="back-btn-404" @click="goBack">返回</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {}
  },
  methods: {
    goBack(){
      this.$router.back();
    }
  },
}
</script>

<style scoped>
  .container-404{
    height: 100vh;
    /* background-image: linear-gradient(to bottom right, #00b09b, #96c93d) */
    /* background-image: linear-gradient(to bottom right, #78ffd6, #396afc); */
    background-image: linear-gradient(to bottom right, #c9d6ff, #e2d6ff);
    display: flex;
    justify-content: center;
  }

  .text-404{
    margin-top: 100px;
  }

  .text-404 p{
    text-align: center;
  }

  .back-btn-404{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;
    border-radius: 50px;
    width: 200px;
    height: 50px;
    cursor: pointer;
    background-color: #396afc;
    color: #fff;
    font-size: 20px;
    transition: opacity .2s;
  }

  .back-btn-404:hover{
    opacity: 0.8;
  }
</style>
