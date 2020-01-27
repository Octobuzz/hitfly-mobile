import {
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
    ).toEqual(levels[BonusProgramLevel.LEVEL_NOVICE])
  })

  it('LEVEL_AMATEUR', () => {
    expect(
      getBonusProgramLevelHumanReadable(BonusProgramLevel.LEVEL_AMATEUR),
    ).toEqual(levels[BonusProgramLevel.LEVEL_AMATEUR])
  })

  it('LEVEL_CONNOISSEUR_OF_THE_GENRE', () => {
    expect(
      getBonusProgramLevelHumanReadable(
        BonusProgramLevel.LEVEL_CONNOISSEUR_OF_THE_GENRE,
      ),
    ).toEqual(levels[BonusProgramLevel.LEVEL_CONNOISSEUR_OF_THE_GENRE])
  })

  it('LEVEL_SUPER_MUSIC_LOVER', () => {
    expect(
      getBonusProgramLevelHumanReadable(
        BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER,
      ),
    ).toEqual(levels[BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER])
  })
})

describe('getNextBonusProgramHumanReadable', () => {
  it('LEVEL_NOVICE', () => {
    expect(
      getBonusProgramLevelHumanReadable(BonusProgramLevel.LEVEL_AMATEUR),
    ).toEqual(levels[BonusProgramLevel.LEVEL_AMATEUR])
  })

  it('LEVEL_AMATEUR', () => {
    expect(
      getBonusProgramLevelHumanReadable(
        BonusProgramLevel.LEVEL_CONNOISSEUR_OF_THE_GENRE,
      ),
    ).toEqual(levels[BonusProgramLevel.LEVEL_CONNOISSEUR_OF_THE_GENRE])
  })

  it('LEVEL_CONNOISSEUR_OF_THE_GENRE', () => {
    expect(
      getBonusProgramLevelHumanReadable(
        BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER,
      ),
    ).toEqual(levels[BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER])
  })

  it('LEVEL_SUPER_MUSIC_LOVER should be undefiend', () => {
    expect(
      getNextBonusProgramHumanReadable(
        BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER,
      ),
    ).toBeUndefined()
  })
})
