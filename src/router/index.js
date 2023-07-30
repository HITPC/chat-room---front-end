import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

// 是不是还在开发中，开发中使用localstorage进行路由守卫
let INDEV = true;

const router = createRouter({
  history: createWebHistory(),
  routes
});

//配置白名单，名单中的路径不需要守卫
const whiteRouter = ["/login"];

if(INDEV){
  router.beforeEach((to, from, next)=>{
    if(whiteRouter.indexOf(to.path) === -1){//要去的不是白名单中的路由 需要鉴权
      let token = localStorage.getItem("token");
      if(token){
        next();
      }else{
        next("/login");
      }
    }else{
      next();
    }
  });
}else{
  //配置前置路由守卫
  router.beforeEach((to, from, next)=>{
    if(whiteRouter.indexOf(to.path) === -1){//要去的不是白名单中的路由 需要鉴权
      // 下面的没处理掉重名cookie变数组
      let cookies = document.cookie;
      let temp = cookies.split(";");
      let cookieObj = {};
      temp.forEach((item)=>{
        let tArr = item.split("=");
        for(let i = 0; i < tArr.length-1; ++i){
          if(tArr[i].charAt(0) === " "){
            tArr[i] = tArr[i].slice(1);
          }
          cookieObj[tArr[i]] = tArr[i+1];
        }
      });
      if(cookieObj.token && cookieObj.token !== ""){
        next();
      }else{
        next("/login");
      }
    }else{
      next();
    }
  });
}

//后置路由守卫实现标题切换 
router.afterEach((to) => { 
  document.title = to.meta.title;
});

export default router;