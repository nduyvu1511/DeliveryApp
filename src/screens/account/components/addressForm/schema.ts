import { CreateAddressForm } from '@/types'
import * as Yup from 'yup'

export const addressSchema: Yup.SchemaOf<CreateAddressForm> = Yup.object().shape({
  street: Yup.string().required('Vui lòng chọn địa chỉ cụ thể'),
  ward_id: Yup.object()
    .shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
    })
    .typeError('Vui lòng nhập trường này')
    .required('Vui lòng nhập trường này'),
  district_id: Yup.object()
    .shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
    })
    .required('Vui lòng nhập trường này'),
  state_id: Yup.object()
    .shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
    })
    .required('Vui lòng nhập trường này'),
})
