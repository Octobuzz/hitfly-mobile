import styled from 'src/styled-components'
import { IView } from './interfaces'

const ScrollView = styled.ScrollView.attrs(
  ({
    paddingTop,
    paddingBottom,
    paddingVertical,
    noVerticalPadding,
    noHorizontalPadding,
  }: IView) => ({
    contentContainerStyle: {
      paddingTop: noVerticalPadding ? 0 : paddingTop || paddingVertical || 16,
      paddingBottom: noVerticalPadding
        ? 0
        : paddingBottom || paddingVertical || 16,
      paddingVertical: noVerticalPadding ? 0 : 16,
      paddingHorizontal: noHorizontalPadding ? 0 : 16,
    },
  }),
)<IView>`
  ${({ noFill }) => !noFill && 'flex: 1;'}
`

export default ScrollView
