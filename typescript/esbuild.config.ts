import { build, BuildOptions } from 'esbuild'
import { helloPlugin } from './helloPlugin'

const options = {
  entryPoints: ['app.ts'],
  platform: 'node',
  target: 'node16',
  bundle: true,
  outdir: '.esbuild/.build',
  plugins: [helloPlugin],
} as BuildOptions

build(options)
  .then(result => {
    console.log('Esbuild result:', result);
  })
  .catch(error => {
    console.log('Esbuild error:', error);
  })
