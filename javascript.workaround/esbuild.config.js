const { build } = require('esbuild')
const { helloPlugin } = require('./helloPlugin.js')
const { copy } = require('esbuild-plugin-copy');

const options = {
  entryPoints: ['app.js'],
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
}

build(options).then(() => {
  console.log('Build complete')
})