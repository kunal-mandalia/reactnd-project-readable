import * as f from './functions'

describe('helper functions', () => {
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

  describe(`sortBy`, () => {
    const posts = {
      "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false 
      },
      "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false
      }
    }

    const postsByDateDescending = [
      {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false
      },
      {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false
      },
    ]

    const postsByDateAscending = [
      {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false
      },
      {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false
      }
    ]

    const postsByVotesDescending = [
      {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false
      },
      {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false
      }
    ]

    const postsByVotesAscending = []
    
    const comments = []
    const commentsByDateDescending = []
    const commentsByDateAscending = []
    const commentsByVotesDescending = []
    const commentsByVotesAscending = []
    
    const cases = [
      { input: { data: posts, by: 'date', descending: true }, output: postsByDateDescending },
      { input: { data: posts, by: 'date', descending: false }, output: postsByDateAscending },
      // { input: { dataType: 'posts', by: 'votes', descending: true }},
      // { input: { dataType: 'posts', by: 'votes', descending: false }},
      // { input: { dataType: 'comments', by: 'dates', descending: true }},
      // { input: { dataType: 'comments', by: 'dates', descending: false }},
      // { input: { dataType: 'comments', by: 'votes', descending: true }},
      // { input: { dataType: 'comments', by: 'votes', descending: false }},
    ]

    cases.forEach(c => {
      it(`should sort ${c.input.data} correctly given by ${c.input.by}, descending ${c.input.descending}`, () => {
        const result = f.sortBy({...c.input})
        expect(result).toEqual(c.output)
      })
    })
  })

})