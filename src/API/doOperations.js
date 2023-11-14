import request from "../config/axios.config";


export function getInviteCode(params) { //post用参数data
  return request({
      url: `/api/getInviteCode`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

export function getVIPCode(params) { //post用参数data
  return request({
      url: `/api/getVIPCode`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

export function enableVIP(data) { //post用参数data
  return request({
      url: `/api/enableVIP`, //注意请求路径不要写全的 写成这样即可
      method: "POST",
      data
  });
}

export function changeTheme(data) { //post用参数data
  return request({
      url: `/api/changeTheme`, //注意请求路径不要写全的 写成这样即可
      method: "POST",
      data
  });
}

