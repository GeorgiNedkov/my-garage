"use strict";
exports.__esModule = true;
var express = require("express");
var CarsRoute = (function () {
    function CarsRoute(controller) {
        this.router = express.Router();
        this.controller = controller;
        this.initRoutes();
    }
    CarsRoute.prototype.initRoutes = function () {
        var _this = this;
        this.router
            .get("/cars/all", function (req, res) { return _this.controller.getAll(req, res); })
            .get("/cars/add", function (req, res) { return _this.controller.getForm(req, res); })
            .get("/cars/:id", function (req, res) { return _this.controller.getById(req, res); })
            .get("/", function (req, res) { return _this.controller.GetAll(req, res); })
            .get("/profile", function (req, res) { return _this.controller.profileCars(req, res); })
            .post("/cars/car-search", function (req, res) { return _this.controller.search(req, res); })
            .post("/cars", function (req, res) { return _this.controller.add(req, res); });
    };
    CarsRoute.prototype.getRouter = function () {
        return this.router;
    };
    return CarsRoute;
}());
exports.CarsRoute = CarsRoute;
