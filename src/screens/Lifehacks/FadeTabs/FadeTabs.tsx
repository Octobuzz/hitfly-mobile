import React, { useRef, useState, useCallback } from 'react'
import * as Animated from 'react-native-animatable'
import FadedButton from './FadedButton'
import styled from 'src/styled-components'

export interface TabValue<T> {
  title: string
  value: T
}

interface Props<T> {
  values: TabValue<T>[]
  onPressTab: (value: T) => void
}

const TabsWrapper = styled.View`
  padding: 24px 16px 8px;
  flex-direction: row;
`

const AnimatedView = styled(Animated.View)`
  flex: 1;
`

const FadeTabs = <T extends any>({
  values,
  onPressTab,
  children,
}: React.PropsWithChildren<Props<T>>): React.ReactElement => {
  const [activeTab, setActiveTab] = useState<T>(values[0].value)

  const animatedRef = useRef<Animated.View>(null)
  const handlePressWithFade = useCallback(
    async (newValue: T) => {
      setActiveTab(newValue)
      await animatedRef.current?.fadeOut?.(300)
      onPressTab(newValue)
      await animatedRef.current?.fadeIn?.(300)
    },
    [onPressTab],
  )

  return (
    <>
      <TabsWrapper>
        {values.map(({ title, value }, index) => (
          <FadedButton
            key={title}
            onPress={() => handlePressWithFade(value)}
            title={title}
            isActive={activeTab === value}
            isFirst={index === 0}
          />
        ))}
      </TabsWrapper>
      {/* FIXME: https://github.com/oblador/react-native-animatable/pull/301 */}
      <AnimatedView ref={animatedRef as any}>{children}</AnimatedView>
    </>
  )
}

export default FadeTabs
