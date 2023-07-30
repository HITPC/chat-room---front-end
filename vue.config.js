const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
  //   host: 'localhost',
  //   port: "8080",
  //   open: true,
    proxy: {
      '^/api': {
          target: 'http://localhost:3000/',//接口的前缀(后端地址)
          // ws: true,//代理websocked
          changeOrigin: true,//虚拟的站点需要更管origin
          pathRewrite:{
              '^/api':''//重写路径
          }
      }
    }
  }
})