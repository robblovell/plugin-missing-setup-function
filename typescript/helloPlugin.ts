export const helloPlugin = {
  name: 'hello',
  setup(build: any) {
    console.log('Hello World')
  },
}
// export const helloPlugin = () => {
//   return {
//     name: 'hello',
//     setup(build: any) {
//       console.log('Hello World')
//     },
//   }
// }