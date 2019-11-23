import React from 'react'
import { Dimensions } from 'react-native'
import { Image } from 'src/components'
import { styles } from 'src/constants'
import styled from 'src/styled-components'

const { width } = Dimensions.get('window')

const COVER_HORIZONTAL_INDENT = (32 + styles.VIEW_HORIZONTAL_INDENTATION) * 2
const IMAGE_WIDTH = width - COVER_HORIZONTAL_INDENT
const IMAGE_HEIGHT = 275 // максимальная высота по макетам
const IMAGE_SIZE = Math.min(IMAGE_WIDTH, IMAGE_HEIGHT)

const CoverWrapper = styled.View`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: 4px;
  align-self: center;
  overflow: hidden;
`

const CoverImage = styled(Image)`
  width: 100%;
  height: 100%;
`

const Cover: React.FC<{ source: any }> = ({ source }) => (
  <CoverWrapper>
    <CoverImage source={source} />
  </CoverWrapper>
)

export default Cover
