import L from 'lodash'
import { Platform, StatusBar } from 'react-native'
import { HeaderMode } from 'src/apollo'

export const delay = (ms: number): Promise<void> =>
  new Promise(res => setTimeout(res, ms))

type Validation = Record<string, string[]>

interface FormErrorsInput {
  graphQLErrors: [
    {
      validation: Validation
    },
  ]
}
type FormErrorsOutput = Record<string, string>

export const transformFormErrors = (
  error: FormErrorsInput,
): FormErrorsOutput => {
  const validation: Validation | undefined = L.get(
    error,
    'graphQLErrors[0].validation',
  )
  if (!validation) {
    return {}
  }

  const result = L.mapValues(validation, value => value.join('\n'))

  return result
}

export const getNameForCount = L.curry(
  (
    {
      nominative,
      genitive,
      genitiveMultiple,
    }: { nominative: string; genitive: string; genitiveMultiple: string },
    count: number,
  ) => {
    if (count > 10 && count < 20) {
      return genitiveMultiple
    }

    const mod10 = count % 10
    return mod10 === 1
      ? nominative
      : [2, 3, 4].includes(mod10)
      ? genitive
      : genitiveMultiple
  },
)

const getNameForHours = getNameForCount({
  nominative: 'час',
  genitive: 'часа',
  genitiveMultiple: 'часов',
})
const getNameForMinutes = getNameForCount({
  nominative: 'минута',
  genitive: 'минуты',
  genitiveMultiple: 'минут',
})
const getNameForSeconds = getNameForCount({
  nominative: 'секунда',
  genitive: 'секунды',
  genitiveMultiple: 'секунд',
})

export const formatTimeDurationForPlaylist = (
  initialSeconds: number,
  withSeconds?: boolean,
): string => {
  const result: string[] = []
  const hours = Math.trunc(initialSeconds / 3600)

  if (hours > 0) {
    result.push(`${hours} ${getNameForHours(hours)}`)
  }
  const minutes = Math.trunc((initialSeconds % 3600) / 60)
  if (minutes > 0) {
    result.push(`${minutes} ${getNameForMinutes(minutes)}`)
  }
  const seconds = Math.trunc(initialSeconds % 60)
  if (withSeconds && seconds > 0) {
    result.push(`${seconds} ${getNameForSeconds(seconds)}`)
  }

  return result.join(' ')
}

const getNameForTrack = getNameForCount({
  nominative: 'песня',
  genitive: 'песни',
  genitiveMultiple: 'песен',
})

export const formatTracksCount = (count: number): string => {
  const name = getNameForTrack(count)
  return `${count} ${name}`
}

export const formatTimeDurationForTrack = (initialSeconds: number): string => {
  const result: string[] = []
  const hours = Math.trunc(initialSeconds / 3600)

  let withHours = false
  if (hours > 0) {
    withHours = true
    result.push(hours.toString())
  }
  const minutes = Math.trunc((initialSeconds % 3600) / 60)

  if (withHours) {
    const paddedMinutes = `${minutes < 10 ? '0' : ''}${minutes}`
    result.push(paddedMinutes)
  } else {
    result.push(minutes.toString())
  }
  const seconds = Math.trunc(initialSeconds % 60)
  const paddedSeconds = `${seconds < 10 ? '0' : ''}${seconds}`
  result.push(paddedSeconds)

  return result.join(':')
}

export const setStatusBarColor = (mode: HeaderMode): void => {
  if (Platform.OS === 'ios') {
    StatusBar.setBarStyle(
      mode === 'dark' ? 'dark-content' : 'light-content',
      true,
    )
  }
}
