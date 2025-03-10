import { describe, expect, it } from '@jest/globals'
import PluginConfig from '../src/@types/pluginConfig'
import { GenerateNotesContext } from 'semantic-release'

const { generateNotes } = require('../src/index')

const cwd = process.cwd()
const pluginConfig = {
  androidPath: 'android',
  androidGradleTaskName: 'print',
  iOSPodSpecJsonPath: 'podspec.json',
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
    it('throws error on androidGradleTaskName not set', () => {
      const testPluginConfig = {
        ...pluginConfig,
        androidGradleTaskName: undefined,
      }

      expect(generateNotes(testPluginConfig, generateNotesContext)).rejects.toThrowErrorMatchingSnapshot(
        'noAndroidGradleTaskName'
      )
    })
  })
})
