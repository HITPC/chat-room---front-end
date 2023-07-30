import axios from "axios";

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
// 创建并配置一个新的axios
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // 这里指所有接口请求的“请求地址前缀”，完整请求地址 = 请求地址前缀 + 接口后缀，即 url = baseURL + request url
    timeout: 60000, // 请求超时时间 毫秒
    withCredentials: true,   // 异步请求时是否携带cookie
    // headers: {   // 设置后端需要的传参类型，如果后端不要求，这没必要设置
    //     "Content-Type": "application/json",
    //     token: "your token",
    //     "X-Requested-With": "XMLHttpRequest",
    // },
});

// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么。。。
        // 比如配置请求token（如果需要的话）
        // const tokenInfo = store.state.account.tokenInfo;
        // if (tokenInfo && tokenInfo.tokenName) {
        //     config.headers[tokenInfo.tokenName] = tokenInfo.tokenValue; //配置请求token
        // }
        // 配置请求头，以后每一个请求发出去都会携带请求头
        const token = cookieObj.token || "";
        if(token !== ""){
            config.headers["token"] = token;
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.code == 401) {
            //登录拦截：接口需要登录，但用户未登录
            // store.commit("account/setUserInfo", ""); //移除用户信息
            // if(confirm("登录失效，是否重新登录")){
            //     console.log("确定")
            // }else{
            //     console.log("取消")
            // }
            return Promise.reject(new Error(res.msg || "Error"));
        } else {
            //其他情况则返回结果，对应状态code需在具体请求函数里判断
            return res;
        }
    },
    (error) => {
        // alert(error.msg || "服务器开小差了呢，请稍后再试~");
        return Promise.reject(error);
    }
);

export default service;