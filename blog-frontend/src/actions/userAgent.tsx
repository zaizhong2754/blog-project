'use client'

import { UAParser } from 'ua-parser-js'

export const getUserAgent = async () => {
  const parser = new UAParser()

  const userAgent = parser.getResult()
  if (userAgent.os.name === 'Windows' && userAgent.os.version === '10') {
    const flag = await isWindows11()
    if (flag) {
      userAgent.os.version = '11'
    }
  }

  return userAgent
}

const isWindows11 = async () => {
  try {
    // @ts-ignore
    const ua = await navigator.userAgentData.getHighEntropyValues([
      'platformVersion'
    ])

    // @ts-ignore
    if (navigator.userAgentData.platform === 'Windows') {
      const majorPlatformVersion = parseInt(ua.platformVersion.split('.')[0])
      if (majorPlatformVersion >= 13) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}
