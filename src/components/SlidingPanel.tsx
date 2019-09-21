import React, { Ref } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import SlidingUpPanel, { SlidingUpPanelProps } from 'rn-sliding-up-panel'
import styled from 'src/styled-components'

const StyledPanel = styled(SlidingUpPanel).attrs(({ theme }) => ({
  containerStyle: {
    backgroundColor: theme.colors.black,
  },
}))``

const Body = styled.View`
  background-color: ${({ theme }) => theme.colors.black};
`

const TopNotch = styled.View`
  width: 40px;
  height: 3px;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 1px;
  align-self: center;
  background-color: ${({ theme }) => theme.colors.white};
`

interface Props extends SlidingUpPanelProps {
  forwardRef?: Ref<SlidingUpPanel>
}

interface State {
  contentHeight: number
}

class SlidingPanel extends React.Component<Props, State> {
  state: State = {
    contentHeight: 0,
  }

  private setContentHeight = (event: LayoutChangeEvent): void => {
    const contentHeight = event.nativeEvent.layout.height + getBottomSpace()
    this.setState({ contentHeight })
  }

  private getDraggableRange = (): { top: number; bottom: number } => {
    const { contentHeight } = this.state
    let top = contentHeight
    const bottomSpace = getBottomSpace()
    if (top && top - bottomSpace > 0) {
      top -= bottomSpace
    }
    return {
      top,
      bottom: -bottomSpace,
    }
  }

  render() {
    const { children, forwardRef } = this.props
    const { contentHeight } = this.state
    const draggableRange = this.getDraggableRange()
    return (
      <StyledPanel
        snappingPoints={[draggableRange.top]}
        draggableRange={draggableRange}
        height={contentHeight || undefined}
        ref={forwardRef}
      >
        <Body onLayout={this.setContentHeight}>
          <TopNotch />
          {children}
        </Body>
      </StyledPanel>
    )
  }
}

export default SlidingPanel
