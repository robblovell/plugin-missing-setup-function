const serverlessConfiguration = {
  frameworkVersion: '3',
  service: 'hello-world',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
  ],
  package: {
    individually: true,
  },
  custom: {
    esbuild: {
      entryPoints: ['app.ts'],
      platform: 'node',
      target: 'node16',
      bundle: true,
      // outfile: 'out.js',
      outdir: '.esbuild/.build',
    },
    'serverless-offline': {
      host: "localhost",
      httpPort: 3005
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    stage: 'staging',
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
module.exports = serverlessConfiguration;