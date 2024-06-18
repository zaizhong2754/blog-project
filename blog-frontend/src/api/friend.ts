import request from '@/lib/request'

interface Response<T> {
  code: number
  data?: T
  msg?: string
}

/**
 * @member name
 * @member logo
 * @member description 简介
 * @member address 地址
 */
interface SendLinkDto {
  name: string
  logo: string
  description: string
  address: string
}

export const sendLink = async ({
  name,
  logo,
  description,
  address
}: SendLinkDto) => {
  return request.post<SendLinkDto, Response<null>>('/client/link/send', {
    name,
    logo,
    description,
    address
  })
}
