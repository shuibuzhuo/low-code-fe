import axios from "axios";
import { message } from 'ant-design-vue';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

service.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  const { code, data, msg } = response.data

  if (code === 200) {
    return data
  } else {
    message.warn(msg)
    return Promise.reject(msg)
  }
}, (error) => {
  return Promise.reject(error)
})

export default service
