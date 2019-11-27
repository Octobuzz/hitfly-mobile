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
import { images } from 'src/constants'

const levels = {
  [BonusProgramLevel.LEVEL_NOVICE]: {
    title: 'Новичок',
    icon: images.CHILD,
    order: 0,
  },

  [BonusProgramLevel.LEVEL_AMATEUR]: {
    title: 'Любитель',
    icon: images.KARAOKE,
    order: 1,
  },
  [BonusProgramLevel.LEVEL_CONNOISSEUR_OF_THE_GENRE]: {
    title: 'Знаток жанра',
    icon: images.GUITAR,
    order: 2,
  },
  [BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER]: {
    title: 'Супер меломан',
    icon: images.HEADPHONE,
    order: 3,
  },
}

describe('getBonusProgramLevelHumanReadable', () => {
  it('LEVEL_NOVICE', () => {
    expect(
      getBonusProgramLevelHumanReadable(BonusProgramLevel.LEVEL_NOVICE),
    ).toBe(levels[BonusProgramLevel.LEVEL_NOVICE])
  })

  it('LEVEL_AMATEUR', () => {
    expect(
      getBonusProgramLevelHumanReadable(BonusProgramLevel.LEVEL_AMATEUR),
    ).toBe(levels[BonusProgramLevel.LEVEL_AMATEUR])
  })

  it('LEVEL_CONNOISSEUR_OF_THE_GENRE', () => {
    expect(
      getBonusProgramLevelHumanReadable(
        BonusProgramLevel.LEVEL_CONNOISSEUR_OF_THE_GENRE,
      ),
    ).toBe(levels[BonusProgramLevel.LEVEL_CONNOISSEUR_OF_THE_GENRE])
  })

  it('LEVEL_SUPER_MUSIC_LOVER', () => {
    expect(
      getBonusProgramLevelHumanReadable(
        BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER,
      ),
    ).toBe(levels[BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER])
  })
})

describe('getNextBonusProgramHumanReadable', () => {
  it('LEVEL_NOVICE', () => {
    expect(
      getBonusProgramLevelHumanReadable(BonusProgramLevel.LEVEL_AMATEUR),
    ).toBe(levels[BonusProgramLevel.LEVEL_AMATEUR])
  })

  it('LEVEL_AMATEUR', () => {
    expect(
      getBonusProgramLevelHumanReadable(
        BonusProgramLevel.LEVEL_CONNOISSEUR_OF_THE_GENRE,
      ),
    ).toBe(levels[BonusProgramLevel.LEVEL_CONNOISSEUR_OF_THE_GENRE])
  })

  it('LEVEL_CONNOISSEUR_OF_THE_GENRE', () => {
    expect(
      getBonusProgramLevelHumanReadable(
        BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER,
      ),
    ).toBe(levels[BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER])
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
