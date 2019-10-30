import React, { useCallback } from 'react'
import { Genre } from 'src/apollo'
import { TextBase, CheckBoxUI } from 'src/components'
import styled from 'src/styled-components'

const UpperText = styled(TextBase)`
  font-size: 10px;
  line-height: 10px;
  color: ${({ theme }) => theme.colors.transparentWhite50};
`

const GenreText = styled(TextBase)`
  font-size: 12px;
  line-height: 24px;
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
    <CheckBoxUI onPress={handlePress} isChecked={isSelected}>
      <RightBlock>
        <UpperText>{upperTitle}</UpperText>
        <GenreText>{title}</GenreText>
      </RightBlock>
    </CheckBoxUI>
  )
}

export default GenreCheckBox
