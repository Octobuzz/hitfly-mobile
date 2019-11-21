import {
  getNameForTrack,
  getNameForCount,
  formatTracksCount,
  formatTimeDurationForTrack,
  formatTimeDurationForPlaylist,
  getNextBonusProgramHumanReadable,
  getBonusProgramLevelHumanReadable,
} from 'src/helpers'
import { BonusProgramLevel } from 'src/apollo'

describe('getBonusProgramLevelHumanReadable', () => {
  it('LEVEL_NOVICE should be: 👶🏻 Новичок', () => {
    expect(
      getBonusProgramLevelHumanReadable(BonusProgramLevel.LEVEL_NOVICE),
    ).toBe('👶🏻 Новичок')
  })

  it('LEVEL_AMATEUR should be: 🎤 Любитель', () => {
    expect(
      getBonusProgramLevelHumanReadable(BonusProgramLevel.LEVEL_AMATEUR),
    ).toBe('🎤 Любитель')
  })

  it('LEVEL_CONNOISSEUR_OF_THE_GENRE should be: 🎸 Знаток жанра', () => {
    expect(
      getBonusProgramLevelHumanReadable(
        BonusProgramLevel.LEVEL_CONNOISSEUR_OF_THE_GENRE,
      ),
    ).toBe('🎸 Знаток жанра')
  })

  it('LEVEL_SUPER_MUSIC_LOVER should be: 🎧 Супер меломан', () => {
    expect(
      getBonusProgramLevelHumanReadable(
        BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER,
      ),
    ).toBe('🎧 Супер меломан')
  })
})

describe('getNextBonusProgramHumanReadable', () => {
  it('LEVEL_NOVICE should be: 🎤 Любитель', () => {
    expect(
      getNextBonusProgramHumanReadable(BonusProgramLevel.LEVEL_NOVICE),
    ).toBe('🎤 Любитель')
  })

  it('LEVEL_AMATEUR should be: 🎸 Знаток жанра', () => {
    expect(
      getNextBonusProgramHumanReadable(BonusProgramLevel.LEVEL_AMATEUR),
    ).toBe('🎸 Знаток жанра')
  })

  it('LEVEL_CONNOISSEUR_OF_THE_GENRE should be: 🎧 Супер меломан', () => {
    expect(
      getNextBonusProgramHumanReadable(
        BonusProgramLevel.LEVEL_CONNOISSEUR_OF_THE_GENRE,
      ),
    ).toBe('🎧 Супер меломан')
  })

  it('LEVEL_SUPER_MUSIC_LOVER should be undefiend', () => {
    expect(
      getNextBonusProgramHumanReadable(
        BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER,
      ),
    ).toBeUndefined()
  })
})

describe('getNameForCount', () => {
  it('should be: час with count === 1', () => {
    expect(
      getNameForCount(
        {
          nominative: 'час',
          genitive: 'часа',
          genitiveMultiple: 'часов',
        },
        1,
      ),
    ).toBe('час')
  })
  it('should be: часа with count === 2', () => {
    expect(
      getNameForCount(
        {
          nominative: 'час',
          genitive: 'часа',
          genitiveMultiple: 'часов',
        },
        2,
      ),
    ).toBe('часа')
  })
  it('should be: часов with count === 11', () => {
    expect(
      getNameForCount(
        {
          nominative: 'час',
          genitive: 'часа',
          genitiveMultiple: 'часов',
        },
        11,
      ),
    ).toBe('часов')
  })
  it('should be: часов with count === 100', () => {
    expect(
      getNameForCount(
        {
          nominative: 'час',
          genitive: 'часа',
          genitiveMultiple: 'часов',
        },
        100,
      ),
    ).toBe('часов')
  })
})

describe('formatTracksCount', () => {
  it('should render string correctly with 10', () => {
    expect(formatTracksCount(10)).toBe(`${10} ${getNameForTrack(10)}`)
  })

  it('should render string correctly with -100', () => {
    expect(formatTracksCount(-100)).toBe(`${-100} ${getNameForTrack(-100)}`)
  })
})

describe('formatTimeDurationForTrack', () => {
  it('should be 0:10 with 10', () => {
    expect(formatTimeDurationForTrack(10)).toBe('0:10')
  })

  it('should be 26:40 with 1600', () => {
    expect(formatTimeDurationForTrack(1600)).toBe('26:40')
  })

  it('should be 2:46:40 with 10000', () => {
    expect(formatTimeDurationForTrack(10000)).toBe('2:46:40')
  })
})

describe('formatTimeDurationForPlaylist', () => {
  it('should be 6 минут with 400', () => {
    expect(formatTimeDurationForPlaylist(400)).toBe('6 минут')
  })
  it('should be 26 минут with 1600', () => {
    expect(formatTimeDurationForPlaylist(1600)).toBe('26 минут')
  })
  it('should be 2 часа 46 минут with 10000', () => {
    expect(formatTimeDurationForPlaylist(10000)).toBe('2 часа 46 минут')
  })
  it('should be 2 ч 46 м 40 с with 10000 and {withSeconds: true, useShortSyntax: true}', () => {
    expect(
      formatTimeDurationForPlaylist(10000, {
        withSeconds: true,
        useShortSyntax: true,
      }),
    ).toBe('2 ч 46 м 40 с')
  })
  it('should be 2 ч 46 м with 10000 and {withSeconds: false, useShortSyntax: true}', () => {
    expect(
      formatTimeDurationForPlaylist(10000, {
        withSeconds: false,
        useShortSyntax: true,
      }),
    ).toBe('2 ч 46 м')
  })
  it('should be 2 часа 46 минут with 10000 and {withSeconds: false, useShortSyntax: false}', () => {
    expect(
      formatTimeDurationForPlaylist(10000, {
        withSeconds: false,
        useShortSyntax: false,
      }),
    ).toBe('2 часа 46 минут')
  })
  it('should be 2 часов 46 минут 40 секунд with 10000 and {withSeconds: true, useShortSyntax: false}', () => {
    expect(
      formatTimeDurationForPlaylist(10000, {
        withSeconds: true,
        useShortSyntax: false,
      }),
    ).toBe('2 часа 46 минут 40 секунд')
  })
})
