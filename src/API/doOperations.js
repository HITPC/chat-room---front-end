import request from "../config/axios.config";
const isDEV = true;

export function getInviteCode(params) { //post用参数data
  return request({
      url: `${isDEV?'/api':''}/getInviteCode`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

export function getVIPCode(params) { //post用参数data
  return request({
      url: `${isDEV?'/api':''}/getVIPCode`, //注意请求路径不要写全的 写成这样即可
      method: "GET",
      params
  });
}

export function enableVIP(data) { //post用参数data
  return request({
      url: `${isDEV?'/api':''}/enableVIP`, //注意请求路径不要写全的 写成这样即可
      method: "POST",
      data
  });
}

export function changeTheme(data) { //post用参数data
  return request({
      url: `${isDEV?'/api':''}/changeTheme`, //注意请求路径不要写全的 写成这样即可
      method: "POST",
      data
  });
}

