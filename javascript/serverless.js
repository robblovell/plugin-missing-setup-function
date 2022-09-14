const { helloPlugin } = require('./helloPlugin')

const serverlessConfiguration = {
  frameworkVersion: '3',
  service: 'hello-world',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
  ],
  custom: {
    esbuild: {
      entryPoints: ['app.js'],
      platform: 'node',
      target: 'node16',
      bundle: true,
      outdir: '.esbuild/.build',
      plugins: [helloPlugin],
    },
    'serverless-offline': {
      host: "localhost",
      httpPort: 3005
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
  },
  functions: {
    'hello-world': {
      handler: 'app.api',
      events: [{
        http: {
          path: 'hello',
          method: 'get',
        },
      }],
    }
  }
}
module.exports = serverlessConfiguration
