import { CalendarIcon } from '@/assets'
import { COLORS } from '@/theme'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { useController } from 'react-hook-form'
import DateTimePicker, {
  ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker'
import { TextField, TextFieldProps } from '../textField'

type DateTimeFieldProps = Omit<ReactNativeModalDateTimePickerProps, 'onCancel' | 'onConfirm'> &
  TextFieldProps & {}

export const DateTimeField = ({
  control,
  name,
  required = true,
  mode = 'date',
  ...attributes
}: DateTimeFieldProps) => {
  const [visible, setVisible] = useState<boolean>(false)

  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  })

  const valueDisplay = useMemo<string | undefined>(() => {
    if (!value) return undefined

    if (mode === 'date') return moment(value).format('DD/MM/YYYY')
    if (mode === 'datetime') return moment(value).format('HH:mm DD/MM/YYYY')
    if (mode === 'time') return moment(value).format('HH:mm')
  }, [value])

  const handleConfirm = (val: Date) => {
    let valFormat: Date | string = val

    if (mode === 'date') {
      valFormat = moment(val).format('YYYY-MM-DD')
    } else if (mode === 'datetime') {
      valFormat = moment(val).format('YYYY-MM-DD HH:mm:ss')
    } else if (mode === 'time') {
      valFormat = moment(val).format('HH:mm')
    }

    onChange(valFormat)
    setVisible(false)
  }

  return (
    <>
      <TextField
        leftIcon={<CalendarIcon />}
        editable={false}
        pointerEvents="none"
        onPress={() => setVisible(true)}
        control={control}
        name={name}
        value={valueDisplay}
        onChangeText={onChange}
        required={required}
        {...attributes}
      />

      {visible ? (
        <DateTimePicker
          accentColor={COLORS.primary}
          style={{ backgroundColor: COLORS.primary }}
          isVisible={visible}
          backdropStyleIOS={{ backgroundColor: COLORS.black50 }}
          onConfirm={handleConfirm}
          onCancel={() => setVisible(false)}
          mode={mode}
          date={value ? new Date(value) : undefined}
          {...attributes}
        />
      ) : null}
    </>
  )
}
