import { PrinterIcon, TrashIcon } from '@/assets'
import { Alert, IconButton } from '@/components'
import { useModal } from '@/hooks'
import { COLORS } from '@/theme'
import { BTDeviceRes } from '@/types'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { styles } from './style'

interface PrintItemProps {
  data: BTDeviceRes
  connected?: boolean
  onConnect?: (data: BTDeviceRes) => void
  onDisconnect?: (data: string) => void
}

export const PrintItem = ({ data, connected, onConnect, onDisconnect }: PrintItemProps) => {
  const { onClose, onOpen, visible } = useModal()

  return (
    <>
      <Pressable onPress={() => onConnect?.(data)} style={styles.container}>
        <View style={styles.inner}>
          <PrinterIcon />
          <Text numberOfLines={1} style={styles.label}>
            {data.name || 'UNKNOWN'}
          </Text>
          {connected ? (
            <IconButton
              onPress={onOpen}
              icon={<TrashIcon fill={COLORS.red} height={18} width={16} />}
            />
          ) : null}
        </View>
      </Pressable>

      <Alert
        type="info"
        visible={visible}
        title="Xóa máy in"
        desc="Bạn có chắc là muốn xóa máy in này không?"
        onDismiss={onClose}
        onLeftBtnPress={onClose}
        onRightBtnPress={() => onDisconnect?.(data.address)}
      />
    </>
  )
}
