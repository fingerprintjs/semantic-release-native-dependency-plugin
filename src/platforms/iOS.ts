import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import type { GenerateNotesContext } from 'semantic-release'

export interface IOSPlatformConfiguration {
  podSpecJsonPath: string | undefined
  dependencyName: string | undefined
  displayName: string | undefined
}

type PodspecJson = {
  dependencies: {
    [key: string]: [string]
  }
}

export type IOSResolveContext = Pick<GenerateNotesContext, 'cwd'>

export const resolve = async (
  { cwd }: IOSResolveContext,
  { podSpecJsonPath, dependencyName }: IOSPlatformConfiguration
) => {
  if (!cwd) {
    throw new Error(`Current working directory is required to detect iOS dependency version range.`)
  }

  if (!podSpecJsonPath) {
    throw new Error('iOS Podspec Json path should be defined.')
  }

  if (!dependencyName) {
    throw new Error('iOS Dependency name should be defined.')
  }

  const jsonFile = join(cwd, podSpecJsonPath)

  let fileContent: string
  try {
    fileContent = readFileSync(jsonFile, 'utf8')
  } catch (error: any) {
    switch (error.code) {
      case 'ENOENT':
        throw new Error(`${podSpecJsonPath} file does not exist.`)
      case 'EACCES':
        throw new Error(`${podSpecJsonPath} file cannot be accessed.`)
      default:
        throw new Error(`${podSpecJsonPath} file cannot be read. Error: ${error.message}`)
    }
  }

  let data: PodspecJson
  try {
    data = JSON.parse(fileContent) as PodspecJson
  } catch (error) {
    throw new Error(`${podSpecJsonPath} file cannot be parsed as JSON.`)
  }

  if (!data.dependencies || !data.dependencies[dependencyName]) {
    throw new Error(`${podSpecJsonPath} file does not contain '${dependencyName}' in dependencies.`)
  }

  return data.dependencies[dependencyName].join(' and ')
}
