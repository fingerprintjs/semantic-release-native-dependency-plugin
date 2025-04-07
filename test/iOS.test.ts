import { describe, expect, it } from '@jest/globals'
import { cwd } from 'node:process'
import { IOSResolveContext, resolve } from '../src/platforms/iOS'

describe('Test for iOS platform', () => {
  const dependencyName = 'FingerprintPro'
  const ctx = {
    cwd: cwd(),
  } satisfies IOSResolveContext

  it('returns correct version', async () => {
    const iosVersion = await resolve(ctx, {
      podSpecJsonPath: 'test/project/ios/podspec.json',
      dependencyName,
      displayName: undefined,
    })
    expect(iosVersion).toBe('>= 1.2.3 and < 4.5.6')
  })

  it('throws error when file not found', async () => {
    await expect(
      resolve(ctx, {
        podSpecJsonPath: 'nonExists',
        dependencyName,
        displayName: undefined,
      })
    ).rejects.toThrowErrorMatchingSnapshot('podspecFileNotFound')
  })

  it('throws error when file not readable', async () => {
    const readFileSyncMock = jest.spyOn(require('node:fs'), 'readFileSync')
    readFileSyncMock.mockImplementation(() => {
      throw { code: 'EACCES' }
    })

    await expect(
      resolve(ctx, { podSpecJsonPath: 'not-readable.podspec.json', dependencyName, displayName: undefined })
    ).rejects.toThrowErrorMatchingSnapshot('podspecNotReadable')

    readFileSyncMock.mockRestore()
  })

  it('throws error when path is a directory', async () => {
    await expect(
      resolve(ctx, {
        podSpecJsonPath: 'test',
        dependencyName,
        displayName: undefined,
      })
    ).rejects.toThrowErrorMatchingSnapshot('podspecPathIsDirectory')
  })
})
