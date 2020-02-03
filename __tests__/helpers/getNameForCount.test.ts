import { getNameForCount } from 'src/helpers'

describe('getNameForCount', () => {
  const getNameForHour = getNameForCount({
    nominative: 'час',
    genitive: 'часа',
    genitiveMultiple: 'часов',
  })

  it('should be: час', () => {
    expect(getNameForHour(1)).toBe('час')
    expect(getNameForHour(21)).toBe('час')
    expect(getNameForHour(101)).toBe('час')
    expect(getNameForHour(-1)).toBe('час')
  })
  it('should be: часа', () => {
    expect(getNameForHour(2)).toBe('часа')
    expect(getNameForHour(22)).toBe('часа')
    expect(getNameForHour(102)).toBe('часа')
    expect(getNameForHour(-2)).toBe('часа')
  })
  it('should be: часов', () => {
    expect(getNameForHour(0)).toBe('часов')
    expect(getNameForHour(10)).toBe('часов')
    expect(getNameForHour(100)).toBe('часов')
    expect(getNameForHour(-100)).toBe('часов')
  })
})
