"use strict";
exports.__esModule = true;
exports.api = void 0;
var api = function (event, context, callback) {
    console.log('Hello from the custom Lambda!');
    return callback(null, {
        statusCode: 200,
        body: "Hello World!"
    });
};
exports.api = api;
