import { mergeRight } from 'src/helpers'

describe('mergeRight', () => {
  it('should deep merged right', () => {
    const a = {
      a: 1,
      b: 'string',
      c: {
        a: [1, 2],
      },
    }

    const b = {
      b: 'other',
      c: {
        a: [3],
      },
      d: {
        a: 1,
      },
    }

    const c = {
      a: 1,
      b: 'other',
      c: {
        a: [1, 2, 3],
      },
      d: {
        a: 1,
      },
    }

    expect(mergeRight(a, b)).toEqual(c)
  })
})
