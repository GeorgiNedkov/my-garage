"use strict";
exports.__esModule = true;
var string_validator_1 = require("./app/validators/string.validator");
var auth_controller_1 = require("./app/controllers/auth.controller");
var encryptor_1 = require("./app/utils/encryptor");
var mongodb_store_factory_1 = require("./app/stores/mongodb.store.factory");
var auth_route_1 = require("./app/routes/auth.route");
var user_model_1 = require("./app/models/user.model");
var passport_auth_provider_1 = require("./app/auth/passport.auth.provider");
var path = require("path");
var bodyParser = require("body-parser");
var config_1 = require("./app/config");
var config_2 = require("./app/config");
var ExpressApplication_1 = require("./app/ExpressApplication");
var db_1 = require("./app/db");
var logger_1 = require("./app/utils/logger");
var mongodb_data_1 = require("./app/data/mongodb.data");
var cars_1 = require("./app/models/cars");
var cars_controller_1 = require("./app/controllers/cars.controller");
var cars_route_1 = require("./app/routes/cars.route");
var logger;
var db;
var storeFactory;
var carsData;
var usersData;
var app;
var authProvider;
var carsController;
var authController;
var encryptor = new encryptor_1.Encryptor();
var validators = {
    validators: {},
    getStringValidator: function (min, max, chars) {
        var key = min + "---" + max + "---" + chars;
        if (!this.validators[key]) {
            this.validators[key] = new string_validator_1.StringValidator(min, max, chars);
        }
        return this.validators[key];
    }
};
Promise.resolve()
    .then(function () {
    return db_1.DbConfig.initMongoDb(config_1.connectionString);
})
    .then(function (dbInstance) {
    db = dbInstance;
    usersData = new mongodb_data_1.MongoDbData(db, user_model_1.User, user_model_1.User);
    carsData = new mongodb_data_1.MongoDbData(db, cars_1.Car, cars_1.Car);
    app = new ExpressApplication_1.ExpressApplication();
    logger = new logger_1.Logger();
    storeFactory = new mongodb_store_factory_1.MongoDbStoreFactory(db);
    // storeFactory = new RedisStoreFactory(redisConnectionString);
})
    .then(function () {
    app.set("view engine", "pug");
    app.set("views", path.join(__dirname, "app", "views"));
})
    .then(function () {
    app.useMiddleware(function (req, res, next) {
        if (req.body && req.body.password) {
            req.body.password = encryptor.encrypt(req.body.password);
        }
        next();
    });
    app.useMiddleware(bodyParser.json());
    app.useMiddleware(bodyParser.urlencoded({ extended: true }));
    app.useMiddleware(logger.getLoggerMiddleware());
})
    .then(function () {
    var staticDir = path.join(__dirname, "../dist", "app", "public");
    app.addStaticResource("/static", staticDir);
    var libsDir = path.join(__dirname, "../node_modules");
    app.addStaticResource("/libs", libsDir);
})
    .then(function () {
    authProvider = new passport_auth_provider_1.PassportAuthProvider(usersData, config_1.secret, storeFactory);
    authProvider.addToApp(app);
})
    .then(function () {
    carsController = new cars_controller_1.CarsController(carsData);
    var validator = validators.getStringValidator(config_2.USERNAME_MIN_LENGTH, config_2.USERNAME_MAX_LENGTH, config_2.USERNAME_VALID_CHARS);
    authController = new auth_controller_1.AuthController(usersData, validator);
})
    .then(function () {
    var carsRoute = new cars_route_1.CarsRoute(carsController);
    app.addRoute(carsRoute);
    var authRoute = new auth_route_1.AuthRoute(authController);
    app.addRoute(authRoute);
    ;
})
    .then(function () {
    return app.start(config_1.port);
})["catch"](function (Error) { console.log(Error); })
    .then(function () {
    console.log("Server running at :" + config_1.port);
});
