import { describe, expect, it } from '@jest/globals'
import PluginConfig from '../src/@types/pluginConfig'
import { GenerateNotesContext } from 'semantic-release'

const { generateNotes } = require('../src/index')

const cwd = process.cwd()
const pluginConfig = {
  iOS: {
    podSpecJsonPath: 'podspec.json',
    dependencyName: 'FingerprintPro',
  },
  android: {
    path: 'android',
    gradleTaskName: 'print',
  },
} satisfies PluginConfig
const generateNotesContext = {
  cwd: cwd,
} satisfies Pick<GenerateNotesContext, 'cwd'>

describe('index', () => {
  describe('generateNotes', () => {
    it('is a function', () => {
      expect(generateNotes).toBeInstanceOf(Function)
    })
    it('throws error on cwd not set', async () => {
      const testGenerateNotesContext = {
        ...generateNotesContext,
        cwd: undefined,
      }
      await expect(generateNotes(pluginConfig, testGenerateNotesContext)).rejects.toThrowErrorMatchingSnapshot('noCwd')
    })
    it('throws error on android gradleTaskName not set', () => {
      const testPluginConfig = {
        ...pluginConfig,
        android: {
          ...pluginConfig.android,
          gradleTaskName: undefined,
        },
      } satisfies PluginConfig

      expect(generateNotes(testPluginConfig, generateNotesContext)).rejects.toThrowErrorMatchingSnapshot(
        'noAndroidGradleTaskName'
      )
    })
  })
})
