import fly from 'flyio'
import qs from 'qs';
import { setToken, getToken, TokenKey } from './auth';
let baseURL = process.env.BASE_URL;


let service = new fly()


service.config.timeout = 50000;
service.config.baseURL = baseURL;
service.config.withCredentials = true;




service.interceptors.request.use(config => { // request拦截器
  if (config.method === "POST") config.body = qs.stringify(config.body);
  if (getToken()) config.headers[TokenKey] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  return config
}, error => {
  Promise.reject(error)
});


service.interceptors.response.use( // respone拦截器
  response => {
    return response.data;
  },
  error => {

    if (!error.response) {// 断网了
      return;
    }
    switch (error.response.status) {
      case 401:
        break;
      case 403:
        break;
    }
    return Promise.reject(error)
  }
);
export default service
