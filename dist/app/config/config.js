"use strict";
exports.__esModule = true;
var connectionString = process.env.CONNECTION_STRING ||
    "mongodb://a:a@ds139122.mlab.com:39122/express-node";
exports.connectionString = connectionString;
var redisConnectionString = process.env.REDIS_CONNECTION_STRING ||
    "//127.0.0.1:6379";
exports.redisConnectionString = redisConnectionString;
var port = process.env.PORT || 3001;
exports.port = port;
var secret = "purple unicorn";
exports.secret = secret;
var USERNAME_MIN_LENGTH = 3;
exports.USERNAME_MIN_LENGTH = USERNAME_MIN_LENGTH;
var USERNAME_MAX_LENGTH = 30;
exports.USERNAME_MAX_LENGTH = USERNAME_MAX_LENGTH;
var smallLetters = Array.from({ length: 'z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1 })
    .map(function (_, i) { return String.fromCharCode(i + 'a'.charCodeAt(0)); })
    .join();
var capitalLetters = Array.from({ length: 'Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1 })
    .map(function (_, i) { return String.fromCharCode(i + 'A'.charCodeAt(0)); })
    .join();
var digits = Array.from({ length: 10 })
    .map(function (_, n) { return n; })
    .join();
var specialChars = "._";
var USERNAME_VALID_CHARS = smallLetters + capitalLetters + digits + specialChars;
exports.USERNAME_VALID_CHARS = USERNAME_VALID_CHARS;
