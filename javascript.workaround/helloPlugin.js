const helloPlugin = {
  name: 'hello',
  setup(build) {
    console.log('Hello World')
  },
}
exports.helloPlugin = helloPlugin;

// const helloPluginFun = () => {
//   return {
//     name: 'hello',
//     setup(build) {
//       console.log('Hello World')
//     },
//   }
// }
//
// exports.helloPlugin = helloPluginFun;