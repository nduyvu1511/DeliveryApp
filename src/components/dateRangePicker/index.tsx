import { ArrowLeftIcon, ArrowRightIcon } from '@/assets'
import { Button } from '@/components'
import { COLORS } from '@/theme'
// import 'moment/locale/vi'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars'
const XDate = require('xdate')

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Thg 1',
    'Thg 2',
    'Thg 3',
    'Thg 4',
    'Thg 5',
    'Thg 6',
    'Thg 7',
    'Thg 8',
    'Thg 9',
    'Thg 10',
    'Thg 11',
    'Thg 12',
  ],
  dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
  dayNamesShort: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  today: 'Hôm nay',
}
LocaleConfig.defaultLocale = 'vi'

type Theme = {
  markColor: string
  markTextColor: string
}

export interface DateRangePickerProps {
  initialRange?: DateRange
  theme?: Theme
  onChange?: (date: DateRange) => void
}

type MarkedDates = {
  [key: string]: {
    color: string
    textColor: string
    endingDay?: boolean
    startingDay?: boolean
  }
}

export type DateRange = { fromDate: string; toDate: string }

export const DateRangePicker = ({
  initialRange,
  theme = { markColor: COLORS.primary, markTextColor: COLORS.white },
  onChange,
}: DateRangePickerProps) => {
  const [isFromDatePicked, setIsFromDatePicked] = useState<boolean>()
  const [isToDatePicked, setIsToDatePicked] = useState<boolean>()
  const [markedDates, setMarkedDates] = useState<MarkedDates | undefined>()
  const [fromDate, setFromDate] = useState<string | undefined>()
  const [dateRange, setDateRange] = useState<DateRange>()

  useEffect(() => {
    setupInitialRange()
  }, [])

  const handleChange = () => {
    if (!dateRange?.fromDate || !dateRange?.toDate) return

    onChange?.(dateRange)
  }

  const onDayPress = (day: DateData) => {
    if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
      setDateRange(undefined)
      setupStartMarker(day)
    } else if (!isToDatePicked && fromDate) {
      let newMarkedDates = { ...markedDates }
      let [mMarkedDates, range] = setupMarkedDates(fromDate, day.dateString, newMarkedDates)

      if (range >= 0) {
        // setState({ isFromDatePicked: true, isToDatePicked: true, markedDates: mMarkedDates })

        setIsFromDatePicked(true)
        setIsToDatePicked(true)
        setMarkedDates(mMarkedDates)
        setDateRange({ fromDate, toDate: day.dateString })
        // onSuccess?.(fromDate, day.dateString)
      } else {
        setDateRange({ fromDate, toDate: '' })
        setupStartMarker(day)
      }
    }
  }

  const setupStartMarker = (day: DateData) => {
    let markedDates = {
      [day.dateString]: {
        startingDay: true,
        color: theme.markColor,
        textColor: theme.markTextColor,
      },
    }

    setIsFromDatePicked(true)
    setIsToDatePicked(false)
    setMarkedDates(markedDates)
    setFromDate(day.dateString)
  }

  const setupMarkedDates = (
    fromDate: string,
    toDate: string,
    markedDates: MarkedDates
  ): [MarkedDates, number] => {
    let mFromDate = new XDate(fromDate)
    let mToDate = new XDate(toDate)
    let range = mFromDate.diffDays(mToDate)

    if (range >= 0) {
      if (range === 0) {
        markedDates = {
          [toDate]: {
            color: theme.markColor,
            textColor: theme.markTextColor,
          },
        }
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')

          if (i < range) {
            markedDates[tempDate] = {
              color: theme.markColor,
              textColor: theme.markTextColor,
            }
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: theme.markColor,
              textColor: theme.markTextColor,
            }
          }
        }
      }
    }
    return [markedDates, range]
  }

  const setupInitialRange = () => {
    if (!initialRange?.fromDate || !initialRange?.toDate) return

    let { fromDate, toDate } = initialRange
    let markedDates = {
      [fromDate]: {
        startingDay: true,
        color: theme.markColor,
        textColor: theme.markTextColor,
      },
    }
    let [mMarkedDates, range] = setupMarkedDates(fromDate, toDate, markedDates)
    // this.setState({ markedDates: mMarkedDates, fromDate: fromDate })

    setDateRange(initialRange)
    setMarkedDates(mMarkedDates)
    setFromDate(fromDate)
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        {!initialRange || (initialRange && markedDates) ? (
          <Calendar
            renderArrow={(direction) =>
              direction === 'left' ? (
                <ArrowLeftIcon width={8} height={15} />
              ) : (
                <ArrowRightIcon width={8} height={15} />
              )
            }
            theme={{
              dayTextColor: COLORS.textBody,
            }}
            markingType={'period'}
            current={fromDate}
            markedDates={markedDates}
            onDayPress={onDayPress}
          />
        ) : null}
      </ScrollView>

      <View style={{ flexDirection: 'row', padding: 16 }}>
        <Button
          onPress={handleChange}
          disabled={!dateRange?.fromDate || !dateRange?.toDate}
          style={{ flex: 1 }}
          title="Xác nhận"
        />
      </View>
    </View>
  )
}
