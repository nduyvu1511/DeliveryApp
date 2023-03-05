import { CameraIcon, PhotoIcon } from '@/assets'
import { COLORS } from '@/theme'
import React from 'react'
import { Pressable, Text, View, ViewStyle } from 'react-native'
import ImagePickerLib, { ImageOrVideo, Options } from 'react-native-image-crop-picker'
import { styles } from './style'

type ImagePickerProps = {
  style?: ViewStyle | ViewStyle[]
  options?: Options
  onChange?: (_: ImageOrVideo) => void
}

export const ImagePicker = ({ style, options, onChange }: ImagePickerProps) => {
  const handleChange = (params: ImageOrVideo) => {
    onChange?.(params)
  }

  const getImageFromGallery = async () => {
    try {
      const res = await ImagePickerLib.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true,
        ...options,
      })

      handleChange(res)
    } catch (error) {
      console.log({ error })
    }
  }

  const takeImageFromCamera = async () => {
    try {
      const res = await ImagePickerLib.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true,
        ...options,
      })

      handleChange(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.btnItem} onPress={getImageFromGallery}>
        <PhotoIcon fill={COLORS.gray50} />
        <Text style={styles.btnItemText}>Thư viện</Text>
      </Pressable>

      <View style={styles.separator} />

      <Pressable style={styles.btnItem} onPress={takeImageFromCamera}>
        <CameraIcon fill={COLORS.gray50} />
        <Text style={styles.btnItemText}>Chụp ảnh</Text>
      </Pressable>
    </View>
  )
}
