import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import styled from 'src/styled-components'
import GenresSection from './GenresSection'

const Container = styled.SafeAreaView`
  flex: 1;
`

class Home extends React.Component {
  render() {
    return (
      <Container>
        <GenresSection />
      </Container>
    )
  }
}

export default Home
