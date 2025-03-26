import { describe, expect, it } from '@jest/globals'
import { getAndroidVersion, getIOSVersion } from '../src/generateNotes'
import { cwd } from 'node:process'
import { Signale } from 'signale'

describe('Test for generating notes', () => {
  const dependencyName = 'FingerprintPro'

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
    }, 30000)
    it('throws error when task not found', async () => {
      const signale = new Signale()
      signale.disable()

      await expect(
        getAndroidVersion(cwd(), 'test/project/with-wrapper', 'nonExists', process.env, signale)
      ).rejects.toThrowErrorMatchingSnapshot('gradleNoTask')
    }, 30000)
  })
  describe('getIOSVersion function', () => {
    it('returns correct version', async () => {
      const iosVersion = await getIOSVersion(cwd(), 'test/project/ios/podspec.json', dependencyName)
      expect(iosVersion).toBe('>= 1.2.3 and < 4.5.6')
    })
    it('throws error when file not found', async () => {
      await expect(getIOSVersion(cwd(), 'nonExists', dependencyName)).rejects.toThrowErrorMatchingSnapshot(
        'podspecFileNotFound'
      )
    })
    it('throws error when file not readable', async () => {
      const readFileSyncMock = jest.spyOn(require('node:fs'), 'readFileSync')
      readFileSyncMock.mockImplementation(() => {
        throw { code: 'EACCES' }
      })

      await expect(
        getIOSVersion(cwd(), 'not-readable.podspec.json', dependencyName)
      ).rejects.toThrowErrorMatchingSnapshot('podspecNotReadable')

      readFileSyncMock.mockRestore()
    })
    it('throws error when path is a directory', async () => {
      await expect(getIOSVersion(cwd(), 'test', dependencyName)).rejects.toThrowErrorMatchingSnapshot(
        'podspecPathIsDirectory'
      )
    })
  })
})
