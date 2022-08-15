const helloPlugin = {
  name: 'env',
  setup(build) {
    console.log('Hello World')
  },
}
exports.helloPlugin = helloPlugin;