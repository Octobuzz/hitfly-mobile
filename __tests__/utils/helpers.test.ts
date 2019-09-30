import { StatusBar } from 'react-native'
import { helpers } from 'src/utils'
import { BonusProgramLevel } from 'src/apollo'

describe('getBonusProgramLevelHumanReadable', () => {
  it('LEVEL_NOVICE should be: 👶 Новичек', () => {
    expect(
      helpers.getBonusProgramLevelHumanReadable(BonusProgramLevel.LEVEL_NOVICE),
    ).toBe('👶 Новичек')
  })

  it('LEVEL_AMATEUR should be: 🎤 Любитель', () => {
    expect(
      helpers.getBonusProgramLevelHumanReadable(
        BonusProgramLevel.LEVEL_AMATEUR,
      ),
    ).toBe('🎤 Любитель')
  })

  it('LEVEL_CONNOISSEUR_OF_THE_GENRE should be: 🎸 Знаток жанра', () => {
    expect(
      helpers.getBonusProgramLevelHumanReadable(
        BonusProgramLevel.LEVEL_CONNOISSEUR_OF_THE_GENRE,
      ),
    ).toBe('🎸 Знаток жанра')
  })

  it('LEVEL_SUPER_MUSIC_LOVER should be: 🎧 Супер меломан', () => {
    expect(
      helpers.getBonusProgramLevelHumanReadable(
        BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER,
      ),
    ).toBe('🎧 Супер меломан')
  })
})

describe('getNextBonusProgramHumanReadable', () => {
  it('LEVEL_NOVICE should be: 🎤 Любитель', () => {
    expect(
      helpers.getNextBonusProgramHumanReadable(BonusProgramLevel.LEVEL_NOVICE),
    ).toBe('🎤 Любитель')
  })

  it('LEVEL_AMATEUR should be: 🎸 Знаток жанра', () => {
    expect(
      helpers.getNextBonusProgramHumanReadable(BonusProgramLevel.LEVEL_AMATEUR),
    ).toBe('🎸 Знаток жанра')
  })

  it('LEVEL_CONNOISSEUR_OF_THE_GENRE should be: 🎧 Супер меломан', () => {
    expect(
      helpers.getNextBonusProgramHumanReadable(
        BonusProgramLevel.LEVEL_CONNOISSEUR_OF_THE_GENRE,
      ),
    ).toBe('🎧 Супер меломан')
  })

  it('LEVEL_SUPER_MUSIC_LOVER should be undefiend', () => {
    expect(
      helpers.getNextBonusProgramHumanReadable(
        BonusProgramLevel.LEVEL_SUPER_MUSIC_LOVER,
      ),
    ).toBeUndefined()
  })
})
