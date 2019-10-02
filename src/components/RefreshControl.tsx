import styled from 'src/styled-components'

const RefreshControl = styled.RefreshControl.attrs(
  ({
    theme: {
      colors: { brandPink },
    },
  }) => ({
    colors: [brandPink],
    tintColor: brandPink,
  }),
)``

export default RefreshControl
