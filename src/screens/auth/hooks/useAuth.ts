import { useAsync } from '@/hooks'
import { userAPI } from '@/services'
import { useCommonSlice, useUserInfoSlice } from '@/store'
import { AsyncHandlerParams, LoginPasswordForm, UserDetailRes } from '@/types'

export interface UseAuthRes {
  loginWithPassword: (_: AsyncHandlerParams<LoginPasswordForm, UserDetailRes>) => void
}

export const useAuth = (): UseAuthRes => {
  const { asyncHandler } = useAsync()
  const setToken = useUserInfoSlice((state) => state.setToken)
  const setUserInfo = useUserInfoSlice((state) => state.setUserInfo)
  const setBackdropVisible = useCommonSlice((state) => state.setBackdropVisible)

  const getUserInfo = ({
    params,
    ...others
  }: AsyncHandlerParams<{ token: string }, UserDetailRes>) => {
    asyncHandler({
      ...others,
      fetcher: userAPI.getDetailUser(params.token),
      onSuccess: (res) => {
        others?.onSuccess?.(res)
        setUserInfo(res)
      },
    })
  }

  const loginWithPassword = ({
    params,
    ...others
  }: AsyncHandlerParams<LoginPasswordForm, UserDetailRes>) => {
    setBackdropVisible(true)
    asyncHandler({
      ...others,
      fetcher: userAPI.login({ login: params.phone, password: params?.password }),
      onSuccess: ({ access_token }) => {
        getUserInfo({
          params: { token: access_token },
          onSuccess: (res) => {
            setToken(access_token)
            others?.onSuccess?.(res)
          },
          config: {
            showSuccessMsg: false,
            errorMsg: 'Đăng nhập không thành công',
            requiredToken: false,
          },
        })
      },
      onError: () => setBackdropVisible(false),
      config: {
        ...others.config,
        errorMsg: 'Đăng nhập không thành công',
        showSuccessMsg: false,
        requiredToken: false,
        showBackdrop: false,
      },
    })
  }

  return {
    loginWithPassword,
  }
}
