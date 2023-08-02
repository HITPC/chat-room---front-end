import request from "../config/axios.config";
const isDEV = true;

export function Login(data) { //post用参数data
  return request({
      url: `${isDEV?'/api':''}/login`, //注意请求路径不要写全的 写成这样即可
      method: "POST",
      data
  });
}

export function Register(data) { //post用参数data
  return request({
      url: `${isDEV?'/api':''}/register`, //注意请求路径不要写全的 写成这样即可
      method: "POST",
      data
  });
}