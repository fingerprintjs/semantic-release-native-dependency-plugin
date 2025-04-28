import { describe, expect, it } from '@jest/globals'
import { isPodAvailable, podIpcSpec } from '../src/pods'
import { JsonParseError } from '../src/errors'

describe('Test for pod utils', () => {
  describe('isPodAvailable function', () => {
    it('return false with DSL format if pod command is not available', async () => {
      const execMock = jest.spyOn(require('node:child_process'), 'exec')
      execMock.mockImplementation((command, callback) => {
        if (command === 'pod --version') {
          // @ts-ignore
          callback({ code: 127 })
        }
      })

      await expect(isPodAvailable()).resolves.toBe(false)
    })

    it('throws on unknown error', async () => {
      const execMock = jest.spyOn(require('node:child_process'), 'exec')
      execMock.mockImplementation((command, callback) => {
        if (command === 'pod --version') {
          // @ts-ignore
          callback(new Error('Unknown error'))
        }
      })

      await expect(isPodAvailable()).rejects.toThrow('Unknown error')
    })
  })

  describe('podIpcSpec function', () => {
    it('parses valid podspec JSON successfully', async () => {
      const validJson = JSON.stringify({ dependencies: { Dependency: ['1.0'] } })
      const execMock = jest.spyOn(require('node:child_process'), 'exec')
      execMock.mockImplementation((command, callback) => {
        if ((command as string).startsWith('pod ipc spec')) {
          // @ts-ignore
          callback(null, validJson)
        }
      })

      const result = await podIpcSpec('MyPod.podspec')
      expect(result).toEqual({ dependencies: { Dependency: ['1.0'] } })
    })

    it('throws a JsonParseError when JSON is invalid', async () => {
      const invalidJson = '{ invalid json '
      const execMock = jest.spyOn(require('node:child_process'), 'exec')
      execMock.mockImplementation((command, callback) => {
        if ((command as string).startsWith('pod ipc spec')) {
          // @ts-ignore
          callback(null, invalidJson)
        }
      })

      await expect(podIpcSpec('InvalidPod.podspec')).rejects.toThrow(JsonParseError)
    })

    it('throws an error when the command fails', async () => {
      const execMock = jest.spyOn(require('node:child_process'), 'exec')
      execMock.mockImplementation((command, callback) => {
        if ((command as string).startsWith('pod ipc spec')) {
          // @ts-ignore
          callback(new Error('Command failed'))
        }
      })

      await expect(podIpcSpec('ErrorPod.podspec')).rejects.toThrow('Command failed')
    })
  })
})
