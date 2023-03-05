import { CalendarIcon } from '@/assets'
import moment from 'moment'
import React, { useState } from 'react'
import { TextInput, TextInputProps } from '..'
import { DateRange, DateRangePicker, DateRangePickerProps } from '../../dateRangePicker'
import { Modal } from '../../modal'

type InputDateRangeProps = DateRangePickerProps & Omit<TextInputProps, 'onChange'> & {}

export const InputDateRange = ({
  initialRange,
  theme,
  onChange,
  ...attributes
}: InputDateRangeProps) => {
  const [visible, setVisible] = useState<boolean>(false)

  const handleChange = (value: DateRange) => {
    setVisible(false)
    onChange?.(value)
  }

  return (
    <>
      <TextInput
        onPress={() => setVisible(true)}
        leftIcon={<CalendarIcon />}
        editable={false}
        pointerEvents="none"
        placeholder="Chọn ngày"
        value={
          initialRange
            ? `${moment(initialRange?.fromDate).format('DD/MM/YYYY')} - ${moment(
                initialRange?.toDate
              ).format('DD/MM/YYYY')}`
            : undefined
        }
        {...attributes}
      />

      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{ maxHeight: 400, height: '100%' }}
      >
        <DateRangePicker {...attributes} initialRange={initialRange} onChange={handleChange} />
      </Modal>
    </>
  )
}
