import request from "../config/axios.config";


// 管理页面也会用这个得
export function getUserList(params) { //post用参数data
  return request({
      url: `/api/userList`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

// 主要在个人中心用这个
export function getUserData(params) { //post用参数data
  return request({
      url: `/api/getUserData`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

// 登录后根据id获取信息
export function getMyData(params) { //post用参数data
  return request({
      url: `/api/getMyData`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

export function getIndexMessageList(params) { //post用参数data
  return request({
      url: `/api/getIndexMessageList`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

export function createIndexMessage(data) { //post用参数data
  return request({
      url: `/api/createIndexMessage`, //注意请求路径不要写全的 写成这样即可
      method: "POST",
      data
  });
}

// 个人中心
export function getUserMessageList(params) { //post用参数data
  return request({
      url: `/api/getUserMessageList`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

// 个人中心
export function createUserMessage(data) { //post用参数data
  return request({
      url: `/api/createUserMessage`, //注意请求路径不要写全的 写成这样即可
      method: "POST",
      data
  });
}

// 房间列表
export function getRoomList(params) { //post用参数data
  return request({
      url: `/api/roomList`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

// 创建房间
export function createRoom(data) { //post用参数data
  return request({
      url: `/api/createRoom`, //注意请求路径不要写全的 写成这样即可
      method: "POST",
      data
  });
}

// 房间信息
export function getRoomData(params) { //post用参数data
  return request({
      url: `/api/roomData`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

// 房间中人的列表
export function getRoomUserList(params) { //post用参数data
  return request({
      url: `/api/roomUserList`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

// 房间中的消息列表
export function getMessageList(params) { //post用参数data
  return request({
      url: `/api/messageList`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

// 发送消息
export function sendMessage(data) { //post用参数data
  return request({
      url: `/api/sendMessage`, //注意请求路径不要写全的 写成这样即可
      method: "POST",
      data
  });
}

// 进入房间
export function inRoom(params) { //post用参数data
  return request({
      url: `/api/inRoom`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

// // 离开房间
// export function leaveRoom(params) { //post用参数data
//   return request({
//       url: `/api/leaveRoom`, //注意请求路径不要写全的 写成这样即可
//       method: "GET",
//       params
//   });
// }