export default interface PluginConfig {
  iOSPodSpecJsonPath: string
  iOSDependencyName: string
  androidPath: string
  androidGradleTaskName: string | undefined
}
