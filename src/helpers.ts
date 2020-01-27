import L from 'lodash'
import LFP from 'lodash/fp'
import { BonusProgramLevel, Image, ImageSizeNames } from 'src/apollo'
import SplashScreen from 'react-native-splash-screen'
import { images as localImages } from 'src/constants'

/* istanbul ignore next */
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
    const absCount = Math.abs(count)
    if (absCount > 10 && absCount < 20) {
      return genitiveMultiple
    }

    const mod10 = absCount % 10
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
  {
    withSeconds,
    useShortSyntax,
  }: { withSeconds?: boolean; useShortSyntax?: boolean } = {},
): string => {
  const result: string[] = []
  const hours = Math.trunc(initialSeconds / 3600)

  if (hours > 0) {
    result.push(`${hours} ${useShortSyntax ? 'ч' : getNameForHours(hours)}`)
  }
  const minutes = Math.trunc((initialSeconds % 3600) / 60)
  if (minutes > 0) {
    result.push(
      `${minutes} ${useShortSyntax ? 'м' : getNameForMinutes(minutes)}`,
    )
  }
  const seconds = Math.trunc(initialSeconds % 60)
  if (withSeconds && seconds > 0) {
    result.push(
      `${seconds} ${useShortSyntax ? 'с' : getNameForSeconds(seconds)}`,
    )
  }

  return result.join(' ')
}

export const getNameForTrack = getNameForCount({
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

interface BonusProgramTexts {
  icon: number
  title: string
  order: number
}

const bonusProgramMap = new Map<BonusProgramLevel, BonusProgramTexts>([
  [
    BonusProgramLevel.LEVEL_NOVICE,
    {
      title: 'Новичок',
      icon: localImages.CHILD,
      order: 0,
    },
  ],
  [
    BonusProgramLevel.LEVEL_AMATEUR,
    {
      title: 'Любитель',
      icon: localImages.KARAOKE,
      order: 1,
    },
  ],
  [
    BonusProgramLevel.LEVEL_CONNOISSEUR_OF_THE_GENRE,
    {
      title: 'Знаток жанра',
      icon: localImages.GUITAR,
      order: 2,
    },
  ],
  [
    BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER,
    {
      title: 'Супер меломан',
      icon: localImages.HEADPHONE,
      order: 3,
    },
  ],
])

export const getBonusProgramLevelHumanReadable = (
  level: BonusProgramLevel,
): BonusProgramTexts => {
  const bonusProgramTexts = bonusProgramMap.get(level)!
  return bonusProgramTexts
}

export const getNextBonusProgramHumanReadable = (
  level: BonusProgramLevel,
): BonusProgramTexts | undefined => {
  const currentProgram = bonusProgramMap.get(level) as BonusProgramTexts
  let nextProgram: BonusProgramTexts | undefined
  for (const bp of bonusProgramMap.values()) {
    if (bp.order > currentProgram.order) {
      nextProgram = bp
      break
    }
  }
  if (nextProgram) {
    return nextProgram
  }
}

/* istanbul ignore next */
const customizer = (objValue: any, srcValue: any): any => {
  if (L.isArray(objValue)) {
    return srcValue.concat(objValue)
  } else if (!L.isObject(objValue)) {
    return objValue
  }
}

export const mergeRight = (source: object, obj: object): object => {
  return LFP.mergeWith(customizer, obj, source)
}

/* istanbul ignore next */
export const randomString = (): string =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15)

export const getImageForSize = (
  images: Image[],
  size: ImageSizeNames,
): Image => {
  let image = images[0] || ({ imageUrl: '' } as Image)
  if (images.length > 1) {
    image = images.find(img => img.sizeName === size) || image
  }
  return image
}

// так как используется анимированный Switch, нужна задержка перед скрытием сплеша
// 400 - дефолт анимация сплеша, 100 - на всякий случай
/* istanbul ignore next */
export const hideSplashScreenWithTimeout = async (): Promise<void> => {
  await delay(500)
  SplashScreen.hide()
}
