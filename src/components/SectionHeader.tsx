import React from 'react'
import TextBase from './TextBase'
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
  line-height: 24px;
`

const RightText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textGray};
  font-size: 12px;
  flex: 1;
  text-align: right;
`

const SubtitleText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textAlt};
  font-size: 12px;
  margin-top: 7px;
`

interface Props {
  title: string
  subtitle?: string
  rightText?: string
  onPress?: () => void
}

const SectionHeader: React.FC<Props> = ({
  title,
  onPress,
  subtitle,
  rightText,
}) => (
  <Wrapper disabled={!onPress} onPress={onPress}>
    <Inner>
      <TitleText>{title}</TitleText>
      {onPress && <Icon name="arrow-forward" size={20} />}
      {rightText && <RightText>{rightText}</RightText>}
    </Inner>
    {subtitle && <SubtitleText>{subtitle}</SubtitleText>}
  </Wrapper>
)

export default SectionHeader
