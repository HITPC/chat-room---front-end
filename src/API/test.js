import request from "../config/axios.config";

export function nomalNews() { //当然，如果是post，应该添加参数形参啥的
  return request({
      url: "/api/toutiao/index?type=top&key=3dc86b09a2ee2477a5baa80ee70fcdf5", //注意请求路径不要写全的 写成这样即可
      method: "get",
  });
}

export function getNews(params) { //get用参数params
  return request({
      url: "/api/toutiao/index?type=top&key=3dc86b09a2ee2477a5baa80ee70fcdf5", //注意请求路径不要写全的 写成这样即可
      method: "get",
      params
  });
}

export function postNews(data) { //post用参数data
  return request({
      url: "/api/toutiao/index?type=top&key=3dc86b09a2ee2477a5baa80ee70fcdf5", //注意请求路径不要写全的 写成这样即可
      method: "post",
      data
  });
}