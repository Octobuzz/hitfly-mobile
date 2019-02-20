import R from 'ramda'
import { appName } from '../constants'

export const getModuleActionName = R.curry(
  (moduleName, actionName) => `${appName}/${moduleName}/${actionName}`,
)
