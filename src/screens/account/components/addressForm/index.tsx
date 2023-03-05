import { ArrowRightIcon } from '@/assets'
import { Button, Modal, TextField } from '@/components'
import { COMMON_STYLES } from '@/theme'
import { AddressRes, CreateAddressForm, ForwardFormRef, IdAndName } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { ModalSelectDistrict, ModalSelectProvince, ModalSelectWard } from '..'
import { addressSchema } from './schema'

type FormModalType = 'province' | 'district' | 'ward' | undefined

interface AddressFormProps {
  onSubmit?: (val: CreateAddressForm) => void
  defaultValues?: AddressRes | undefined
}

export const AddressForm = forwardRef<ForwardFormRef, AddressFormProps>(
  ({ onSubmit, defaultValues }, ref) => {
    const [modalType, setModalType] = useState<FormModalType>(undefined)

    const {
      control,
      handleSubmit,
      reset,
      setValue,
      getValues,
      clearErrors,
      setFocus,
      formState: { isValid },
    } = useForm<CreateAddressForm>({
      resolver: yupResolver(addressSchema),
      mode: 'all',
      defaultValues: defaultValues?.id
        ? {
          district_id: {
            id: defaultValues.district_name_id,
            name: defaultValues.district_id,
          },
          ward_id: {
            id: defaultValues.ward_name_id,
            name: defaultValues.ward_id,
          },
          state_id: {
            id: defaultValues.state_name_id,
            name: defaultValues.state_id,
          },
          street: defaultValues?.street,
        }
        : undefined,
    })

    useImperativeHandle(ref, () => ({
      onSubmit: onSubmitHandler,
      onReset: reset,
    }))

    const onSubmitHandler = handleSubmit((data: CreateAddressForm) => {
      onSubmit?.(data)
    })

    const openWardModal = () => {
      if (!getValues('district_id.id')) {
        Toast.show({
          type: 'error',
          text1: 'Vui lòng nhập Quận/Huyện',
        })
        return
      }

      setModalType('ward')
    }

    const openDistrictModal = () => {
      if (!getValues('state_id.id')) {
        Toast.show({
          type: 'error',
          text1: 'Vui lòng chọn Tỉnh/Thành Phố',
        })
        return
      }

      setModalType('district')
    }

    const handleSelectProvince = (val: IdAndName) => {
      setValue('state_id', val)
      clearErrors('state_id')

      if (getValues('district_id.id')) {
        setValue('district_id', undefined as any)
      }

      if (getValues('ward_id.id')) {
        setValue('ward_id', undefined as any)
      }

      setModalType('district')
    }

    const handleSelectDistrict = (val: IdAndName) => {
      setValue('district_id', val)
      clearErrors('district_id')

      if (getValues('ward_id.id')) {
        setValue('ward_id', undefined as any)
      }

      setModalType('ward')
    }

    const handleSelectWard = (val: IdAndName) => {
      setValue('ward_id', val)
      clearErrors('ward_id')
      setModalType(undefined)
      setFocus('street')
    }

    const RenderAddressSelectModal = (): JSX.Element | null => {
      if (modalType === 'province') {
        return (
          <ModalSelectProvince
            activeId={Number(getValues('state_id.id'))}
            onChange={handleSelectProvince}
          />
        )
      }

      if (modalType === 'district') {
        return (
          <ModalSelectDistrict
            activeId={Number(getValues('district_id.id'))}
            province_id={+getValues('state_id.id')}
            onChange={handleSelectDistrict}
          />
        )
      }

      if (modalType === 'ward') {
        return (
          <ModalSelectWard
            activeId={Number(getValues('ward_id.id'))}
            onChange={handleSelectWard}
            district_id={+getValues('district_id.id')}
          />
        )
      }

      return null
    }

    return (
      <>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1, padding: 16 }}>
            <TextField
              required
              value={getValues('state_id.name')}
              label="Tỉnh/Thành Phố"
              placeholder="Tỉnh/Thành Phố"
              editable={false}
              pointerEvents="none"
              control={control}
              name="state_id"
              onPress={() => setModalType('province')}
              rightIcon={<ArrowRightIcon />}
            />

            <TextField
              required
              value={getValues('district_id.name')}
              label="Quận/Huyện"
              placeholder="Quận/Huyện"
              editable={false}
              pointerEvents="none"
              control={control}
              name="district_id"
              onPress={openDistrictModal}
              rightIcon={<ArrowRightIcon />}
            />

            <TextField
              required
              value={getValues('ward_id.name')}
              label="Phường/Xã"
              placeholder="Phường/Xã"
              editable={false}
              pointerEvents="none"
              control={control}
              name="ward_id"
              onPress={openWardModal}
              rightIcon={<ArrowRightIcon />}
            />

            <TextField
              required
              label="Địa chỉ cụ thể"
              placeholder="Địa chỉ cụ thể"
              control={control}
              name="street"
            />
          </ScrollView>

          <View style={COMMON_STYLES.buttonBottom}>
            <Button
              style={{ flex: 1 }}
              onPress={onSubmitHandler}
              disabled={!isValid}
              title="Xác nhận"
            />
          </View>
        </View>

        <Modal
          visible={
            modalType === 'province' ||
            !!(modalType === 'district' && getValues('state_id.id')) ||
            !!(modalType === 'ward' && getValues('district_id.id'))
          }
          onDismiss={() => setModalType(undefined)}
        >
          <RenderAddressSelectModal />
        </Modal>
      </>
    )
  }
)
