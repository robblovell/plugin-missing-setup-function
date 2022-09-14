const { helloPlugin } = require('./helloPlugin.js')
const { build } = require('esbuild');

const options = {
  entryPoints: ['app.js'],
  platform: 'node',
  target: 'node16',
  bundle: true,
  outdir: '.esbuild/.build',
  plugins: [helloPlugin],
}

build(options)
  .then(result => {
    console.log('Esbuild result:', result);
  })
  .catch(error => {
    console.log('Esbuild error:', error);
  })
