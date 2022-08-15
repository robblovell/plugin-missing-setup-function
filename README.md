# plugin-missing-setup-function

This repo describes a problem with the serverless esbuild plugin. See: [Serverless EsBuild Issue #359](https://github.com/floydspace/serverless-esbuild/issues/359)

**Describe the bug**

When attempting to use any esbuild plugin, the following error occurs:
```node_modules/esbuild/lib/main.js:786:16: ERROR: [plugin: plugin:copy] Plugin is missing a setup function```

**To Reproduce**

This error occurs with any plugin. 

 Example:

app.ts
```
export const api = () => {
  console.log('Hello from the custom Lambda!')
}
```

helloPlugin.ts
```typescript
export const helloPlugin = {
  name: 'env',
  setup(build) {
    console.log('Hello World')
  },
}
```
serverless.ts
```
import type { Serverless } from 'serverless/aws';
import { helloPlugin } from './helloPlugin'

const serverlessConfiguration: Partial<Serverless> = <Serverless>{
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
      bundle: true,
      outfile: 'out.js',
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
      handler: 'app.js',
    }
  }
}
module.exports = serverlessConfiguration;
```

package.json
```
{
  "name": "plugin-missing-setup-function",
  "version": "0.0.1",
  "description": "",
  "main": "app.js",
  "license": "ISC",
  "devDependencies": {
    "@types/aws-lambda": "^8.10.44",
    "@types/serverless": "3.12.7",
    "esbuild-plugin-tsc": "^0.3.1",
    "serverless": "^3.21.0",
    "serverless-esbuild": "^1.32.5",
    "serverless-offline": "^8.8.1"
  }
}

```
Independent esbuild.config.ts
```
import { build, BuildOptions } from 'esbuild'
import { helloPlugin } from './helloPlugin'

const options = {
  entryPoints: ['app.ts'],
  bundle: true,
  outfile: 'out.js',
  plugins: [helloPlugin],
} as BuildOptions

(async () => {
  const res = await build(options as BuildOptions)
})()
```

```bash
✗ ts-node esbuild.config.ts         [22/08/14| 4:35PM]
Hello World
```

```bash
✗ serverless offline start --verbose
Running "serverless" from node_modules
Compiling to node16 bundle with esbuild...
Compiling with concurrency: Infinity
✘ [ERROR] [plugin env] Plugin is missing a setup function

    .../app/node_modules/esbuild/lib/main.js:798:16:
      798 │           throw new Error(`Plugin is missing a setup function`);
          ╵                 ^

    at handlePlugins (.../node_modules/esbuild/lib/main.js:798:17)
    at Object.buildOrServe (.../node_modules/esbuild/lib/main.js:1149:7)
    at .../node_modules/esbuild/lib/main.js:2110:17
    at new Promise (<anonymous>)
    at Object.build (.../node_modules/esbuild/lib/main.js:2109:14)
    at build (.../node_modules/esbuild/lib/main.js:1956:51)
    at bundleMapper (.../node_modules/serverless-esbuild/dist/bundle.js:69:50)
    at .../node_modules/serverless-esbuild/node_modules/p-map/index.js:57:28

Environment: darwin, node 12.22.12, framework 3.21.0 (local) 3.21.0v (global), plugin 6.2.2, SDK 4.3.2
Docs:        docs.serverless.com
Support:     forum.serverless.com
Bugs:        github.com/serverless/serverless/issues

Error:
Error: Build failed with 1 error:
.../node_modules/esbuild/lib/main.js:798:16: ERROR: [plugin: env] Plugin is missing a setup function
    at failureErrorWithLog (.../node_modules/esbuild/lib/main.js:1624:15)
    at .../node_modules/esbuild/lib/main.js:1143:18
    at .../node_modules/esbuild/lib/main.js:1138:9
    at .../node_modules/esbuild/lib/main.js:678:9
    at handleIncomingPacket (...node_modules/esbuild/lib/main.js:775:9)
    at Socket.readFromStdout (.../node_modules/esbuild/lib/main.js:644:7)
    at Socket.emit (events.js:314:20)
    at Socket.EventEmitter.emit (domain.js:483:12)
    at addChunk (_stream_readable.js:297:12)
    at readableAddChunk (_stream_readable.js:272:9)
    at Socket.Readable.push (_stream_readable.js:213:10)
    at Pipe.onStreamRead (internal/stream_base_commons.js:188:23)

```

**Expected behavior**

Expect serverless to build and run using esbuild with plugins and not crash.

**Versions (please complete the following information):**
 - OS: Mac
 - Serverless Framework Version: 
 ```
    Framework Core: 3.21.0 (local) 3.21.0 (global)
    Plugin: 6.2.2
    SDK: 4.3.2
```
 - Plugin Version: [e.g. 1.25.0]
```
"serverless-esbuild": "^1.32.5",
```
**Additional context**

It looks like any function passed into the esbuild config fails. 

For instance, if you pass a function to the watch option, it is removed. 

Is there some sort of marshalling/un-marshalling happening where functions are inadvertently deleted?
