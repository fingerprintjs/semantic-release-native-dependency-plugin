import { AndroidPlatformConfiguration } from '../platforms/android'
import { IOSPlatformConfiguration } from '../platforms/iOS'

export interface PlatformConfig {
  iOS?: IOSPlatformConfiguration
  android?: AndroidPlatformConfiguration
}

export default interface PluginConfig {
  platforms: PlatformConfig
  /** @deprecated Use `platforms.iOS` instead */
  iOS?: IOSPlatformConfiguration
  /** @deprecated Use `platforms.android` instead */
  android?: AndroidPlatformConfiguration
  heading?: string
}
