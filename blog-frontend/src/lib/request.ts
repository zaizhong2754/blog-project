'use client'

import { redirectToLogin } from '@/actions/redirect'
import axios from 'axios'
import { hasCookie, getCookie, deleteCookie } from 'cookies-next'
import { toast } from 'sonner'
import storage from 'store'

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000
})

request.interceptors.request.use(
  config => {
    console.log('请求了：')

    console.log(getCookie('clientToken'))

    // 自动添加token到请求头
    if (hasCookie('clientToken')) {
      config.headers['clientToken'] = getCookie('clientToken')
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('响应到错误：')

    console.log(error)
    // 请求失败，判断错误码是否为401
    if (error.response.status === 401) {
      toast.error('请先登录')
      storage.remove('userInfo')
      deleteCookie('clientToken')
      redirectToLogin()
    }
    return Promise.reject(error)
  }
)

export default request
