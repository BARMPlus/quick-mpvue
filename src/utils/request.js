import Fly from 'flyio'
import { getToken, TokenKey } from './auth'
let baseURL = process.env.BASE_URL

let service = new Fly()

service.config.timeout = 50000
service.config.baseURL = baseURL
service.config.withCredentials = true

service.interceptors.request.use(config => { // request拦截器
  if (getToken()) config.headers[TokenKey] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['X-Applet-Version'] = '1.0.0'
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use( // respone拦截器
  response => {
    return response.data
  },
  error => {
    if (!error.response) { // 断网了
      return
    }
    switch (error.response.status) {
      case 401:
        break
      case 403:
        break
    }
    return Promise.reject(error)
  }
)
export default service
