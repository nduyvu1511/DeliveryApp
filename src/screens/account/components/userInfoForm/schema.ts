import { emailSchema, phoneSchema } from '@/constants'
import { UpdateUserInfo } from '@/types'
import * as Yup from 'yup'

export const userInfoSchema: Yup.SchemaOf<UpdateUserInfo> = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên'),
  birth_day: Yup.string().required('Vui lòng nhập ngày sinh'),
  sex: Yup.string().required('Vui lòng nhập giới tính'),
  phone: phoneSchema,
  email: emailSchema,
  address: Yup.string().optional(),
})
