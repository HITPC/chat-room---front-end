import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from './router';
//引入全局样式
import "./style/index.css";

//引入element-plus
import ElementPlus from "element-plus";
//引入element-plusu样式
import "element-plus/theme-chalk/index.css";
//引入element-plus所用的local
import locale from "element-plus/lib/locale/lang/zh-cn";
//导入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入vuex
import store from './store';

// 全局导入事件总线
import mitt from 'mitt';

var app = createApp(App);
//全局注册字体图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(ElementPlus, { locale }).use(store).mount('#app');//注意use要在mount之前

// 全局注册
const bus = mitt();
app.config.globalProperties.$bus = bus;