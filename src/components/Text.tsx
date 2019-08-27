import React from 'react'
import styled from '../styled-components'

interface ITextBase {
  weightType?: 'bold' | 'light' | 'regular'
}

enum FontFamilies {
  light = 'GothamProLight',
  regular = 'GothamProRegular',
  bold = 'GothamProBold',
}

const TextBase = styled.Text<ITextBase>`
  font-family: ${({ weightType }) =>
    weightType ? FontFamilies[weightType] : FontFamilies.regular};
  font-size: 16px;
`
