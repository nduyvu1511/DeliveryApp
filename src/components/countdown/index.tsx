import { TYPOGRAPHY } from '@/theme'
import React, { useEffect, useState } from 'react'
import { Text, TextStyle } from 'react-native'

interface CountdownProps {
  style?: TextStyle | TextStyle[]
  defaultValue?: number
  onLimit?: () => void
}

export const Countdown = ({ style, defaultValue = 0, onLimit }: CountdownProps) => {
  const [value, setValue] = useState<number>(defaultValue)

  useEffect(() => {
    if (value === 0) return

    const interval = setInterval(() => {
      const val = value - 1
      setValue(val)
      if (val === 0) {
        onLimit?.()
      }
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
    return `${hours === '00' ? '' : `${hours}:`} ${minutes}:${seconds}`
  }

  return <Text style={[{ ...TYPOGRAPHY.sm }, style]}>{toHHMMSS(value + '')}</Text>
}
