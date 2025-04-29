## [1.2.0](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/compare/v1.1.0...v1.2.0) (2025-04-29)


### Features

* add support for podspec in DSL format ([35d91eb](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/35d91ebabd5d8429af7ce83e55a72af5324d2cb6))
* deprecate `platforms.iOS.podSpecJsonPath` param in favor of `platforms.iOS.podspecPath` ([990305d](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/990305d50f591974f783f90fd540213968fa47c7))

## [1.1.0](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/compare/v1.0.0...v1.1.0) (2025-04-14)


### Features

* add default heading for release notes ([d5c10a0](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/d5c10a008c5ae89a6407a311f5a2dca8f27f940b))
* add optional heading to plugin configuration ([73c3224](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/73c3224ec6ea243a5cd35127ec22e2568ce8d1b0))
* add platform-specific run support with legacy compatibility ([5042f23](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/5042f230a8fc9ba1039f2e21eb5a5ac7af2aa30d))
* format dependency version ranges in release notes as bullet points ([d1f5457](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/d1f5457ded53c8109bf0ed3364dda9b951c3043f))
* show actual error message for iOS file read failures ([1eb17df](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/1eb17dff9985c8bc520f0b8da83df7962de37162))
* throw error when no platforms are configured in plugin config ([5cbed0c](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/5cbed0c6792536c7a70d974b3f93306b66c15a29))

## 1.0.0 (2025-03-31)


### Features

* add displayName for customizable dependency logging ([35bcddb](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/35bcddbd4aec76ac359ae6faa2a0cc137562e787))
* add gradle system-wide availability check ([cd53c22](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/cd53c2214aa1c56c03defd7875ca41c9eed1a10c))
* allow customization of iOS dependency name ([494d860](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/494d860afa0921e22a0c1dcd420ced2dc4cc9311))
* first initialize of the project ([c70388e](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/c70388ed942f1a72ca8bd6f6abc519c70c59b5ae))
* improve error handling for ios podspec file validation ([0641c16](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/0641c16e4c8c0e94e830a7e4555559215f4eb7b8))


### Bug Fixes

* add safeguard against empty cwd in generateNotes ([b907d83](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/b907d838a869d0a01cfdbb4329b5b96c164977f0))
* add validation for dependency exists in ios podspec file ([7e28364](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/7e28364b67388a45bd54eb06b9a32e702b895ee0))
* allow androidGradleTaskName to be undefined in plugin config ([44f81ff](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/44f81ff878d72833d17171204036a433eb28730c))
* ignore empty lines in Gradle stdout processing ([6f5887a](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/6f5887a24f6a740c820d433024b3f993223cefb3))

## 1.0.0 (2025-03-31)


### Features

* add displayName for customizable dependency logging ([35bcddb](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/35bcddbd4aec76ac359ae6faa2a0cc137562e787))
* add gradle system-wide availability check ([cd53c22](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/cd53c2214aa1c56c03defd7875ca41c9eed1a10c))
* allow customization of iOS dependency name ([494d860](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/494d860afa0921e22a0c1dcd420ced2dc4cc9311))
* first initialize of the project ([c70388e](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/c70388ed942f1a72ca8bd6f6abc519c70c59b5ae))
* improve error handling for ios podspec file validation ([0641c16](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/0641c16e4c8c0e94e830a7e4555559215f4eb7b8))


### Bug Fixes

* add safeguard against empty cwd in generateNotes ([b907d83](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/b907d838a869d0a01cfdbb4329b5b96c164977f0))
* add validation for dependency exists in ios podspec file ([7e28364](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/7e28364b67388a45bd54eb06b9a32e702b895ee0))
* allow androidGradleTaskName to be undefined in plugin config ([44f81ff](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/44f81ff878d72833d17171204036a433eb28730c))
* ignore empty lines in Gradle stdout processing ([6f5887a](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/6f5887a24f6a740c820d433024b3f993223cefb3))

## 1.0.0 (2025-03-27)


### Features

* add displayName for customizable dependency logging ([35bcddb](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/35bcddbd4aec76ac359ae6faa2a0cc137562e787))
* add gradle system-wide availability check ([cd53c22](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/cd53c2214aa1c56c03defd7875ca41c9eed1a10c))
* allow customization of iOS dependency name ([494d860](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/494d860afa0921e22a0c1dcd420ced2dc4cc9311))
* first initialize of the project ([c70388e](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/c70388ed942f1a72ca8bd6f6abc519c70c59b5ae))
* improve error handling for ios podspec file validation ([0641c16](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/0641c16e4c8c0e94e830a7e4555559215f4eb7b8))


### Bug Fixes

* add safeguard against empty cwd in generateNotes ([b907d83](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/b907d838a869d0a01cfdbb4329b5b96c164977f0))
* add validation for dependency exists in ios podspec file ([7e28364](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/7e28364b67388a45bd54eb06b9a32e702b895ee0))
* allow androidGradleTaskName to be undefined in plugin config ([44f81ff](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/44f81ff878d72833d17171204036a433eb28730c))
* ignore empty lines in Gradle stdout processing ([6f5887a](https://github.com/fingerprintjs/semantic-release-native-dependency-plugin/commit/6f5887a24f6a740c820d433024b3f993223cefb3))
