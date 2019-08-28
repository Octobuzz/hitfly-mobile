import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { Button, Link } from 'src/components'

storiesOf('Button', module)
  .add('Gradient', () => <Button title="Gradient" type="gradient" />)
  .add('Outline', () => <Button title="Outline" type="outline" />)
storiesOf('Link', module).add('Default', () => <Link title="Link" />)
