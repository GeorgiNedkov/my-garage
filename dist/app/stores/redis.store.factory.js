"use strict";
exports.__esModule = true;
var session = require("express-session");
var connectRedis = require("connect-redis");
var RedisStore = connectRedis(session);
var RedisStoreFactory = (function () {
    function RedisStoreFactory(connectionString) {
        this.connectionString = connectionString;
    }
    RedisStoreFactory.prototype.getStore = function () {
        return new RedisStore({
            url: this.connectionString
        });
    };
    return RedisStoreFactory;
}());
exports.RedisStoreFactory = RedisStoreFactory;
