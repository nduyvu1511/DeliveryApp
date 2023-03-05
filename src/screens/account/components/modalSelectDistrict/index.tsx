import { ModalSelectItem } from '@/components'
import { userAPI } from '@/services'
import { AddressItemRes } from '@/types'
import React from 'react'
import useSWR from 'swr'

interface DistrictFormProps {
  onChange?: (_: AddressItemRes) => void
  province_id: number
  activeId?: number
}

export const ModalSelectDistrict = ({ onChange, province_id, activeId }: DistrictFormProps) => {
  const { data, error } = useSWR(
    `get_district_${province_id}`,
    () => userAPI.getAddress({ state_id: province_id }).then((res) => res?.data?.data_adress || []),
    {
      dedupingInterval: 1000 * 60 * 60,
    }
  )

  return (
    <ModalSelectItem
      title="Chọn Quận/Huyện"
      data={data}
      activeId={activeId}
      isLoading={data === undefined && error === undefined}
      onChange={onChange}
    />
  )
}
