import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { View, Stretcher, Button, TextBase, Link } from 'src/components'
import { images } from 'src/constants'
import styled from 'src/styled-components'
import { ROUTES } from 'src/navigation'

const Container = styled.SafeAreaView`
  flex: 1;
`

const HelperText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textAlt};
  text-align: center;
  margin-bottom: 40px;
`

const IndentedButton = styled(Button)`
  margin-bottom: 24px;
`

const ScrollView = styled.ScrollView`
  flex: 1;
  margin-bottom: 40px;
`

class SelectGenre extends React.Component<NavigationScreenProps> {
  private navigateToMain = () => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.APP.MAIN)
  }

  render() {
    return (
      <Container>
        <View>
          <HelperText>
            Отметьте жанры, которые Вам нравятся. Это поможет получать более
            точные и интересные рекомендации
          </HelperText>
          <ScrollView></ScrollView>
          <IndentedButton title="Готово" />
          <Link onPress={this.navigateToMain} title="Пропустить" />
        </View>
      </Container>
    )
  }
}

export default SelectGenre
