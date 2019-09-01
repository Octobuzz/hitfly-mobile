import R from 'ramda'
import React from 'react'
import {
  View,
  Loader,
  Button,
  GenreItem,
  HelperText,
  IGenreItem,
} from 'src/components'
import styled from 'src/styled-components'
import SectionHeader from './SectionHeader'

const Wrapper = styled.View``

class GenresSection extends React.Component {
  render() {
    return (
      <Wrapper>
        <SectionHeader title="Жанры" />
      </Wrapper>
    )
  }
}

export default GenresSection
