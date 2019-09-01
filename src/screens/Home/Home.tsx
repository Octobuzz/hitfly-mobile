import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import styled from 'src/styled-components'
import GenresSection from './GenresSection'
import { IGenreItem } from 'src/components'

const Container = styled.SafeAreaView`
  flex: 1;
`

export interface Genre {
  id: number
  name: string
  image: string
}

interface GenreData {
  genre: Genre[]
}

class Home extends React.Component<NavigationScreenProps> {
  private handlePressGenreItem = (item: IGenreItem) => {}

  render() {
    return (
      <Container>
        <GenresSection onPressItem={this.handlePressGenreItem} />
      </Container>
    )
  }
}

export default Home
