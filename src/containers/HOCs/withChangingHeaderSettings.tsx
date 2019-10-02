import L from 'lodash'
import React from 'react'
import {
  withNavigation,
  NavigationInjectedProps,
  NavigationEventSubscription,
} from 'react-navigation'
import { MutateProps, withMutation } from '@apollo/react-hoc'
import { HeaderSettings } from 'src/apollo'
import gql from 'graphql-tag'

interface Props
  extends NavigationInjectedProps,
    MutateProps<void, { settings: Partial<HeaderSettings> }> {}

const SET_HEADER_SETTINGS = gql`
  mutation SetHeaderSettings($settings: HeaderSettings!) {
    setHeaderSettings(settings: $settings) @client
  }
`

const withChangingHeaderSettings = (nextSettings: Partial<HeaderSettings>) => (
  WrappedComponent: React.ComponentType<any>,
) => {
  class ChangingHeaderSettings extends React.Component<Props> {
    constructor(props: Props) {
      super(props)
      this.setupFocusListeners()
    }

    componentWillUnmount() {
      this.removeFocusListeners()
    }

    private willFocusSubscription?: NavigationEventSubscription

    private setupFocusListeners = (): void => {
      const { navigation, mutate } = this.props
      this.willFocusSubscription = navigation.addListener(
        'didFocus',
        async () => {
          await mutate({
            variables: { settings: nextSettings },
          })
        },
      )
    }

    private removeFocusListeners = (): void => {
      if (this.willFocusSubscription) {
        this.willFocusSubscription.remove()
      }
    }

    render() {
      const { mutate, ...rest } = this.props
      return <WrappedComponent {...rest} />
    }
  }

  return L.flowRight(
    withMutation(SET_HEADER_SETTINGS),
    withNavigation,
  )(ChangingHeaderSettings)
}

export default withChangingHeaderSettings
