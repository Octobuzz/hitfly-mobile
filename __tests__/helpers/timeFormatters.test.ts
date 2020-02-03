import {
  getNameForTrack,
  formatTracksCount,
  // formatTimeDurationForTrack,
  formatTimeDurationForPlaylist,
} from 'src/helpers'

describe('formatTracksCount', () => {
  it('should render string correctly with 10', () => {
    expect(formatTracksCount(10)).toBe(`${10} ${getNameForTrack(10)}`)
  })

  it('should render string correctly with -100', () => {
    expect(formatTracksCount(-100)).toBe(`${-100} ${getNameForTrack(-100)}`)
  })
})

// FIXME: возможно придется переписать под новый формат, если заказчик его примет
// describe('formatTimeDurationForTrack', () => {
//   it('should be 0:10 with 10', () => {
//     expect(formatTimeDurationForTrack(10)).toBe('0:10')
//   })

//   it('should be 26:40 with 1600', () => {
//     expect(formatTimeDurationForTrack(1600)).toBe('26:40')
//   })

//   it('should be 2:46:40 with 10000', () => {
//     expect(formatTimeDurationForTrack(10000)).toBe('2:46:40')
//   })
// })

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
