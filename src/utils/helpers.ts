import R from 'ramda'

export const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj),
  ),
)

export const delay = (ms: number): Promise<void> =>
  new Promise(res => setTimeout(res, ms))

// FIXME: удалить
export const generateUID = (count = 10) => {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < count; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// FIXME: удалить
export const hasValue = (value: any) => value !== undefined && value !== ''

// FIXME: переписать, ничего не понятно
export const getNameForCount = R.curry((titles: string[], count: number) => {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[
    count % 100 > 4 && count % 100 < 20
      ? 2
      : cases[count % 10 < 5 ? count % 10 : 5]
  ]
})

export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    throw Error(`Could not convert ${hex} to RGB`)
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

export const getSectionGradientColor = (
  firstColor: string,
  secondColor: string,
  section: number /*0..1*/,
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

const getNameForSeconds = getNameForCount(['секунда', 'секунды', 'секунд'])
const getNameForMinutes = getNameForCount(['минута', 'минуты', 'минут'])
const getNameForHours = getNameForCount(['час', 'часа', 'часов'])
export const secondsToStringTime = (
  sec: number,
  separator = '.',
  mode = '',
): string => {
  const hours = Math.floor((sec / (60 * 60)) % 60)
  const minutes = Math.floor((sec / 60) % 60)
  const seconds = Math.floor(sec % 60)
  if (mode === 'playlistInfo') {
    const minutesName = getNameForMinutes(minutes)
    if (hours) {
      const hoursName = getNameForHours(hours)
      return `${hours} ${hoursName} ${minutes} ${minutesName}`
    } else {
      const secondsName = getNameForSeconds(seconds)
      return `${minutes} ${minutesName} ${seconds} ${secondsName}`
    }
  } else {
    const stringSeconds = seconds > 9 ? `0${seconds}` : seconds
    const stringMinutes = minutes > 9 ? `0${minutes}` : minutes
    const result = hours
      ? [hours, stringMinutes, stringSeconds]
      : [stringMinutes, stringSeconds]

    return result.join(separator)
  }
}
