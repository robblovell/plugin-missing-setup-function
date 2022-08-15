import * as fs from 'fs'

const api = (event, context, callback) => {
  console.log("Hello from the custom Lambda!");
  try {
    const contents = fs.readFileSync('./app.txt')
    return callback(null, {
      statusCode: 200,
      body: contents.toString(),
    });
  } catch (error) {
    return callback(null, {
      statusCode: 500,
      body: error.message,
    })
  }
};
exports.api = api;
