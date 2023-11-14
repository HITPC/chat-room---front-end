import request from "../config/axios.config";


export function Login(data) { //post用参数data
  return request({
      url: `/api/login`, //注意请求路径不要写全的 写成这样即可
      method: "POST",
      data
  });
}

export function Register(data) { //post用参数data
  return request({
      url: `/api/register`, //注意请求路径不要写全的 写成这样即可
      method: "POST",
      data
  });
}