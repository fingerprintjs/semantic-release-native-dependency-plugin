import { cwd } from 'node:process'
import { describe, expect, it } from '@jest/globals'
import { join } from 'node:path'
import { getCommand } from '../src/gradle'

describe('Test for gradle handling', () => {
  describe('getCommand function', () => {
    it("returns 'gradle' if gradle is available and gradle wrapper is not found", async () => {
      const execMock = jest.spyOn(require('node:child_process'), 'exec')
      execMock.mockImplementation((command, callback) => {
        if (command === 'gradle --version') {
          // @ts-ignore
          callback(null)
        }
      })

      const command = await getCommand(cwd())
      expect(command).toBe('gradle')

      execMock.mockRestore()
    })

    it('should throw error if neither gradle nor gradle wrapper are found', async () => {
      const execMock = jest.spyOn(require('node:child_process'), 'exec')
      execMock.mockImplementation((command, callback) => {
        if (command === 'gradle --version') {
          // @ts-ignore
          callback({ code: 127 })
        }
      })

      await expect(getCommand(cwd())).rejects.toThrowErrorMatchingSnapshot('noGradleNoWrapper')

      execMock.mockRestore()
    })

    it('finds the wrapper', async () => {
      const gradleProjectWithWrapper = join(cwd(), 'test/project/with-wrapper')
      const command = await getCommand(gradleProjectWithWrapper)
      expect(command).toBe(join(gradleProjectWithWrapper, 'gradlew'))
    })
  })
})
