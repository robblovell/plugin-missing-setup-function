import { build, BuildOptions } from 'esbuild'
import { helloPlugin } from './helloPlugin'
const { copy } = require('esbuild-plugin-copy');

const options = {
  entryPoints: ['app.ts'],
  platform: 'node',
  target: 'node16',
  bundle: true,
  outfile: '.esbuild/.build/app.js',
  plugins: [
    helloPlugin,
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ["./app.txt"],
        to: ['./.esbuild/.build/.'], // weird syntax needed
      },
    }),
  ],
} as BuildOptions

build(options).then(() => {
  console.log('Build complete')
})