const api = (event, context, callback) => {
  console.log('Hello from the custom Lambda!')
  return callback(null, {
    statusCode: 200,
    body: "Hello World!"
  })
}
exports.api = api