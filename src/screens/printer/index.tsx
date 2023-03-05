import { Button, EmptyRecord, Paper, Spinner, TabBar } from '@/components'
import { COLORS } from '@/theme'
import React from 'react'
import { Linking, ScrollView, Text, View } from 'react-native'
import { PrintItem } from './components'
import { styles } from './style'
import { usePrinter } from './usePrinter'

export const SelectPrinterScreen = () => {
  const {
    hasPermission,
    bluetoothDevice,
    devices,
    isFinding,
    unPair,
    scanDevices,
    connect,
    print,
  } = usePrinter()

  return (
    <>
      <TabBar title="Kết nối máy in Bluetooth" />

      {!hasPermission ? (
        <EmptyRecord
          title="Vui lòng cấp quyền Bluetooth cho ứng dụng"
          titleBtn="Cấp quyền cho ứng dụng"
          onBtnPress={async () => await Linking.openSettings()}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Paper>
              <Text style={styles.sectionTitle}>Thiết bị ghép nối</Text>
              {bluetoothDevice?.address ? (
                <PrintItem data={bluetoothDevice} connected onDisconnect={unPair} />
              ) : (
                <Text style={styles.printerInfo}>Chưa có máy in nào được kết nối</Text>
              )}

              <Button title="In" onPress={print} />
            </Paper>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[styles.sectionTitle, { marginHorizontal: 16 }]}>Dò tìm thiết bị</Text>

            <ScrollView style={styles.containerList}>
              {isFinding ? (
                <Spinner size="large" />
              ) : !devices?.length ? (
                <Text style={styles.deviceNotFound}>Không tìm thấy thiết bị nào</Text>
              ) : (
                devices.map(
                  (item) =>
                    item.address !== bluetoothDevice?.address && (
                      <Paper style={{ marginBottom: 12 }}>
                        <PrintItem
                          key={item.address}
                          onConnect={connect}
                          data={item}
                          connected={item.address === bluetoothDevice?.address}
                        />
                      </Paper>
                    )
                )
              )}

              {!isFinding ? (
                <Button
                  style={styles.btn}
                  textStyle={{ color: COLORS.primary }}
                  title="Dò thiết bị"
                  onPress={scanDevices}
                />
              ) : null}
            </ScrollView>
          </View>
        </View>
      )}
    </>
  )
}
