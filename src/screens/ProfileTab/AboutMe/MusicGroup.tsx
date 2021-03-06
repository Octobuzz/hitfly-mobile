import React from 'react'
import { Image, TextBase } from 'src/components'
import styled from 'src/styled-components'

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`

const Cover = styled(Image)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-right: 8px;
`

const Block = styled.View`
  flex: 1;
`

const TitleText = styled(TextBase)`
  font-size: 12px;
  line-height: 12px;
  margin-bottom: 4px;
  font-family: ${({ theme }) => theme.fonts.medium};
`

const SubTitleText = styled(TextBase)`
  font-size: 10px;
  line-height: 10px;
  color: ${({ theme }) => theme.colors.textGray};
`

interface Props {
  imageUrl: string
  title: string
  subtitle: string
}

const MusicGroup: React.FC<Props> = ({ imageUrl, title, subtitle }) => (
  <Wrapper>
    <Cover source={{ uri: imageUrl }} />
    <Block>
      <TitleText>{title}</TitleText>
      <SubTitleText>{subtitle}</SubTitleText>
    </Block>
  </Wrapper>
)

export default MusicGroup
