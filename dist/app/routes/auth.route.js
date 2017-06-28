"use strict";
exports.__esModule = true;
var passport = require("passport");
var express_1 = require("express");
var AuthRoute = (function () {
    function AuthRoute(controller) {
        this.controller = controller;
        this.router = express_1.Router();
        this.initRoutes();
    }
    AuthRoute.prototype.initRoutes = function () {
        var _this = this;
        this.router
            .get("/auth/login", function (req, res) {
            return _this.controller.getLoginForm(req, res);
        })
            .get("/auth/register", function (req, res) {
            _this.controller.getRegisterForm(req, res);
        })
            .post("/auth/login", passport.authenticate("local"), function (req, res) {
            return _this.controller.loginUser(req, res);
        })
            .post("/auth/register", function (req, res) {
            return _this.controller.registerUser(req, res);
        })
            .post("/auth/logout", function (req, res) {
            return _this.controller.logoutUser(req, res);
        });
    };
    AuthRoute.prototype.getRouter = function () {
        return this.router;
    };
    return AuthRoute;
}());
exports.AuthRoute = AuthRoute;
