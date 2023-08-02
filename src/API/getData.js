import request from "../config/axios.config";
const isDEV = true;

// 管理页面也会用这个得
export function getUserList(params) { //post用参数data
  return request({
      url: `${isDEV?'/api':''}/userList`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

// 主要在个人中心用这个
export function getUserData(params) { //post用参数data
  return request({
      url: `${isDEV?'/api':''}/getUserData`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

// 登录后根据id获取信息
export function getMyData(params) { //post用参数data
  return request({
      url: `${isDEV?'/api':''}/getMyData`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

export function getIndexMessageList(params) { //post用参数data
  return request({
      url: `${isDEV?'/api':''}/getIndexMessageList`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

export function createIndexMessage(data) { //post用参数data
  return request({
      url: `${isDEV?'/api':''}/createIndexMessage`, //注意请求路径不要写全的 写成这样即可
      method: "POST",
      data
  });
}

// 个人中心
export function getUserMessageList(params) { //post用参数data
  return request({
      url: `${isDEV?'/api':''}/getUserMessageList`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

// 个人中心
export function createUserMessage(data) { //post用参数data
  return request({
      url: `${isDEV?'/api':''}/createUserMessage`, //注意请求路径不要写全的 写成这样即可
      method: "POST",
      data
  });
}
