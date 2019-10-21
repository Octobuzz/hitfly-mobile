import React from 'react'
import { Image, TextBase } from 'src/components'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'src/styled-components'

const HeaderWrapper = styled.View`
  height: 45%;
  padding-left: 56px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom-left-radius: 28px;
  overflow: hidden;
`

const Cover = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const TitleText = styled(props => <TextBase {...props} />)`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
`

const SubTitleText = styled(props => <TextBase {...props} />)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 12px;
  line-height: 14px;
  margin-top: 24px;
`

const TabBarWrapper = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 56px;
`

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.brandBlue, theme.colors.brandPink],
}))`
  border-top-left-radius: 28px;
`

interface Props {
  title: string
  subtitle?: string
  imageUrl: string
  TabBar: React.ReactNode
}

const Header: React.FC<Props> = ({ title, subtitle, imageUrl, TabBar }) => (
  <HeaderWrapper>
    <Cover source={{ uri: imageUrl }} />
    <TitleText>{title}</TitleText>
    {subtitle && <SubTitleText>{subtitle}</SubTitleText>}
    <TabBarWrapper>
      <Gradient>{TabBar}</Gradient>
    </TabBarWrapper>
  </HeaderWrapper>
)

export default Header
