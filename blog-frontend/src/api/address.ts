'use client'

export const getAddress = async () => {
  const res = await fetch(
    `/baidu-ip-server?coor=${process.env.NEXT_PUBLIC_BAIDU_IP_SERVER_PARAMS_COOR}&ak=${process.env.NEXT_PUBLIC_BAIDU_IP_SERVER_PARAMS_AK}`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      next: { revalidate: 3600 * 24 }
    }
  )
  return res.json()
}

export const getNowWeather = async (location: string, lang: string = 'cn') => {
  const res = await fetch(
    `/hefeng-weather-server/weather/now?location=${location}&key=${process.env.NEXT_PUBLIC_HEFENG_WEATHER_SERVER_PARAMS_KEY}&lang=${lang}`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      next: { revalidate: 3600 }
    }
  )
  return res.json()
}

export const getNowSun = async (location: string, date: string) => {
  const res = await fetch(
    `/hefeng-weather-server/astronomy/sun?location=${location}&key=${process.env.NEXT_PUBLIC_HEFENG_WEATHER_SERVER_PARAMS_KEY}&date=${date}`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      next: { revalidate: 3600 * 24 }
    }
  )
  return res.json()
}

export const getWeekWeather = async (location: string, lang: string = 'cn') => {
  const res = await fetch(
    `/hefeng-weather-server/grid-weather/7d?location=${location}&key=${process.env.NEXT_PUBLIC_HEFENG_WEATHER_SERVER_PARAMS_KEY}&lang=${lang}`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      next: { revalidate: 3600 }
    }
  )
  return res.json()
}
