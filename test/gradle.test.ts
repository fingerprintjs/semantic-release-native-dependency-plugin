import { cwd } from 'node:process'
import { describe, expect, it } from '@jest/globals'
import { join } from 'node:path'
import { getCommand } from '../src/gradle'

describe('Test for gradle handling', () => {
  describe('getCommand function', () => {
    it("returns 'gradle' when there is no gradle wrapper", async () => {
      const command = await getCommand(cwd())
      expect(command).toBe('gradle')
    })
    it('finds the wrapper', async () => {
      const gradleProjectWithWrapper = join(cwd(), 'test/project/with-wrapper')
      const command = await getCommand(gradleProjectWithWrapper)
      expect(command).toBe(join(gradleProjectWithWrapper, 'gradlew'))
    })
  })
})
