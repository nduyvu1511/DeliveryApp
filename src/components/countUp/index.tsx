import { getSecondsFromDate } from '@/helpers'
import { TYPOGRAPHY } from '@/theme'
import React, { useEffect, useState } from 'react'
import { Text, TextStyle } from 'react-native'

interface CountUpProps {
  style?: TextStyle | TextStyle[]
  startDate?: string | Date
  endDate: string | Date
}

export const CountUp = ({ style, endDate, startDate }: CountUpProps) => {
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    setValue(
      startDate
        ? getSecondsFromDate({
            endDate,
            startDate,
          })
        : 0
    )
  }, [endDate, startDate])

  useEffect(() => {
    if (endDate || !startDate) return

    const interval = setInterval(() => {
      setValue(value + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [value])

  const toHHMMSS = (val: string) => {
    let sec_num: string | number = parseInt(val, 10) // don't forget the second param
    let hours: string | number = Math.floor(sec_num / 3600)
    let minutes: string | number = Math.floor((sec_num - hours * 3600) / 60)
    let seconds: string | number = sec_num - hours * 3600 - minutes * 60

    if (hours < 10) {
      hours = '0' + hours
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    return hours + ':' + minutes + ':' + seconds
  }

  return <Text style={[{ ...TYPOGRAPHY.smSemiBold }, style]}>{toHHMMSS(value + '')}</Text>
}
