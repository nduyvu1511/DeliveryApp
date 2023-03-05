import { REGEX } from '@/constants'
import * as Yup from 'yup'

export const loginPasswordSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(REGEX.phone, 'Vui lòng nhập đúng định dạng số điện thoại')
    .required('Vui lòng nhập số điện thoại'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu'),
})
