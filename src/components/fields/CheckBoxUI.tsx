import React, { ReactNode } from 'react'
import { images } from 'src/constants'
import styled from 'src/styled-components'
import { CheckBoxProps } from './interfaces'

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const Icon = styled.Image.attrs(({ isChecked }: Checkable) => ({
  source: isChecked ? images.CHECKBOX_ACTIVE : images.CHECKBOX_INACTIVE,
}))<Checkable>`
  margin-right: 16px;
`

interface Checkable {
  isChecked?: boolean
}

interface Props extends Checkable, CheckBoxProps {
  children?: ReactNode
  onPress?: () => void
}

class CheckBoxUI extends React.Component<Props> {
  render() {
    const { isChecked, children, onPress, style } = this.props
    return (
      <Wrapper style={style} onPress={onPress}>
        <Icon isChecked={isChecked} />
        {children}
      </Wrapper>
    )
  }
}

export default CheckBoxUI
