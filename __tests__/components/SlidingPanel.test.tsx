import React from 'react'
import { View } from 'react-native'
import { SlidingPanel } from 'src/components'
import { render } from '../../jest/test-utils'

describe('SlidingPanel', () => {
  it('renders correctly without children', () => {
    const { asJSON } = render(<SlidingPanel />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly with children', () => {
    const { asJSON } = render(
      <SlidingPanel>
        <View style={{ height: 140 }} />
      </SlidingPanel>,
    )
    expect(asJSON()).toMatchSnapshot()
  })
})
