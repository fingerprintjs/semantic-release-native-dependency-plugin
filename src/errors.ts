export class JsonParseError extends Error {
  constructor(podspecFilePath: string) {
    super(`${podspecFilePath} file cannot be parsed as JSON.`)
  }
}
