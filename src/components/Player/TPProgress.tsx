import PropTypes from 'prop-types'
import { ProgressComponent } from 'react-native-track-player'

class TPProgress extends ProgressComponent {
  state = {
    position: 0,
    bufferedPosition: 0,
    duration: 0,
  }

  componentDidUpdate(prevProps, prevState) {
    const { position, bufferedPosition, duration } = this.state
    const {
      position: prevPosition,
      bufferedPosition: prevBufferedPosition,
      duration: prevDuration,
    } = prevState
    const { onProgressUpdate } = this.props
    if (
      position !== prevPosition ||
      bufferedPosition !== prevBufferedPosition ||
      duration !== prevDuration
    ) {
      onProgressUpdate &&
        onProgressUpdate({ position, bufferedPosition, duration })
    }
  }

  render() {
    return null
  }
}

export default TPProgress
