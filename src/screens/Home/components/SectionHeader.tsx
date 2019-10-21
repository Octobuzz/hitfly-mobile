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

const TitleText = styled(props => <TextBase {...props} />)`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 20px;
  margin-right: 8px;
  line-height: 24px;
`

const SubtitleText = styled(props => <TextBase {...props} />)`
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
  <Wrapper disabled={!onPress} onPress={onPress}>
    <Inner>
      <TitleText>{title}</TitleText>
      {onPress && <Icon name="arrow-forward" size={20} />}
    </Inner>
    {subtitle && <SubtitleText>{subtitle}</SubtitleText>}
  </Wrapper>
)

export default SectionHeader
