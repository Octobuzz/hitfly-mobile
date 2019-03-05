import R from 'ramda'
import { appName } from '../constants'

export const getModuleActionName = R.curry(
  (moduleName, actionName) => `${appName}/${moduleName}/${actionName}`,
)

export const generateUID = (count = 10) => {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < count; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

export const hasValue = value => value !== undefined && value !== ''
