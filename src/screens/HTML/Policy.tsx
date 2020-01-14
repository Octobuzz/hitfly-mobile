import React from 'react'
import HTMLScreen from './HTML'
import { names } from 'src/constants'

interface Props {}

const Policy: React.FC<Props> = () => (
  <HTMLScreen url={`${names.DOMAIN_URL}policy-mobile`} />
)

export default Policy
