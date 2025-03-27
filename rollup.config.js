import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import licensePlugin from 'rollup-plugin-license'
import { dts } from 'rollup-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { join } from 'path'

const { main, module, types } = require('./package.json')

const commonBanner = licensePlugin({
  banner: {
    content: {
      file: join(__dirname, 'assets', 'license_banner.txt'),
    },
  },
})

const commonInput = {
  input: 'src/index.ts',
  plugins: [typescript(), nodeResolve(), peerDepsExternal({ includeDependencies: true }), commonBanner],
}

export default [
  {
    ...commonInput,
    output: [
      // CJS for usage with `require()`
      {
        exports: 'named',
        file: main,
        format: 'cjs',
      },

      // ESM for usage with `import`
      {
        exports: 'named',
        file: module,
        format: 'es',
      },
    ],
  },
  {
    ...commonInput,
    plugins: [dts(), commonBanner],
    output: {
      file: types,
      format: 'es',
    },
  },
]
