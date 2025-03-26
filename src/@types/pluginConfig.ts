export default interface PluginConfig {
  iOS: {
    podSpecJsonPath: string
    dependencyName: string
  }
  android: {
    path: string
    gradleTaskName: string | undefined
  }
}
