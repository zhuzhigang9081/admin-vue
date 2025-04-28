import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { ElMessage, ElLoading } from "element-plus";


const loadingInstance = ElLoading.service;
let requestCount = 0;
const showLoading = () => {
  requestCount++;
  if (requestCount === 1) loadingInstance();
};
const closeLoading = () => {
  requestCount--;
  if (requestCount === 0) loadingInstance().close();
};

const service: AxiosInstance = axios.create({
  method: "get",
  baseURL: import.meta.env.VITE_APP_API,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },

  timeout: 10000,
});
//请求拦截

declare module "axios" {
  interface InternalAxiosRequestConfig<D = any, T = any> {
    loading?: boolean;
    isToken?: boolean;
  }
}
declare module "axios" {
  interface AxiosRequestConfig<D = any> {
    loading?: boolean;
    isToken?: boolean;
  }
}

const requestMap = new Map();
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const controller = new AbortController();
    const key = config.data + config.url;
    config.signal = controller.signal;
    if (requestMap.has(key)) {
      requestMap.get(key).abort();
      requestMap.delete(key);
    } else {
      requestMap.set(key, controller);
    }

    const { loading = true, isToken = true } = config;

    if (loading) showLoading();
    if (localStorage.getItem("token") && !isToken) {
      config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token"); // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    return config;
  },
  (error) => {
    console.log(error);
  }
);

service.interceptors.response.use(
  (res: AxiosResponse<any, any>) => {
    const { data, config } = res;

    const { loading = true } = config;
    if (loading) closeLoading();

    if (data.code != 200) {
      ElMessage({
        message: data.describe,
        type: "error",
      });
      if (data.code === 401) {
        //登录状态已过期.处理路由重定向
        console.log("loginOut");
      }
      throw new Error(data.describe);
    }
    return data;
  },
  (error) => {
    closeLoading();
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    ElMessage({
      message: message,
      type: "error",
    });
    return Promise.reject(error);
  }
);
export default service;