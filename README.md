# Semantic Release Plugin: Native SDK Version Retriever

## Overview

This plugin retrieves native SDK dependency version information from iOS and Android projects and integrates it into the semantic release workflow generate notes steps.

- Extracts SDK versions from podspec json file (iOS) and Gradle task output (Android)
- Ensures version consistency in release notes
- Automates version retrieval for better release documentation

## Installation

```sh
pnpm add -D semantic-release-native-sdk
```

## Usage

Add the plugin to your `.releaserc` configuration:

```json
{
  "plugins": [
    ...,
    [
      "semantic-release-native-sdk",
      {
        "iOSPodSpecJsonPath": "RNFingerprintjsPro.podspec.json",
        "androidPath": "android",
        "androidGradleTaskName": "printFingerprintNativeSDKVersion",
      }
    ],
  ]
}
```

## How It Works

- The plugin reads version information from podspec json file (iOS) and a custom Gradle task output (Android).
- It automatically includes the extracted versions in the release notes.
- Helps maintain transparency about SDK versions used in each release.

## Requirements

- Node.js 14+
- Semantic Release configured in your project

## License

MIT
