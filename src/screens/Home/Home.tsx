import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Query } from '@apollo/react-components'
import { gql } from 'apollo-boost'
import GenresSection from './GenresSection'
import { IGenreItem } from 'src/components'
import styled from 'src/styled-components'
import { serverTransformers } from 'src/utils'

const Container = styled.SafeAreaView`
  flex: 1;
`

export interface Genre {
  id: number
  name: string
  image: string
}

interface GenreData {
  genre?: Genre[]
}

const GET_GENRES = gql`
  {
    genre {
      id
      name
      image
    }
  }
`

class Home extends React.Component<NavigationScreenProps> {
  private handlePressGenreItem = (item: IGenreItem) => {}

  render() {
    return (
      <Container>
        <Query<GenreData> query={GET_GENRES}>
          {({ loading, data }) => {
            let adaptedGenres
            if (data && data.genre) {
              adaptedGenres = data.genre.map(
                serverTransformers.serverGenreAdapter,
              )
            }
            return (
              <GenresSection
                genres={adaptedGenres}
                isLoading={loading}
                onPressItem={this.handlePressGenreItem}
              />
            )
          }}
        </Query>
      </Container>
    )
  }
}

export default Home
