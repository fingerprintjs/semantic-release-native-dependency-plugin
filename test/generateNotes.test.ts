import { describe, expect, it } from '@jest/globals'
import { getAndroidVersion, getIOSVersion } from '../src/generateNotes'
import { cwd } from 'node:process'
import { Signale } from 'signale'

describe('Test for generating notes', () => {
  describe('getAndroidVersion function', () => {
    it('returns correct version', async () => {
      const command = await getAndroidVersion(
        cwd(),
        'test/project/with-wrapper',
        'printFingerprintNativeSDKVersion',
        process.env,
        new Signale()
      )
      expect(command).toBe('[1.2.3, 4.5.6)')
    })
    it('throws error when task not found', () => {
      const signale = new Signale()
      signale.disable()

      expect(
        getAndroidVersion(cwd(), 'test/project/with-wrapper', 'nonExists', process.env, signale)
      ).rejects.toThrowErrorMatchingSnapshot('gradleNoTask')
    })
  })
  describe('getIOSVersion function', () => {
    it('returns correct version', async () => {
      const iosVersion = await getIOSVersion(cwd(), 'test/project/ios/podspec.json')
      expect(iosVersion).toBe('>= 1.2.3 and < 4.5.6')
    })
    it('throws error when file not found', () => {
      expect(getIOSVersion(cwd(), 'nonExists')).rejects.toThrowErrorMatchingSnapshot('podspecFileNotFound')
    })
  })
})
