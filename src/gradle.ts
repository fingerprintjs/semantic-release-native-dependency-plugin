import { join } from 'node:path'
import { access, constants } from 'node:fs'

/**
 * @param {string} cwd the path of current working directory
 * @return A promise that resolves name of command to trigger Gradle
 */
export function getCommand(cwd: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const gradleWrapper = join(cwd, 'gradlew')
    access(gradleWrapper, constants.F_OK, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve('gradle')
        } else {
          reject(err)
        }
      } else {
        resolve(gradleWrapper)
      }
    })
  })
}
