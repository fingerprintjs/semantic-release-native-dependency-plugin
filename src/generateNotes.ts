import { join } from 'node:path'
import type { GenerateNotesContext } from 'semantic-release'
import { spawn } from 'node:child_process'
import type { Signale } from 'signale'
import PluginConfig from './@types/pluginConfig'
import { getCommand } from './gradle'
import { humanizeMavenStyleVersionRange } from './utils'
import { readFileSync } from 'node:fs'

export async function getAndroidVersion(
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
      cwd: androidPath,
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

type PodspecJson = {
  dependencies: {
    [key: string]: [string]
  }
}

export const getIOSVersion = async (cwd: string, iOSPodSpecJsonPath: string, dependencyName: string) => {
  const jsonFile = join(cwd, iOSPodSpecJsonPath)

  let fileContent: string
  try {
    fileContent = readFileSync(jsonFile, 'utf8')
  } catch (error: any) {
    switch (error.code) {
      case 'ENOENT':
        throw new Error(`${iOSPodSpecJsonPath} file does not exist.`)
      case 'EACCES':
        throw new Error(`${iOSPodSpecJsonPath} file cannot be accessed.`)
      default:
        throw new Error(`${iOSPodSpecJsonPath} file cannot be read.`)
    }
  }

  let data: PodspecJson
  try {
    data = JSON.parse(fileContent) as PodspecJson
  } catch (error) {
    throw new Error(`${iOSPodSpecJsonPath} file cannot be parsed as JSON.`)
  }

  if (!data.dependencies || !data.dependencies[dependencyName]) {
    throw new Error(`${iOSPodSpecJsonPath} file does not contain '${dependencyName}' in dependencies.`)
  }

  return data.dependencies[dependencyName].join(' and ')
}

const generateNotes = async ({ iOS, android }: PluginConfig, { logger, cwd, env }: GenerateNotesContext) => {
  if (!cwd) {
    throw new Error(`Current working directory is required to detect native dependency versions.`)
  }

  if (!android.gradleTaskName) {
    throw new Error('Android gradle task name should be defined.')
  }

  if (!iOS.podSpecJsonPath) {
    throw new Error('iOS Podspec Json path should be defined.')
  }

  if (!iOS.dependencyName) {
    throw new Error('iOS Dependency name should be defined.')
  }

  if (!android.displayName) {
    android.displayName = 'Android Dependency'
  }

  if (!iOS.displayName) {
    iOS.displayName = 'iOS Dependency'
  }

  const androidVersion = await getAndroidVersion(
    cwd,
    android.path,
    android.gradleTaskName,
    env as NodeJS.ProcessEnv,
    logger
  )
  const humanizedAndroidVersion = humanizeMavenStyleVersionRange(androidVersion)
  logger.log(`Detected ${android.displayName} Version: \`${androidVersion}\` \`${humanizedAndroidVersion}\``)

  const iosVersion = await getIOSVersion(cwd, iOS.podSpecJsonPath, iOS.dependencyName)
  logger.log(`Detected ${iOS.displayName} Version: \`${iosVersion}\``)

  return `${android.displayName} Version Range: **\`${humanizedAndroidVersion}\`**

${iOS.displayName} Version Range: **\`${iosVersion}\`**`
}

export default generateNotes
