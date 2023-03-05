import { ModalSelectItem } from '@/components'
import { userAPI } from '@/services'
import { AddressItemRes } from '@/types'
import React from 'react'
import useSWR from 'swr'

interface ProvinceFormProps {
  onChange?: (_: AddressItemRes) => void
  activeId?: number
}

export const ModalSelectProvince = ({ onChange, activeId }: ProvinceFormProps) => {
  const { data, error } = useSWR(
    'get_province',
    () => userAPI.getAddress().then((res) => res?.data?.data_adress || []),
    {
      dedupingInterval: 1000 * 60 * 60,
    }
  )

  return (
    <ModalSelectItem
      activeId={activeId}
      title="Chọn Tỉnh/Thành phố"
      data={data}
      isLoading={data === undefined && error === undefined}
      onChange={onChange}
    />
  )
}
