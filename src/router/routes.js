const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    name: "index",
    path: "/index",
    component: () => import("@/view/index"),
    meta: {title: "主页"},
    children: []
  },
  
  {
    name: "login",
    path: "/login",
    meta: {title: "登入"},
    component : () => import("@/view/login")
  },
  {
    name: "me",
    path: "/me/:id",
    meta: {title: "个人中心"},
    component : () => import("@/view/meCenter")
  },
  {
    name: "chatroom",
    path: "/chatroom/:id/:name",
    meta: {title: "聊天室"},
    component : () => import("@/view/chatRoom")
  },
  {
    name: "manage",
    path: "/manage",
    meta: {title: "管理网站"},
    component : () => import("@/view/manage")
  },
  {
    name: "404",
    path: "/404",
    meta: {title: "页面不见了"},
    component: () => import("@/view/404")
  },
  //写在最底部，实现找不到路径跳转到404页面
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
];

export default routes;