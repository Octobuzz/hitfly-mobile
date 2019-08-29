import React from 'react'
import { storiesOf } from '@storybook/react-native'
import {
  Link,
  Input,
  Button,
  DatePicker,
  CheckBoxUI,
  SocialButton,
  TextWithLines,
} from 'src/components'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'src/styled-components'

storiesOf('Button', module)
  .add('Gradient', () => <Button title="Gradient" type="gradient" />)
  .add('Outline', () => <Button title="Outline" type="outline" />)
storiesOf('Link', module).add('Default', () => <Link title="Link" />)

const CenterContainer = styled.View`
  align-items: center;
  justify-content: space-around;
  flex: 1;
`
storiesOf('SocialButton', module).add('Default', () => (
  <CenterContainer>
    <SocialButton type="vk" />
    <SocialButton type="gg" />
    <SocialButton type="fb" />
    <SocialButton type="ok" />
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
