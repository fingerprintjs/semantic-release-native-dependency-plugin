import { describe, expect, it } from '@jest/globals'
import { cwd } from 'node:process'
import { Signale } from 'signale'
import { AndroidResolveContext, resolve } from '../src/platforms/android'

describe('Test for android platform', () => {
  const logger = new Signale({ disabled: true })
  const ctx = {
    cwd: cwd(),
    logger: logger,
    env: process.env as Record<string, string>,
  } satisfies AndroidResolveContext

  it('returns correct version', async () => {
    const command = await resolve(ctx, {
      path: 'test/project/with-wrapper',
      gradleTaskName: 'printFingerprintNativeSDKVersion',
      displayName: undefined,
    })
    expect(command).toBe('>= 1.2.3 and < 4.5.6')
  }, 30000)
  it('throws error when task not found', async () => {
    await expect(
      resolve(ctx, { path: 'test/project/with-wrapper', gradleTaskName: 'nonExists', displayName: undefined })
    ).rejects.toThrowErrorMatchingSnapshot('gradleNoTask')
  }, 30000)
})
