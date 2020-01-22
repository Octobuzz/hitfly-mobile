import React from 'react'
import { Dimensions } from 'react-native'
import { Lifehack, NoAvatarSizeNames } from 'src/apollo'
import { useImageSource } from 'src/hooks'
import { Image } from 'src/components'
import { styles } from 'src/constants'
import styled from 'src/styled-components'

const { width } = Dimensions.get('window')
const IMAGE_SIZE = width - styles.VIEW_HORIZONTAL_INDENTATION

const LifehackImage = styled(Image)`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`

interface LifehackItemProps {
  lifehack: Lifehack
}

const LifehackItem: React.FC<LifehackItemProps> = ({ lifehack: { image } }) => {
  const source = useImageSource(image, NoAvatarSizeNames.S_300)
  return <LifehackImage source={source} />
}

export default LifehackItem
