import request from '@/lib/request'

interface Response<T> {
  code: number
  data?: T
  msg?: string
}

/**
 * @member id 主键
 * @member fileName 文件名
 * @member url 文件地址
 * @member bucketName 存储桶名
 * @member status 文件状态 (0代表正式，1代表临时)
 */
interface UploadImageVo {
  id: number
  fileName: string
  url: string
  bucketName: string
  status: '0' | '1'
}

export const uploadImage = async (formData: FormData) => {
  return request.post<FormData, Response<UploadImageVo>>(
    '/client/image/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}
