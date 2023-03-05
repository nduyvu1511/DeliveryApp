import { CloseIcon, FilterIcon } from '@/assets'
import { Button, InputDateRange, Modal, Tabs } from '@/components'
import { useModal } from '@/hooks'
import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { DateFilter, DateTypeFilter } from '@/types'
import React, { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

interface FilterDateRangeProps {
  initialData?: DateFilter | undefined
  onChange?: (_: DateFilter | undefined) => void
}

export const FilterDateRange = ({ initialData, onChange }: FilterDateRangeProps) => {
  const { onClose, onOpen, visible } = useModal()

  const RenderChilren = () => {
    const [params, setParams] = useState<DateFilter | undefined>(
      initialData?.date_type
        ? { date_type: initialData.date_type }
        : initialData?.date_starting && initialData?.date_ending
        ? { date_ending: initialData.date_ending, date_starting: initialData.date_starting }
        : undefined
    )

    const handleChange = () => {
      if (!params) return

      onChange?.(params)
      onClose()
    }

    const handleReset = () => {
      setParams(undefined)
      onChange?.(undefined)
    }

    return (
      <View style={{ padding: 24, flex: 1 }}>
        <View style={[COMMON_STYLES.flexRowSpaceBetween, { marginBottom: 12 }]}>
          <Text style={[TYPOGRAPHY.baseBold, { fontSize: 20 }]}>Bộ lọc</Text>
          <Pressable onPress={onClose}>
            <CloseIcon />
          </Pressable>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 24 }}>
            <Text style={[TYPOGRAPHY.baseBold, { marginBottom: 8 }]}>Khoảng thời gian</Text>

            <Tabs
              setInitialIndex={false}
              data={data}
              itemActive={params?.date_type}
              onChange={(date_type) => setParams({ date_type: date_type as DateTypeFilter })}
            />
          </View>

          <View style={{ marginBottom: 24 }}>
            <InputDateRange
              label="Từ ngày - đến ngày"
              placeholder="Từ ngày - đến ngày"
              initialRange={
                params?.date_ending && params?.date_starting
                  ? {
                      fromDate: params?.date_starting?.slice(0, 10),
                      toDate: params?.date_ending?.slice(0, 10),
                    }
                  : undefined
              }
              onChange={({ fromDate, toDate }) =>
                setParams({
                  date_ending: toDate + ' 00:00:00',
                  date_starting: fromDate + ' 00:00:00',
                })
              }
            />
          </View>
        </View>

        <View style={{ ...COMMON_STYLES.flexRowCenter }}>
          <Button
            onPress={handleReset}
            textStyle={{ color: COLORS.primary }}
            style={{ backgroundColor: COLORS.bgPrimary, flex: 1 }}
            disabled={!params}
            title="Đặt lại"
          />
          <View style={{ width: 12 }} />
          <Button onPress={handleChange} disabled={!params} title="Áp dụng" style={{ flex: 1 }} />
        </View>
      </View>
    )
  }

  return (
    <>
      <Pressable onPress={onOpen}>
        <FilterIcon fill={COLORS.gray70} />
      </Pressable>

      <Modal height={350} visible={visible} onDismiss={onClose}>
        <RenderChilren />
      </Modal>
    </>
  )
}

const data = [
  { value: 'today', label: 'Hôm nay' },
  { value: 'yesterday', label: 'Hôm qua' },
  { value: 'this_week', label: 'Tuần này' },
  { value: 'last_week', label: 'Tuần trước' },
  { value: 'this_month', label: 'Tháng này' },
  { value: 'last_month', label: 'Tháng trước' },
  { value: 'this_quarter', label: 'Quý này' },
  { value: 'last_quarter', label: 'Quý trước' },
  { value: 'this_year', label: 'Năm nay' },
  { value: 'last_year', label: 'Năm trước' },
]
