export default class myWebSocket {
  constructor(url) { 
    this.url = url || 'ws://ashuai.work:10000/mySocketUrl' // 指定默认ws的地址
    this.socket = null // 实例化的ws对象
    this.messageArr = [] // 接收服务端推送的消息数组
   }

  createFn() {
      this.socket = new WebSocket(this.url) // 生成WebSocket实例化对象

      // 使用WebSocket的原生方法onopen去连接开启
      this.socket.onopen = function (e) {
        console.log(e);
          console.log('连接成功')
      }
      // 使用WebSocket的原生方法onerror去兜错一下
      this.socket.onerror = (e) => {
          console.error('连接错误', e)
          this.close()
      }
      // 使用WebSocket的原生方法onmessage与服务器关联
      this.socket.onmessage = (wsObj) => {
          this.messageArr.push(wsObj.data)
      }
  }
  sendFn(msg) {
      // 使用WebSocket的原生方法send去发消息
      this.socket.send(msg)
  }
  closeFn() {
      // 使用WebSocket的原生方法close去关闭已经开启的WebSocket服务
      this.socket.close() 
      this.socket = null // 回归默认值
      this.messageArr = [] // 清空消息数组
  }
}