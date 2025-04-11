import type { GenerateNotesContext } from 'semantic-release'
import PluginConfig, { PlatformConfig } from './@types/pluginConfig'
import { resolve as androidResolve } from './platforms/android'
import { resolve as iOSResolve } from './platforms/iOS'

const formatter = (platforms: { displayName: string; versionRange: string }[], heading?: string) => {
  let result = ''

  if (heading) {
    result += `### ${heading}\n\n`
  }

  result += platforms
    .map(({ displayName, versionRange }) => {
      return `* ${displayName} Version Range: **\`${versionRange}\`**`
    })
    .join('\n')

  return result
}

const generateNotes = async (config: PluginConfig, ctx: GenerateNotesContext) => {
  // Normalize plugin config: prefer `platforms`, fall back to legacy top-level platform keys for backward compatibility
  // TODO: Remove support for top-level `android` and `iOS` keys in the next major release (BC)
  const platforms: PlatformConfig = config.platforms || {}
  if (!config.platforms) {
    if (config.android) {
      ctx.logger.warn('[DEPRECATED] Use `platforms.android` instead of top-level `android` in plugin config.')
      platforms.android = config.android
    }

    if (config.iOS) {
      ctx.logger.warn('[DEPRECATED] Use `platforms.iOS` instead of top-level `iOS` in plugin config.')
      platforms.iOS = config.iOS
    }
  }

  if (!platforms.android && !platforms.iOS) {
    throw new Error('No platforms specified. You must configure at least one platform under `platforms`.')
  }

  const platformVersions: { displayName: string; versionRange: string }[] = []

  if (platforms.android) {
    const androidVersion = await androidResolve(ctx, platforms.android)
    platformVersions.push({
      displayName: platforms.android.displayName ?? 'Android',
      versionRange: androidVersion,
    })
    ctx.logger.log(`Detected Android Version: \`${androidVersion}\``)
  }

  if (platforms.iOS) {
    const iOSVersion = await iOSResolve(ctx, platforms.iOS)
    platformVersions.push({
      displayName: platforms.iOS.displayName ?? 'iOS',
      versionRange: iOSVersion,
    })
    ctx.logger.log(`Detected iOS Version: \`${iOSVersion}\``)
  }

  return formatter(platformVersions, config.heading)
}

export default generateNotes
