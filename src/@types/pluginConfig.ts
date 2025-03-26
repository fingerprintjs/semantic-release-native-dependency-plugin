export default interface PluginConfig {
  iOS: {
    podSpecJsonPath: string
    dependencyName: string | undefined
  }
  android: {
    path: string
    gradleTaskName: string | undefined
  }
}
