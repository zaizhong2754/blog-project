import request from '@/lib/request'

interface Response<T> {
  code: number
  data?: T
  msg?: string
}

interface LoginDto {
  userName: string
  password: string
  captcha: string
  codeKey: string
}

interface LoginVo {
  token: string
  userInfo: {
    avatar: string
    email: string
    id: number
    nickName: string
    sex: string
  }
}

export const login = ({ userName, password, captcha, codeKey }: LoginDto) => {
  return request.post<LoginDto, Response<LoginVo>>('/client/user/login', {
    userName,
    password,
    captcha,
    codeKey
  })
}

export const logout = () => {
  return request.post<null, Response<null>>('/client/user/logout')
}

export const info = () => {
  return request.get('/client/user/info')
}

export const validateCode = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client/user/validate`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      cache: 'no-store'
    }
  )
  return res.json()
}

export const register = async () => {}
