import React from 'react'
import { storiesOf } from '@storybook/react-native'
import {
  Link,
  More,
  Input,
  Button,
  Dropdown,
  GenreItem,
  DatePicker,
  CheckBoxUI,
  SocialButton,
  TextWithLines,
} from 'src/components'
import { PlaylistScreen } from 'src/screens'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'src/styled-components'

storiesOf('Button', module)
  .add('Gradient', () => <Button title="Gradient" type="gradient" />)
  .add('Outline', () => <Button title="Outline" type="outline" />)
  .add('Gradient with Loader', () => (
    <Button isLoading title="Outline" type="outline" />
  ))
storiesOf('More', module).add('Default', () => (
  <More style={{ backgroundColor: 'green' }} />
))
storiesOf('Link', module).add('Default', () => <Link title="Link" />)

const CenterContainer = styled.View`
  align-items: center;
  justify-content: space-around;
  flex: 1;
`
storiesOf('SocialButton', module).add('Default', () => (
  <CenterContainer>
    <SocialButton data={{ type: 'vk', url: '' }} />
    <SocialButton data={{ type: 'gg', url: '' }} />
    <SocialButton data={{ type: 'fb', url: '' }} />
    <SocialButton data={{ type: 'ok', url: '' }} />
  </CenterContainer>
))

storiesOf('TextWithLines', module).add('Default', () => (
  <TextWithLines>Text with lines</TextWithLines>
))

const formikBag: any = {
  field: {
    name: 'name',
    value: '',
    onChange: () => () => {},
    onBlur: () => () => {},
  },
  form: {
    setFieldTouched: () => {},
    setFieldValue: () => {},
    errors: {},
    touched: {},
  },
}

const Text = styled.Text``
class CheckBoxUIStory extends React.Component<{}, { isChecked: boolean }> {
  state = {
    isChecked: false,
  }
  private toggleCheck = () => {
    this.setState({ isChecked: !this.state.isChecked })
  }
  render() {
    const { isChecked } = this.state
    return (
      <CheckBoxUI onPress={this.toggleCheck} isChecked={isChecked}>
        <Text>CheckBoxUI</Text>
      </CheckBoxUI>
    )
  }
}

storiesOf('Inputs', module)
  .add('Input', () => (
    <Input
      label="label"
      RightIcon={<Icon name="mail-outline" size={16} />}
      {...formikBag}
    />
  ))
  .add('DatePicker', () => (
    <DatePicker
      label="label"
      RightIcon={<Icon name="mail-outline" size={16} />}
      {...formikBag}
    />
  ))
  .add('CheckBoxUI', () => <CheckBoxUIStory />)
  .add('Dropdown', () => (
    <Dropdown
      label="label"
      options={[{ value: 'm', title: 'Male' }, { value: 'f', title: 'Female' }]}
      {...formikBag}
    />
  ))

const GenreItemStory = () => {
  const [isSelected, setSelected] = React.useState(false)
  return (
    <GenreItem
      item={{
        id: 1,
        title: 'name',
        imageUrl:
          'https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-260nw-407021107.jpg',
      }}
      onPress={() => setSelected(!isSelected)}
      isSelected={isSelected}
    />
  )
}

storiesOf('GenreItem', module).add('Default', () => <GenreItemStory />)

storiesOf('PlaylistScreen', module).add('Default', () => (
  <PlaylistScreen
    cover={{
      uri:
        'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg',
    }}
    tracks={[{ length: 1360, id: 1 }]}
    favouriteCount={100}
  />
))
