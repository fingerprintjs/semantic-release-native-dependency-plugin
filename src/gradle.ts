import { join } from 'node:path'
import { access, constants } from 'node:fs'
import { exec } from 'node:child_process'

/**
 * Check if gradle is installed to system-wide.
 * @return A promise that resolves if gradle is found
 */
export function isGradleAvailable(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    exec('gradle --version', (err) => {
      if (err) {
        // 127 means command not found (https://tldp.org/LDP/abs/html/exitcodes.html)
        if (err.code === 127) {
          resolve(false)
        }
        reject(err)
      }

      resolve(true)
    })
  })
}

/**
 * @param {string} cwd the path of current working directory
 * @return A promise that resolves name of command to trigger Gradle
 */
export function getCommand(cwd: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const gradleWrapper = join(cwd, 'gradlew')
    access(gradleWrapper, constants.F_OK, async (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          if (await isGradleAvailable()) {
            resolve('gradle')
          }

          reject(new Error('Gradle or Gradle wrapper not found.'))
        } else {
          reject(err)
        }
      } else {
        resolve(gradleWrapper)
      }
    })
  })
}
