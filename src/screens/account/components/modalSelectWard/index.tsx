import { ModalSelectItem } from '@/components'
import { userAPI } from '@/services'
import { AddressItemRes } from '@/types'
import React from 'react'
import useSWR from 'swr'

interface ProvinceFormProps {
  onChange?: (_: AddressItemRes) => void
  district_id: number
  activeId?: number
}

export const ModalSelectWard = ({ onChange, district_id, activeId }: ProvinceFormProps) => {
  const { error, data } = useSWR(
    `get_ward_${district_id}`,
    () => userAPI.getAddress({ district_id }).then((res) => res?.data?.data_adress || []),
    {
      dedupingInterval: 1000 * 60 * 60,
    }
  )

  return (
    <ModalSelectItem
      title="Chọn Phường/Xã"
      data={data}
      isLoading={data === undefined && error === undefined}
      onChange={onChange}
      activeId={activeId}
    />
  )
}
