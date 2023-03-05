import { ArrowRightIcon } from '@/assets'
import { ModalSelectItem, TextInput, TextInputProps } from '@/components'
import { IdAndName } from '@/types'
import React, { useState } from 'react'
import { Modal } from '../../modal'

interface InputSelectModalItemProps extends TextInputProps {
  data: IdAndName[] | undefined
}

export function InputSelectModalItem({ data, ...attributes }: InputSelectModalItemProps) {
  const [visible, setVisible] = useState<boolean>(false)

  const closeModal = () => {
    setVisible(false)
  }

  return (
    <>
      <TextInput
        {...attributes}
        editable={false}
        pointerEvents="none"
        onPress={() => setVisible(true)}
        rightIcon={<ArrowRightIcon />}
      />

      <Modal onDismiss={closeModal} visible={visible} style={{ width: 320, height: 400 }}>
        <ModalSelectItem title={attributes?.label || ''} data={data} />
      </Modal>
    </>
  )
}
