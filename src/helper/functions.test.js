import * as f from './functions'

describe(`friendlyDurationSince`, () => {
  const cases = [
    { input: {dateFuture: 1504362530147, datePast: 1504362540269}, output: `now`},
    { input: {dateFuture: 1504363691003, datePast: 1504362691003}, output: `16m`},
    { input: {dateFuture: 1504372691003, datePast: 1504362691003}, output: `2h`}
  ]

  cases.forEach(c => {
    it(`should return ${c.output} given ${JSON.stringify(c.input)}`, () => {
      expect(f.friendlyDurationSince(c.input.dateFuture, c.input.datePast)).toEqual(c.output)
    })
  })
})
