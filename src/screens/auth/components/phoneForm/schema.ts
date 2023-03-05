import { REGEX } from '@/constants'
import * as Yup from 'yup'

export const phoneSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(REGEX.phone, 'Vui lòng nhập đúng định dạng số điện thoại')
    .required('Vui lòng nhập số điện thoại'),
})
