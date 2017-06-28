import { StringValidator } from "./app/validators/string.validator";
import { BaseAuthController } from "./app/controllers/base/base.auth.controller";
import { AuthController } from "./app/controllers/auth.controller";
import { Encryptor } from "./app/utils/encryptor";
import { RedisStoreFactory } from "./app/stores/redis.store.factory";
import { BaseStoreFactory } from "./app/stores/base/base.store.factory";
import { MongoDbStoreFactory } from "./app/stores/mongodb.store.factory";
import { AuthRoute } from "./app/routes/auth.route";
import { User } from "./app/models/user.model";
import { BaseAuthProvider } from "./app/auth/base/base.auth.provider";
import { PassportAuthProvider } from "./app/auth/passport.auth.provider";
import * as path from "path";
import * as bodyParser from "body-parser";

import { connectionString, port, secret, redisConnectionString } from "./app/config";
import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_VALID_CHARS } from "./app/config";

import { Application } from "./app/base/application";

import { BaseController } from "./app/controllers/base/base.controller";
import { BaseData } from "./app/data/base/base.data";

import { ExpressApplication } from "./app/ExpressApplication";
import { DbConfig } from "./app/db";
import { Logger } from "./app/utils/logger";
import { MongoDbData } from "./app/data/mongodb.data";
import { Car } from "./app/models/cars";
import { CarsController } from "./app/controllers/cars.controller";
import { CarsRoute } from "./app/routes/cars.route";

let logger;

let db;

let storeFactory: BaseStoreFactory;

let carsData: BaseData<Car>;
let usersData: BaseData<User>;

let app: Application;
let authProvider: BaseAuthProvider;

let carsController: BaseController<Car>;
let authController: BaseAuthController;

let encryptor = new Encryptor();

let validators = {
    validators: {},
    getStringValidator(min, max, chars) {
        const key = `${min}---${max}---${chars}`;
        if (!this.validators[key]) {
            this.validators[key] = new StringValidator(min, max, chars);
        }
        return this.validators[key];
    }
};

Promise.resolve()
    .then(() => {
        return DbConfig.initMongoDb(connectionString);
    })
    // init
    .then(dbInstance => {
        db = dbInstance;
        usersData = new MongoDbData<User>(db, User, User);
        carsData = new MongoDbData<Car>(db, Car, Car);

        app = new ExpressApplication();
        logger = new Logger();

        // storeFactory = new MongoDbStoreFactory(db);
        storeFactory = new RedisStoreFactory(redisConnectionString);
    })

    // add view engine
    .then(() => {
        app.set("view engine", "pug");
        app.set("views", path.join(__dirname, "app", "views"));
    })

    // add middlewares
    .then(() => {
        app.useMiddleware((req, res, next) => {
            if (req.body && req.body.password) {
                req.body.password = encryptor.encrypt(req.body.password);
            }
            next();
        });
        app.useMiddleware(bodyParser.json());
        app.useMiddleware(bodyParser.urlencoded({ extended: true }));
        app.useMiddleware(logger.getLoggerMiddleware());
    })

    // add static files
    .then(() => {
        const staticDir = path.join(__dirname, "../build", "app", "public");
        app.addStaticResource("/static", staticDir);
        const libsDir = path.join(__dirname, "../node_modules");
        app.addStaticResource("/libs", libsDir);
    })

    // add auth

    .then(() => {
        authProvider = new PassportAuthProvider(usersData, secret, storeFactory);
        authProvider.addToApp(app);
    })

    // init controller
    .then(() => {
        carsController = new CarsController(carsData);
        let validator = validators.getStringValidator(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_VALID_CHARS);
        authController = new AuthController(usersData, validator);
    })

    // add routes
    .then(() => {

        let carsRoute = new CarsRoute(carsController);
        app.addRoute(carsRoute);


        let authRoute = new AuthRoute(authController);
        app.addRoute(authRoute);
        ;
    })

    // start application
    .then(() => {
        return app.start(port);
    }).catch((Error) => { console.log(Error) })
    .then(() => {
        console.log(`Server running at :${port}`);
    });
