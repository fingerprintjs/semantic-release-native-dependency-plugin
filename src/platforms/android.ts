import { humanizeMavenStyleVersionRange } from '../utils'
import type { GenerateNotesContext } from 'semantic-release'
import type { Signale } from 'signale'
import { join } from 'node:path'
import { getCommand } from '../gradle'
import { spawn } from 'node:child_process'

export interface AndroidPlatformConfiguration {
  path: string | undefined
  gradleTaskName: string | undefined
  displayName: string | undefined
}

async function runGradleTask(
  cwd: string,
  androidPath: string,
  androidGradleTaskName: string,
  env: NodeJS.ProcessEnv,
  logger: Signale
): Promise<string> {
  const androidFullPath = join(cwd, androidPath)
  const command = await getCommand(androidFullPath)

  return new Promise((resolve, reject) => {
    const child = spawn(command, [androidGradleTaskName, '-q', '--console=plain'], {
      cwd: androidFullPath,
      env,
      detached: true,
      stdio: ['inherit', 'pipe', 'pipe'],
    })
    if (child.stdout === null) {
      reject(new Error('Unexpected error: stdout of subprocess is null'))
      return
    }
    if (child.stderr === null) {
      reject(new Error('Unexpected error: stderr of subprocess is null'))
      return
    }

    let androidVersion: string | null = null
    child.stdout.on('data', (line: Buffer) => {
      if (!line || line.toString().trim() === '') {
        return
      }

      logger.debug(`Gradle stdout: ${line}`)
      androidVersion = line.toString().trim()
    })
    child.stderr.on('data', (line: Buffer) => {
      logger.error(line.toString().trim())
    })
    child.on('close', (code: number) => {
      if (code !== 0) {
        reject(new Error(`Unexpected error: Gradle failed with status code ${code}`))
        return
      }

      if (androidVersion === null) {
        reject(new Error(`Could not read output of \`${androidGradleTaskName}\` gradle task.`))
        return
      }

      resolve(androidVersion)
    })
    child.on('error', (err) => {
      logger.error(err)
      reject(err)
    })
  })
}

export type AndroidResolveContext = Pick<GenerateNotesContext, 'logger' | 'cwd' | 'env'>

export const resolve = async (
  { logger, cwd, env }: AndroidResolveContext,
  { path, gradleTaskName }: AndroidPlatformConfiguration
) => {
  if (!cwd) {
    throw new Error(`Current working directory is required to detect android dependency version range.`)
  }

  if (!path) {
    throw new Error('Android path should be defined.')
  }

  if (!gradleTaskName) {
    throw new Error('Android gradle task name should be defined.')
  }

  const androidVersion = await runGradleTask(cwd, path, gradleTaskName, env as NodeJS.ProcessEnv, logger)
  return humanizeMavenStyleVersionRange(androidVersion)
}
