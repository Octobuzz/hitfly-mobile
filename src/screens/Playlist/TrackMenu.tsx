import React from 'react'
import { Image, TextBase } from 'src/components'
import { Track } from 'src/apollo'
import styled from 'src/styled-components'

const Wrapper = styled.View``

const TrackWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

const StyledImage = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 4px;
`

const CenterBlock = styled.View`
  flex: 1;
  margin-horizontal: 16px;
`

const TitleText = styled(TextBase)`
  font-size: 12px;
  line-height: 14px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`

const SubtitleText = styled(TextBase)`
  font-size: 10px;
  line-height: 12px;
  opacity: 0.6;
  color: ${({ theme }) => theme.colors.white};
`

interface Props {
  track?: Track
}

const TrackMenu: React.FC<Props> = ({ track }) => {
  if (!track) {
    return null
  }
  const { cover, group, singer, title } = track
  return (
    <Wrapper>
      <TrackWrapper>
        <StyledImage source={{ uri: cover[0].imageUrl }} />
        <CenterBlock>
          <TitleText>{title}</TitleText>
          <SubtitleText>{group ? group.title : singer}</SubtitleText>
        </CenterBlock>
      </TrackWrapper>
    </Wrapper>
  )
}

export default TrackMenu
