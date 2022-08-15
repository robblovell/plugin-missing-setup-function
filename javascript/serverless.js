const { helloPlugin } = require('./helloPlugin')

const serverlessConfiguration = {
  frameworkVersion: '3',
  service: 'thing',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
  ],
  package: {
    individually: true,
  },
  custom: {
    esbuild: {
      entryPoints: ['app.js'],
      platform: 'node',
      target: 'node16',
      bundle: true,
      outfile: '.esbuild/.build/out.js',
      plugins: [helloPlugin],
    },
    'serverless-offline': {
      host: "",
      httpPort: "",
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    stage: 'staging',
  },
  functions: {
    'hello-world': {
      handler: 'app.ts',
    }
  }
}
module.exports = serverlessConfiguration
// module.exports = serverlessConfiguration