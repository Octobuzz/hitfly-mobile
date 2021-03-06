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
  PlaylistTrack,
  TextWithLines,
  SelectableGenreItem,
} from 'src/components'
import { PlaylistScreen } from 'src/screens'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'src/styled-components'
import { Track, Genre } from 'src/apollo'

storiesOf('Button', module)
  .add('Gradient', () => <Button title="Gradient" type="gradient" />)
  .add('Outline black', () => <Button title="Black" type="outline-black" />)
  .add('Outline', () => <Button title="Outline" type="outline" />)
  .add('Outline with Loader', () => (
    <Button isLoading title="Outline" type="outline" />
  ))
  .add('Outline black with Loader', () => (
    <Button title="Black" isLoading type="outline-black" />
  ))
  .add('Gradient with Loader', () => <Button isLoading title="Gradient" />)
storiesOf('More', module).add('Default', () => (
  // eslint-disable-next-line react-native/no-inline-styles
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
    <SocialButton buttonData={{ type: 'vkontakte', url: '', isLinked: true }} />
    <SocialButton buttonData={{ type: 'instagram', url: '', isLinked: true }} />
    <SocialButton buttonData={{ type: 'facebook', url: '', isLinked: true }} />
    <SocialButton
      buttonData={{ type: 'odnoklassniki', url: '', isLinked: true }}
    />
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
      options={[
        { value: 'm', title: 'Male' },
        { value: 'f', title: 'Female' },
      ]}
      {...formikBag}
    />
  ))

const genre = {
  id: 1,
  title: 'name',
  imageUrl:
    'https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-260nw-407021107.jpg',
} as Genre

const GenreItemStory = () => {
  const [isSelected, setSelected] = React.useState(false)
  return (
    <SelectableGenreItem
      item={genre}
      onPress={() => setSelected(!isSelected)}
      onPressSubGenres={() => {}}
      isSelected={isSelected}
    />
  )
}

storiesOf('GenreItem', module)
  .add('SelectableGenreItem', () => <GenreItemStory />)
  .add('GenreItem', () => <GenreItem item={genre} onPress={() => {}} />)

const track = {
  id: 1,
  cover: [
    {
      imageUrl:
        'https://images.unsplash.com/photo-1541233349642-6e425fe6190e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    },
  ],
  title: 'Some track title',
  group: {
    title: 'Some group title',
  },
} as Track
storiesOf('PlaylistTrack', module)
  .add('Paused', () => <PlaylistTrack track={track} index={1} />)
  .add('Playing', () => <PlaylistTrack isPlaying track={track} index={1} />)

const getMockPlaylist = (): Track[] => {
  const result = []
  for (let id = 0; id < 101; id++) {
    result.push({ ...track, id })
  }
  return result
}

storiesOf('PlaylistScreen', module).add('Default', () => (
  <PlaylistScreen
    cover={{
      uri:
        'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg',
    }}
    tracks={getMockPlaylist()}
    favouritesCount={100}
  />
))
