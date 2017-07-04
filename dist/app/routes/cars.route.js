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
        var books = [{
                id: 1,
                title: "harry",
                description: "desc about harrry"
            }];
        this.router
            .get("/cars/all", function (req, res) { return _this.controller.getAll(req, res); })
            .get("/cars/add", this.ensureAuthenticated, function (req, res) { return _this.controller.getForm(req, res); })
            .get("/cars/:id", function (req, res) { return _this.controller.getById(req, res); })
            .get("/", function (req, res) { return _this.controller.GetAll(req, res); })
            .get("/profile", function (req, res) { return _this.controller.profileCars(req, res); })
            .post("/cars/car-search", function (req, res) { return _this.controller.search(req, res); })
            .post("/cars", function (req, res) { return _this.controller.add(req, res); })
            .get("/books", function (req, res) {
            return res.send(books);
        });
    };
    CarsRoute.prototype.ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            // req.flash('error_msg','You are not logged in');
            res.redirect("/auth/login");
        }
    };
    CarsRoute.prototype.getRouter = function () {
        return this.router;
    };
    return CarsRoute;
}());
exports.CarsRoute = CarsRoute;
