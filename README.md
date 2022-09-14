# plugin-missing-setup-function

This repo describes a problem with the serverless esbuild plugin. See: [Serverless EsBuild Issue #359](https://github.com/floydspace/serverless-esbuild/issues/359)

## Issue Reports
See:
* [esbuild serverless plugin issue #359](https://github.com/floydspace/serverless-esbuild/issues/359)
* [serverless issue #11388](https://github.com/serverless/serverless/issues/11388)

## Running

### Prep
```bash
npm i
````
### Javascript version

Running with serverless offline:

```bash
npm start

> plugin-missing-setup-function@0.0.1 start
> cd javascript && serverless offline start --verbose

Compiling to node16 bundle with esbuild...
Compiling with concurrency: Infinity
✘ [ERROR] [plugin hello] Plugin is missing a setup function

...
```
Running with esbuild directly:

```bash
npm run build

> plugin-missing-setup-function@0.0.1 build
> cd javascript && node esbuild.config.js

Hello World
Esbuild result: { errors: [], warnings: [] }

```

### Typescript version

Running with serverless offline:

```bash
npm run start-ts

> plugin-missing-setup-function@0.0.1 start-ts
> cd typescript && serverless offline start --verbose

Compiling to node16 bundle with esbuild...
Compiling with concurrency: Infinity
✘ [ERROR] [plugin hello] Plugin is missing a setup function
...
```

Running with esbuild directly:

```bash
npm run build-ts

> plugin-missing-setup-function@0.0.1 build-ts
> cd typescript && ts-node esbuild.config.ts

Hello World: 
Esbuild result: { errors: [], warnings: [] }
```

### Yaml version

Running with serverless offline:

```bash
npm run start-yaml

> plugin-missing-setup-function@0.0.1 start-yaml
> cd yaml && serverless offline start --verbose

Compiling to node16 bundle with esbuild...
Compiling with concurrency: Infinity
✘ [ERROR] [plugin hello] Plugin is missing a setup function

...
```

Running with esbuild directly:

```bash
npm run build-yaml

> plugin-missing-setup-function@0.0.1 build-yaml
> cd yaml && node esbuild.config.js

Hello World
Esbuild result: { errors: [], warnings: [] }
```

