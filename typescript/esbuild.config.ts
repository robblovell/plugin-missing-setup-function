import { build, BuildOptions } from 'esbuild'
import { helloPlugin } from './helloPlugin'

const options = {
  entryPoints: ['app.ts'],
  platform: 'node',
  target: 'node16',
  bundle: true,
  outfile: '.esbuild/.build/out.js',
  plugins: [helloPlugin],
} as BuildOptions

build(options).then(() => {
  console.log('Build complete')
})