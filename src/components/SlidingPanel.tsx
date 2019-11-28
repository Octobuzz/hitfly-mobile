import React, { forwardRef, useState, useCallback, useMemo } from 'react'
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

export type SlidingPanelInstance = SlidingUpPanel

interface Props extends SlidingUpPanelProps {}

const SlidingPanel = forwardRef<SlidingUpPanel, Props>(
  ({ children, ...rest }, ref) => {
    const [contentHeight, setHeight] = useState<number>(0)

    const setContentHeight = useCallback((event: LayoutChangeEvent): void => {
      const height = event.nativeEvent.layout.height + getBottomSpace()
      setHeight(height)
    }, [])

    const draggableRange = useMemo((): { top: number; bottom: number } => {
      const top = contentHeight
      return {
        top,
        bottom: 0,
      }
    }, [contentHeight])

    return (
      // @ts-ignore
      <StyledPanel
        // FIXME: надо добавить в самой либе свойство alwaysSnapToTop
        snappingPoints={[draggableRange.top]}
        draggableRange={draggableRange}
        height={contentHeight || undefined}
        ref={ref}
        {...rest}
      >
        <Body onLayout={setContentHeight}>
          <TopNotch />
          {children}
        </Body>
      </StyledPanel>
    )
  },
)

export default SlidingPanel
