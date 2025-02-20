import { describe, expect, it } from '@jest/globals'

const Index = require('../src/index')

describe('index', () => {
  it('generateNotes is a function', () => {
    expect(Index.generateNotes).toBeInstanceOf(Function)
  })
})
