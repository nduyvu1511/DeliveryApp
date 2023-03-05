import { userAPI } from '@/services'
import { CreateAddressForm, GenderType, UpdateUserInfo, UserDetailRes } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import produce from 'immer'
import create, { StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

export type UserInfoSlice = {
  userInfo: UserDetailRes | undefined
  token: string | undefined
  setToken: (_: string | undefined) => void
  setUserInfo: (_: UserDetailRes | undefined) => void
  fetchUserInfo: () => void
  updateUserInfo: (_: UpdateUserInfo & { address?: CreateAddressForm }) => void
  logout: () => void
}

type UserInfoPersist = (
  config: StateCreator<UserInfoSlice>,
  options: PersistOptions<UserInfoSlice>
) => StateCreator<UserInfoSlice>

export const useUserInfoSlice = create<UserInfoSlice>(
  (persist as UserInfoPersist)(
    (set) => ({
      userInfo: undefined,
      token: undefined,
      setUserInfo: (userInfo: UserDetailRes | undefined) =>
        set((state) => ({
          ...state,
          userInfo: userInfo,
        })),
      fetchUserInfo: async () =>
        set(
          produce<UserInfoSlice>((state) => {
            userAPI
              .getDetailUser()
              .then((res) => {
                if (res?.data?.detail_shipper?.partner_id) {
                  state.userInfo = res.data
                }
              })
              .catch((err) => {
                console.log(err)
              })
          })
        ),
      updateUserInfo: (userInfo: UpdateUserInfo & { address?: CreateAddressForm }) =>
        set(
          produce<UserInfoSlice>((state) => {
            if (!state.userInfo) return

            if (userInfo?.birth_day) {
              state.userInfo.detail_shipper.birthday = userInfo?.birth_day
            }

            if (userInfo?.email) {
              state.userInfo.detail_shipper.email = userInfo.email
            }

            if (userInfo?.name) {
              state.userInfo.name = userInfo.name
              state.userInfo.detail_shipper.name = userInfo.name
            }

            if (userInfo?.phone) {
              state.userInfo.detail_shipper.phone = userInfo.phone
            }

            if (userInfo?.sex) {
              state.userInfo.detail_shipper.sex = userInfo.sex as GenderType
            }

            if (userInfo?.address?.state_id?.id) {
              const { district_id, state_id, street, ward_id } = userInfo.address

              state.userInfo.detail_shipper.address = {
                ...state.userInfo.detail_shipper.address,
                district_name_id: district_id.id as number,
                district_id: district_id.name,
                state_name_id: state_id.id as number,
                state_id: state_id.name,
                ward_name_id: ward_id.id as number,
                ward_id: ward_id.name,
                street: street,
                full_adress: `${street}, ${ward_id.name}, ${district_id.name}, ${state_id.name}`,
              }
            }
          })
        ),
      setToken: (token: string | undefined) =>
        set((state) => ({
          ...state,
          token,
        })),
      logout: () =>
        set((state) => ({
          ...state,
          token: undefined,
          userInfo: undefined,
        })),
    }),
    {
      name: 'userInfo-store',
      getStorage: () => AsyncStorage,
    }
  )
)
