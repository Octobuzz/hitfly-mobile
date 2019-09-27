import React from 'react'
import { View, TextBase } from 'src/components'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'src/styled-components'
import { Profile } from 'src/apollo'

const Block = styled.View`
  padding-vertical: 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.inputBorder};
`

const StyledIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.inputBorder,
  size: 20,
}))`
  margin-right: 8px;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const NoInfoText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textAlt};
  text-align: center;
`

interface Props {
  profile: Profile
}

class AboutMe extends React.Component<Props> {
  private renderProfileInfo = (): React.ReactNode => {
    const {
      profile: { favouriteGenres, location },
    } = this.props
    const content: React.ReactNode[] = []

    if (favouriteGenres) {
      content.push(
        <Row>
          <StyledIcon name="ios-musical-notes" />
          <TextBase>
            {favouriteGenres.map(({ title }) => title).join(', ')}
          </TextBase>
        </Row>,
      )
    }

    if (location) {
      content.push(
        <Row>
          <StyledIcon name="md-pin" />
          <TextBase>{location.title}</TextBase>
        </Row>,
      )
    }

    if (!content.length) {
      content.push(
        <NoInfoText>
          Заполните информацию о себе в разделе «Настройки»
        </NoInfoText>,
      )
    }

    return <Block>{content}</Block>
  }

  render() {
    return <View>{this.renderProfileInfo()}</View>
  }
}

export default AboutMe
