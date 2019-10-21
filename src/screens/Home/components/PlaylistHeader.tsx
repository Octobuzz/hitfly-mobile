import React from 'react'
import { TextBase } from 'src/components'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'src/styled-components'

const Wrapper = styled.View``

const Inner = styled.View`
  align-items: center;
  flex-direction: row;
`

const TitleText = styled(props => <TextBase {...props} />)`
  font-size: 20px;
  margin-right: 8px;
  line-height: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.textWhite};
`

const SubtitleText = styled(props => <TextBase {...props} />)`
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 12px;
  margin-top: 7px;
`

const ArrowIcon = styled(Icon).attrs(() => ({
  name: 'arrow-forward',
  size: 20,
}))`
  color: ${({ theme }) => theme.colors.textWhite};
`

interface Props {
  title: string
  subtitle?: string
}

const PlaylistHeader: React.FC<Props> = ({ title, subtitle }) => (
  <Wrapper>
    <Inner>
      <TitleText>{title}</TitleText>
      <ArrowIcon />
    </Inner>
    {subtitle && <SubtitleText>{subtitle}</SubtitleText>}
  </Wrapper>
)

export default PlaylistHeader
