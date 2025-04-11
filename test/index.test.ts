import { describe, expect, it } from '@jest/globals'
import PluginConfig from '../src/@types/pluginConfig'
import { GenerateNotesContext } from 'semantic-release'
import { Signale } from 'signale'

const { generateNotes } = require('../src/index')

const cwd = process.cwd()
const pluginConfig = {
  platforms: {
    iOS: {
      podSpecJsonPath: 'test/project/ios/podspec.json',
      dependencyName: 'FingerprintPro',
      displayName: 'Fingerprint iOS SDK',
    },
    android: {
      path: 'test/project/with-wrapper',
      gradleTaskName: 'printFingerprintNativeSDKVersion',
      displayName: 'Fingerprint Android SDK',
    },
  },
} satisfies PluginConfig
const generateNotesContext = {
  cwd: cwd,
  logger: new Signale({ disabled: true }),
} satisfies Pick<GenerateNotesContext, 'cwd' & 'logger'>

describe('index', () => {
  describe('generateNotes', () => {
    it('is a function', () => {
      expect(generateNotes).toBeInstanceOf(Function)
    })
    it('resolves android version', async () => {
      const android = pluginConfig.platforms.android

      await expect(
        generateNotes(
          {
            platforms: {
              android,
            },
          },
          generateNotesContext
        )
      ).resolves.toBe(`* ${android.displayName} Version Range: **\`>= 1.2.3 and < 4.5.6\`**`)
    }, 30000)
    it('resolves android version (backport)', async () => {
      const android = pluginConfig.platforms.android

      await expect(
        generateNotes(
          {
            android,
          },
          generateNotesContext
        )
      ).resolves.toBe(`* ${android.displayName} Version Range: **\`>= 1.2.3 and < 4.5.6\`**`)
    }, 30000)
    it('resolves iOS version', async () => {
      const iOS = pluginConfig.platforms.iOS

      await expect(
        generateNotes(
          {
            platforms: {
              iOS,
            },
          },
          generateNotesContext
        )
      ).resolves.toBe(`* ${iOS.displayName} Version Range: **\`>= 1.2.3 and < 4.5.6\`**`)
    })
    it('resolves iOS version (backport)', async () => {
      const iOS = pluginConfig.platforms.iOS

      await expect(
        generateNotes(
          {
            iOS,
          },
          generateNotesContext
        )
      ).resolves.toBe(`* ${iOS.displayName} Version Range: **\`>= 1.2.3 and < 4.5.6\`**`)
    })
    it('throws error on cwd not set', async () => {
      const testGenerateNotesContext = {
        ...generateNotesContext,
        cwd: undefined,
      }
      await expect(generateNotes(pluginConfig, testGenerateNotesContext)).rejects.toThrowErrorMatchingSnapshot('noCwd')
    })
    it('throws error on android gradleTaskName not set', async () => {
      const testPluginConfig = structuredClone(pluginConfig) as PluginConfig
      testPluginConfig.platforms.android!.gradleTaskName = undefined

      await expect(generateNotes(testPluginConfig, generateNotesContext)).rejects.toThrowErrorMatchingSnapshot(
        'noAndroidGradleTaskName'
      )
    })
    it('throws error on iOS dependency name not set', async () => {
      const testPluginConfig = structuredClone(pluginConfig) as PluginConfig
      testPluginConfig.platforms.iOS!.dependencyName = undefined

      await expect(generateNotes(testPluginConfig, generateNotesContext)).rejects.toThrowErrorMatchingSnapshot(
        'noIOSDependencyName'
      )
    }, 30000)
    it('throws error when no platform specified', async () => {
      await expect(generateNotes({}, generateNotesContext)).rejects.toThrowErrorMatchingSnapshot('noPlatform')
    })
    describe('heading', () => {
      const heading = 'Example Heading'
      const { iOS, android } = pluginConfig.platforms

      const expectedHeading = `### ${heading}\n`
      const expectedAndroid = `* ${android.displayName} Version Range: **\`>= 1.2.3 and < 4.5.6\`**`
      const expectedIOS = `* ${iOS.displayName} Version Range: **\`>= 1.2.3 and < 4.5.6\`**`

      const subTestCases = [
        {
          platforms: { iOS, android },
          expected: [expectedHeading, expectedAndroid, expectedIOS].join('\n'),
        },
        {
          platforms: { iOS },
          expected: [expectedHeading, expectedIOS].join('\n'),
        },
        {
          platforms: { android },
          expected: [expectedHeading, expectedAndroid].join('\n'),
        },
      ]

      subTestCases.forEach((testCase) => {
        it(`adds heading when specified for platforms: ${Object.keys(testCase.platforms).join(', ')}`, async () => {
          await expect(
            generateNotes(
              {
                platforms: testCase.platforms,
                heading,
              },
              generateNotesContext
            )
          ).resolves.toBe(testCase.expected)
        }, 30000)
      })
    })
  })
})
