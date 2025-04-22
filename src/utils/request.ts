// src/utils/request.js
import axios from 'axios'
//TODO  整理 axios 封装 https://blog.csdn.net/qq_16242613/article/details/145646582
import { ElLoading, ElMessage } from 'element-plus'

// 创建自定义实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 从环境变量读取基础地址
  timeout: 15000 // 请求超时时间
})

let loadingInstance = null; // 存储loading实例

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求前做些什么
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    loadingInstance = ElLoading.service({ fullscreen: true })
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    
    // 自定义状态码验证（根据后端约定）
    if (res.code !== 200) {
      ElMessage.error(res.message || 'Error')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
    loadingInstance.close()
  },
  error => {
    // 处理HTTP网络错误
    let message = ''
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          message = "认证失败，请重新登录"
          break
        case 403:
          message = "当前操作没有权限"
          break
        case 404:
          message = "资源不存在"
          break
        default:
          message = "网络异常，请稍后重试"
      }
    }
    loadingInstance.close()
    return Promise.reject(error)
  }
)

/**
 * 通用请求方法
 * @param {Object} options 请求配置
 */
function request(options) {
  return service({
    method: options.method || 'GET',
    url: options.url,
    data: options.data,
    params: options.params,
    ...options
  })
}

// 封装GET/POST快捷方法
export function get(url, params, options = {}) {
  return request({
    url,
    params,
    method: 'GET',
    ...options
  })
}

export function post(url, data, options = {}) {
  return request({
    url,
    data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  })
}

