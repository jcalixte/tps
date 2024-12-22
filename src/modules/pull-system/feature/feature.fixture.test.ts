import { faker } from '@faker-js/faker'
import { describe, it } from 'vitest'

describe('feature fixture', () => {
  it('creates lots of animals', () => {
    for (let i = 0; i < 200; i++) {
      console.log(`"${faker.animal.bird()}", `)
    }
  })
})
