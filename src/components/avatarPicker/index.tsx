import { EditIcon } from '@/assets'
import { Avatar, BottomSheet, ImagePicker, Spinner } from '@/components'
import { useAsync } from '@/hooks'
import { userAPI } from '@/services'
import { useUserInfoSlice } from '@/store'
import { COLORS, COMMON_STYLES } from '@/theme'
import { ForwardModalRef } from '@/types'
import React, { useEffect, useRef, useState } from 'react'
import { Pressable, View, ViewStyle } from 'react-native'

interface AvatarPickerProps {
  children?: JSX.Element | JSX.Element[]
  source: string
  size?: number
  style?: ViewStyle | ViewStyle[]
  onChange?: (val: string) => void
}

export const AvatarPicker = ({ children, source, style, size = 72 }: AvatarPickerProps) => {
  const imagePickerRef = useRef<ForwardModalRef>(null)
  const { asyncHandler, isLoading } = useAsync()
  const setUserInfo = useUserInfoSlice((state) => state.setUserInfo)
  const [image, setImage] = useState<string>(source)

  useEffect(() => setImage(source), [source])

  const handleSetImage = (val: any) => {
    imagePickerRef?.current?.onClose()

    if (val?.data) {
      asyncHandler({
        fetcher: userAPI.updateUserInfo({ image: val.data }),
        onSuccess: (res) => {
          if (res?.detail_shipper?.partner_id) {
            setUserInfo(res)
            setImage(res?.detail_shipper?.image_url)
          }
        },
        config: {
          showSuccessMsg: false,
          showBackdrop: false,
        },
      })
    }
  }

  return (
    <>
      <Pressable
        style={[
          {
            position: 'relative',
            borderRadius: 50,
            width: size,
            height: size,
          },
          style,
        ]}
        onPress={() => !isLoading && imagePickerRef.current?.onOpen()}
      >
        {children || <Avatar url={image} size={size} />}

        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            bottom: 0,
            right: 0,
          }}
        >
          <EditIcon />
        </View>

        {isLoading ? (
          <View
            style={{
              ...COMMON_STYLES.flexCenter,
              ...COMMON_STYLES.absoluteInset,
              backgroundColor: COLORS.black30,
              borderRadius: 50,
            }}
          >
            <Spinner color={COLORS.white98} size={20} />
          </View>
        ) : null}
      </Pressable>

      <BottomSheet
        ref={imagePickerRef}
        height={210}
        onClose={() => imagePickerRef?.current?.onClose()}
        title="Chọn ảnh đại diện"
      >
        <ImagePicker onChange={handleSetImage} style={{ padding: 24 }} />
      </BottomSheet>
    </>
  )
}
