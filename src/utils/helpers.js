import R from 'ramda'
import { APP_NAME } from '../constants/names'

export const getModuleActionName = R.curry(
  (moduleName, actionName) => `${APP_NAME}/${moduleName}/${actionName}`,
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

export const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj),
  ),
)

export const getNameForCount = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ]
}

export const hexToRgb = hex => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export const getSectionGradientColor = (
  firstColor,
  secondColor,
  section /*0..1*/,
) => {
  const firstRGBColor = hexToRgb(firstColor)
  const secondRGBColor = hexToRgb(secondColor)
  const red = Math.round(
    firstRGBColor.r + section * (secondRGBColor.r - firstRGBColor.r),
  )
  const green = Math.round(
    firstRGBColor.g + section * (secondRGBColor.g - firstRGBColor.g),
  )
  const blue = Math.round(
    firstRGBColor.b + section * (secondRGBColor.b - firstRGBColor.b),
  )
  return `rgb(${red}, ${green}, ${blue})`
}

export const secondsToStringTime = (sec, separator = '.', mode = '') => {
  const hours = Math.floor((sec / (60 * 60)) % 60)
  const minutes = Math.floor((sec / 60) % 60)
  const seconds =
    Math.floor(sec % 60) > 9 ? Math.floor(sec % 60) : `0${Math.floor(sec % 60)}`
  if (mode === 'playlistInfo') {
    return !hours
      ? `${minutes} ${getNameForCount(minutes, [
          'минута',
          'минуты',
          'минут',
        ])} ${seconds} ${getNameForCount(seconds, [
          'секунда',
          'секунды',
          'секунд',
        ])}`
      : `${hours} ${getNameForCount(hours, [
          'час',
          'часа',
          'часов',
        ])} ${minutes} ${getNameForCount(minutes, [
          'минута',
          'минуты',
          'минут',
        ])}`
  } else {
    return !hours
      ? `${minutes}${separator}${seconds}`
      : `${hours}${separator}${minutes}${separator}${seconds}`
  }
}

export const getNumberMultiple_05 = num => {
  const whole = Math.trunc(num)
  const fract = Math.trunc((num % 1) * 10) >= 5 ? 0.5 : 0
  return whole + fract
}
