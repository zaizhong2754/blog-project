'use client'

import {
  getAddress,
  getNowSun,
  getNowWeather,
  getWeekWeather
} from '@/api/address'
import { useEffect, useState } from 'react'
import styles from './Weather.module.css'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import WeatherIcon from './WeatherIcon'
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.locale('zh-cn')

const Weather = () => {
  // 24小时 不同的7种天空颜色
  let hours = new Date().getHours()
  let skY = ['a5adf6', '1ab6ff', '028fff', 'ffa365', '141852', '000', '26282c']
  let skX = ['9bc5ed', '94dbf8', '1ab6ff', 'fca739', '635df7', '444', '26282c']

  let hX = '#'
  let color1 = ''
  let color2 = ''

  function skyCol(f: number) {
    color1 = hX + skY[f]
    color2 = hX + skX[f]
  }

  if (hours > 4 && hours < 7) {
    // 5-6am - early morning
    skyCol(0)
  } else if (hours > 6 && hours < 9) {
    // 7-8 am - morning
    skyCol(1)
  } else if (hours > 8 && hours < 17) {
    // 9am-4pm day - noon
    skyCol(2)
  } else if (hours > 16 && hours < 19) {
    // 5pm-6pm
    skyCol(3)
  } else if (hours > 19 && hours < 22) {
    // 8pm-9pm
    skyCol(4)
  } else if (hours > 21 || hours < 5) {
    // 10pm-4am
    skyCol(5)
  } else {
    skyCol(6)
  }

  // {/* sunny 太阳 fine 太阳加云  cloudy 单云 cloudys 多云  rainy 下雨 stormy 雷雨 thunder 雷 starry 月亮  snowy 下雪 breeze 微风  fog 雾  haze 薄雾*/}

  const animCode = (code: number) => {
    const anim = {
      sunny: [100],
      fine: [101, 102, 103],
      cloudys: [104, 151, 152, 153],
      rainy: [
        300, 301, 305, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317,
        318, 350, 351, 1035, 1038
      ],
      stormy: [302, 303, 304, 2024],
      thunder: [1014, 1043],
      starry: [150],
      snowy: [
        400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 456, 457, 499
      ]
    }

    let name = null
    for (let key in anim) {
      if (anim[key as keyof typeof anim].includes(code * 1)) {
        name = key
      }
    }
    return name
  }

  const [address, setAddress] = useState('')
  const [location, setLocation] = useState({
    x: '',
    y: ''
  })
  const [nowWeather, setNowWeather] = useState({
    obsTime: '', // 数据观测时间
    temp: '', // 温度，默认单位：摄氏度
    feelsLike: '', // 体感温度，默认单位：摄氏度
    icon: '', // 天气状况的图标代码
    text: '', // 天气状况的文字描述，包括阴晴雨雪等天气状态的描述
    windDir: '', // 风向
    windScale: '', // 风力等级
    humidity: '', // 相对湿度，百分比数值
    precip: '', // 当前小时累计降水量，默认单位：毫米
    pressure: '', // 大气压强，默认单位：百帕
    vis: '' // 能见度，默认单位：公里
  })
  const [nowSun, setNowSun] = useState({
    sunrise: '', // 日出时间
    sunset: '' // 日落时间
  })
  const [todayWeather, setTodayWeather] = useState({
    tempMax: '', // 预报当天最高温度
    tempMin: '', // 预报当天最低温度
    humidity: '' // 相对湿度，百分比数值
  })
  const [weekWeather, setWeekWeather] = useState<
    Array<{
      fxDate: string // 预报日期
      week: string // 星期几
      tempMax: string // 预报当天最高温度
      tempMin: string // 预报当天最低温度
      icon: string // 天气状况的图标代码
      text: string // 天气状况的文字描述，包括阴晴雨雪等天气状态的描述
    }>
  >([])

  const setWeather = async () => {
    const res = await getAddress()
    console.log('address', res)

    setLocation(res)
    if (res.status === 0) {
      const address = res.content.address_detail.city || res.content.address
      const location = { x: res.content.point.x, y: res.content.point.y }
      setAddress(address)
      setLocation(location)

      await getWeather(`${location.x},${location.y}`)
    }
  }

  const getWeather = async (address: string) => {
    const [res1, res2, res3] = await Promise.allSettled([
      getNowWeather(address),
      getNowSun(address, dayjs().format('YYYYMMDD')),
      getWeekWeather(address)
    ])
    console.log(res1, res2, res3)
    if (res1.status === 'fulfilled' && res1.value.code === '200') {
      const { now } = res1.value
      setNowWeather({
        obsTime: dayjs(now.obsTime).fromNow(),
        temp: now.temp,
        feelsLike: now.feelsLike,
        icon: now.icon,
        text: now.text,
        windDir: now.windDir,
        windScale: now.windScale,
        humidity: now.humidity,
        precip: now.precip,
        pressure: now.pressure,
        vis: now.vis
      })
    }
    if (res2.status === 'fulfilled' && res2.value.code === '200') {
      const { sunrise, sunset } = res2.value
      setNowSun({
        sunrise: dayjs(sunrise).format('HH:mm'),
        sunset: dayjs(sunset).format('HH:mm')
      })
    }
    if (res3.status === 'fulfilled' && res3.value.code === '200') {
      const { daily } = res3.value
      setTodayWeather({
        tempMax: daily[0].tempMax,
        tempMin: daily[0].tempMin,
        humidity: daily[0].humidity
      })
      const weekWeather = daily.map((item: any) => ({
        fxDate: dayjs(item.fxDate).format('MM-DD'),
        week: dayjs(item.fxDate).format('dddd'),
        tempMax: item.tempMax,
        tempMin: item.tempMin,
        icon: item.iconDay,
        text: item.textDay
      }))
      setWeekWeather(weekWeather)
    }
  }

  useEffect(() => {
    setWeather()
  }, [])

  return (
    <div>
      <HoverCard>
        <HoverCardTrigger>
          <div className="flex items-center text-sm hover:cursor-pointer">
            <div>{address}</div>
            <WeatherIcon code={nowWeather.icon} className="ml-2.5" isFill />
            <div className="ml-2 mr-2.5">{nowWeather.text}</div>
            <div>{nowWeather.temp}℃</div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-96">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <div className="mb-3">
                <span className="text-5xl">{nowWeather.temp}</span>
                <span>℃</span>
              </div>
              <div className="text-lg font-black">{address}</div>
              <div className="my-2 text-gray-500">
                {todayWeather.tempMin}℃-{todayWeather.tempMax}℃
              </div>
              <div className="text-sm text-gray-500">
                发布于 {nowWeather.obsTime}
              </div>
            </div>
            <div
              className="relative flex h-44 w-44 items-center justify-center rounded-full bg-orange-400 shadow-2xl"
              style={{
                background: `linear-gradient(${color1} 0, ${color2} 100%)`,
                boxShadow: `0 0 10px ${color1}`
              }}
            >
              {animCode(Number(nowWeather.icon)) ? (
                <div className={styles[animCode(Number(nowWeather.icon))!]}>
                  <i></i>
                </div>
              ) : (
                <WeatherIcon
                  code={nowWeather.icon}
                  className="text-[140px] text-white"
                  isFill
                />
              )}
            </div>
          </div>
          <div className="flex flex-wrap text-gray-500">
            <div className="h-20 w-1/2">
              <div className="mb-4 text-xs">日出日落</div>
              <div className="text-lg text-gray-600">
                {nowSun.sunrise}-{nowSun.sunset}
              </div>
            </div>
            <div className="h-20 w-1/2">
              <div className="mb-4 text-xs">湿度</div>
              <div className="text-lg text-gray-600">
                {todayWeather.humidity}%
              </div>
            </div>
            <div className="h-20 w-1/2">
              <div className="mb-4 text-xs">风速</div>
              <div className="text-lg text-gray-600">
                {nowWeather.windDir} {nowWeather.windScale}级
              </div>
            </div>
            <div className="h-20 w-1/2">
              <div className="mb-4 text-xs">气压</div>
              <div className="text-lg text-gray-600">
                {nowWeather.pressure} hpa
              </div>
            </div>
          </div>
          <iframe
            width="352"
            height="128"
            src={`https://embed.windy.com/embed2.html?lat=${location.y}&lon=${location.x}&detailLat=34.069&detailLon=-118.323&width=380&height=200&zoom=10&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`}
            frameBorder="0"
          ></iframe>
          <div className="flex">
            <div
              className="my-1 mr-1 flex flex-col bg-gray-200 px-2 text-center text-xs text-gray-500"
              style={{ writingMode: 'vertical-rl' }}
            >
              7天天气预报
            </div>
            <div className="flex-1 text-lg text-gray-600">
              {weekWeather.map(item => (
                <div
                  key={item.fxDate}
                  className="my-1 flex items-center gap-x-2 bg-gray-200 py-2"
                >
                  <div className="ml-4">{item.fxDate}</div>
                  <div>{item.week}</div>
                  <WeatherIcon code={item.icon} />
                  <div>{item.text}</div>
                  <div className="text-xs text-gray-500">
                    {item.tempMin}℃-{item.tempMax}℃
                  </div>
                </div>
              ))}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

export default Weather
