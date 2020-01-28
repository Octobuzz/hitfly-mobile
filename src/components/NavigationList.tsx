import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import TextBase from './TextBase'
import styled from 'src/styled-components'

const Wrapper = styled.View``

export const ItemWrapper = styled.TouchableOpacity`
  padding-vertical: 28px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.inputBorder};
`

const ItemText = styled(TextBase)`
  flex: 1;
  padding-right: 16px;
`

const ArrowIcon = styled(Icon).attrs(() => ({
  name: 'arrow-forward',
  size: 20,
}))`
  color: ${({ theme }) => theme.colors.textMain};
`

export interface NavigationItem {
  title: string
  onPress?: () => void
}

interface Props {
  items: NavigationItem[]
}

const NavigationList: React.FC<Props> = ({ items }) => (
  <Wrapper>
    {items.map(({ title, onPress }) => (
      <ItemWrapper onPress={onPress} key={title} testID="item">
        <ItemText>{title}</ItemText>
        <ArrowIcon />
      </ItemWrapper>
    ))}
  </Wrapper>
)

export default NavigationList
