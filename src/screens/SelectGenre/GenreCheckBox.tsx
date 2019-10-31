import React, { useCallback } from 'react'
import { Genre } from 'src/apollo'
import { TextBase, CheckBoxUI } from 'src/components'
import styled from 'src/styled-components'

const StyledCheckBox = styled(CheckBoxUI)`
  flex: 1;
  align-items: flex-end;
`

const UpperText = styled(TextBase)`
  font-size: 10px;
  line-height: 10px;
  color: ${({ theme }) => theme.colors.transparentWhite50};
`

const GenreText = styled(TextBase)`
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.white};
`

const RightBlock = styled.View``

interface Props {
  upperTitle: string
  genre: Genre
  onPress: (genre: Genre) => void
  isSelected: boolean
}

const GenreCheckBox: React.FC<Props> = ({
  genre,
  onPress,
  isSelected,
  upperTitle,
}) => {
  const { title } = genre
  const handlePress = useCallback((): void => {
    onPress(genre)
  }, [onPress, genre])

  return (
    <StyledCheckBox onPress={handlePress} isChecked={isSelected}>
      <RightBlock>
        <UpperText>{upperTitle}</UpperText>
        <GenreText>{title}</GenreText>
      </RightBlock>
    </StyledCheckBox>
  )
}

export default GenreCheckBox
