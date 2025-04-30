import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import type { GenerateNotesContext } from 'semantic-release'
import { isPodAvailable, podIpcSpec, PodspecJson } from '../pods'
import { JsonParseError } from '../errors'

export interface IOSPlatformConfiguration {
  /**
   * @deprecated use `podspecPath` instead
   * */
  podSpecJsonPath?: string | undefined
  podSpecPath: string | undefined
  dependencyName: string | undefined
  displayName: string | undefined
}

export type IOSResolveContext = Pick<GenerateNotesContext, 'cwd' | 'logger'>

export const resolve = async (
  { cwd, logger }: IOSResolveContext,
  { podSpecJsonPath, podSpecPath, dependencyName }: IOSPlatformConfiguration
) => {
  if (!cwd) {
    throw new Error(`Current working directory is required to detect iOS dependency version range.`)
  }

  if (!dependencyName) {
    throw new Error('iOS Dependency name should be defined.')
  }

  let podspecPathParam: string | undefined
  if (podSpecPath) {
    podspecPathParam = podSpecPath
  } else if (podSpecJsonPath) {
    logger.warn('[DEPRECATED] Use `platforms.iOS.podspecPath` instead of `platform.iOS.podSpecJsonPath`.')
    podspecPathParam = podSpecJsonPath
  }
  if (!podspecPathParam) {
    throw new Error('iOS Podspec path should be defined.')
  }

  let podspecContents: PodspecJson | undefined

  try {
    podspecContents = readPodspecJson(cwd, podspecPathParam)
  } catch (e) {
    if (!(e instanceof JsonParseError)) {
      throw e
    }

    podspecContents = await readPodspecDSL(podspecPathParam)
  }

  if (!podspecContents.dependencies || !podspecContents.dependencies[dependencyName]) {
    throw new Error(`${podspecPathParam} file does not contain '${dependencyName}' in dependencies.`)
  }

  return podspecContents.dependencies[dependencyName].join(' and ')
}

function readPodspecDSL(podspecFilePath: string): Promise<PodspecJson> {
  if (!isPodAvailable()) {
    throw new Error(`Pods not found in your system.`)
  }

  return podIpcSpec(podspecFilePath)
}

function readPodspecJson(cwd: string, podspecFilePath: string): PodspecJson {
  const resolvedPodspecPath = join(cwd, podspecFilePath)

  let fileContent: string
  try {
    fileContent = readFileSync(resolvedPodspecPath, 'utf8')
  } catch (error: any) {
    switch (error.code) {
      case 'ENOENT':
        throw new Error(`${podspecFilePath} file does not exist.`)
      case 'EACCES':
        throw new Error(`${podspecFilePath} file cannot be accessed.`)
      default:
        throw new Error(`${podspecFilePath} file cannot be read. Error: ${error.message}`)
    }
  }

  let data: PodspecJson
  try {
    data = JSON.parse(fileContent) as PodspecJson
  } catch (error) {
    throw new JsonParseError(podspecFilePath)
  }

  return data
}
