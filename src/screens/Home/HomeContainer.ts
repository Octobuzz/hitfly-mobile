import L from 'lodash'
import { withApollo } from '@apollo/react-hoc'
import { withChangingHeaderSettings } from 'src/containers/HOCs'
import HomeScreen from './Home'

export default L.flowRight(
  withChangingHeaderSettings({ state: 'main', mode: 'dark' }),
  withApollo,
)(HomeScreen)
