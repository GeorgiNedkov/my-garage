"use strict";
exports.__esModule = true;
var express = require("express");
var ProfileRoute = (function () {
    function ProfileRoute(controller) {
        this.router = express.Router();
        this.controller = controller;
        this.initRoutes();
    }
    ProfileRoute.prototype.initRoutes = function () {
        var _this = this;
        this.router
            .get("/profile/:id", function (req, res) { return _this.controller.profileCars(req, res); })
            .get("/profile/getall/cars/from/db/by/ajax", function (req, res) { return _this.controller.getAll(req, res); })
            .get("/profilemassage/ajax/massage", function (req, res) { return _this.controller.GetAll(req, res); })
            .get("/searchajac/search/search/search/search", function (req, res) { return _this.controller.search(req, res); })
            .get("/searchajac/img/in/space/but", function (req, res) { return _this.controller.getById(req, res); });
    };
    ProfileRoute.prototype.getRouter = function () {
        return this.router;
    };
    return ProfileRoute;
}());
exports.ProfileRoute = ProfileRoute;
