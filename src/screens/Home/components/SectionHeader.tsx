import React from 'react'
import { TextBase } from 'src/components'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'src/styled-components'

const Wrapper = styled.TouchableOpacity`
  padding: 0 16px 16px;
`

const Inner = styled.View`
  align-items: center;
  flex-direction: row;
`

const TitleText = styled(TextBase)`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 20px;
  margin-right: 8px;
`

const SubtitleText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textAlt};
  font-size: 12px;
  margin-top: 7px;
`

interface Props {
  onPress?: () => void
  title: string
  subtitle?: string
}

const SectionHeader: React.FC<Props> = ({ title, subtitle, onPress }) => (
  <Wrapper onPress={onPress} disabled={!!onPress}>
    <Inner>
      <TitleText>{title}</TitleText>
      <Icon name="arrow-forward" size={20} />
    </Inner>
    {subtitle && <SubtitleText>{subtitle}</SubtitleText>}
  </Wrapper>
)

export default SectionHeader
