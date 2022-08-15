const { build } = require('esbuild')
const { helloPlugin } = require('./helloPlugin.js')

const options = {
  entryPoints: ['app.js'],
  platform: 'node',
  target: 'node16',
  bundle: true,
  outfile: '.esbuild/.build/app.js',
  plugins: [helloPlugin],
}

build(options).then(() => {
  console.log('Build complete')
})