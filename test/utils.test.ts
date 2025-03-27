import { describe, expect, it } from '@jest/globals'
import { humanizeMavenStyleVersionRange } from '../src/utils'

describe('Tests for util functions', () => {
  describe('humanizeMavenStyleVersionRange function', () => {
    it('should format exact match brackets', () => {
      expect(humanizeMavenStyleVersionRange('[1.0]')).toBe('>=1.0')
    })
    it('should format exclusive parentheses', () => {
      expect(humanizeMavenStyleVersionRange('(1.0)')).toBe('>1.0')
    })
    it('should format inclusive range', () => {
      expect(humanizeMavenStyleVersionRange('[1.0, 2.0]')).toBe('>= 1.0 and <= 2.0')
    })
    it('should format exclusive/inclusive range', () => {
      expect(humanizeMavenStyleVersionRange('(1.0, 2.0]')).toBe('> 1.0 and <= 2.0')
    })
    it('should format inclusive/exclusive range', () => {
      expect(humanizeMavenStyleVersionRange('[1.0, 2.0)')).toBe('>= 1.0 and < 2.0')
    })
    it('should format exclusive range', () => {
      expect(humanizeMavenStyleVersionRange('(1.0, 2.0)')).toBe('> 1.0 and < 2.0')
    })
    it('should handle spaces', () => {
      expect(humanizeMavenStyleVersionRange(' [ 1.0 , 2.0 ]')).toBe('>= 1.0 and <= 2.0')
    })
  })
})
