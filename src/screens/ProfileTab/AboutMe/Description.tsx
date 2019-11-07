import React from 'react'
import { TextBase, H2 } from 'src/components'
import Block from './Block'
import styled from 'src/styled-components'

const IndentedH2 = styled(H2)`
  margin-bottom: 24px;
`

const YearText = styled(TextBase)`
  font-size: 14px;
  line-height: 14px;
  margin-bottom: 10px;
  font-family: ${({ theme }) => theme.fonts.medium};
`

const DescriptionText = styled(TextBase)`
  font-size: 14px;
  line-height: 20px;
`

interface Props {
  description: string | null
  careerStartDate: string
}

const Description: React.FC<Props> = ({ careerStartDate, description }) => {
  const content: React.ReactNode[] = []
  if (careerStartDate) {
    content.push(
      <YearText key="year">
        Год начала карьеры <DescriptionText>{careerStartDate}</DescriptionText>
      </YearText>,
    )
  }

  if (description) {
    content.push(
      <DescriptionText key="description">{description}</DescriptionText>,
    )
  }

  if (!content.length) {
    return null
  }
  return (
    <Block>
      <IndentedH2>Описание</IndentedH2>
      {content}
    </Block>
  )
}

export default Description
