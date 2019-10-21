import React from 'react'
import { TextBase } from 'src/components'
import styled from 'src/styled-components'

const IconWrapper = styled.View`
  width: 40px;
  height: 40px;
  margin-right: 14px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.inputBorder};
`

const Icon = styled.Image``

const Text = styled(props => <TextBase {...props} />)`
  font-size: 14px;
  flex: 1;
  color: ${({ theme }) => theme.colors.textAlt};
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`

const FeaturesWrapper = styled.View`
  padding-horizontal: 22px;
`

export interface Feature {
  icon: number
  title: string
}

interface Props {
  features: Feature[]
}

const Features = ({ features }: Props) => (
  <FeaturesWrapper>
    {features.map(({ icon, title }) => (
      <Row key={title}>
        <IconWrapper>
          <Icon source={icon} />
        </IconWrapper>
        <Text>{title}</Text>
      </Row>
    ))}
  </FeaturesWrapper>
)

export default Features
