"use strict";
exports.__esModule = true;
var CarsController = (function () {
    function CarsController(data) {
        this.data = data;
    }
    CarsController.prototype.getAll = function (req, res) {
        return this.data.getAll()
            .then(function (cars) {
            var model = {
                model: cars,
                user: req.user
            };
            return res.render("cars/car-all", model);
        });
    };
    CarsController.prototype.GetAll = function (req, res) {
        return this.data.getAll()
            .then(function (cars) {
            var Models;
            var prices;
            var model = {
                model: cars,
                user: req.user,
                Models: ["volvo", "BMV", "mercedes", "Audi"],
                prices: [1000, 2000, 3000, 4000, 5000, 6000]
            };
            return res.render("layout/wellcome", model);
        });
    };
    CarsController.prototype.getForm = function (req, res) {
        return res.render("cars/car-add");
    };
    CarsController.prototype.getById = function (req, res) {
        var id = req.params.id;
        return this.data.getById(id)
            .then(function (car) {
            var model = {
                model: car,
                user: req.user
            };
            return res.render("cars/car-id", model);
        });
    };
    CarsController.prototype.search = function (req, res) {
        var body = req.body;
        return this.data.find(body.Model, body.Year)
            .then(function (cars) {
            var model = {
                model: cars
            };
            res.render("cars/car-search", model);
        });
    };
    CarsController.prototype.add = function (req, res) {
        var body = req.body;
        return this.data.add(body)
            .then(function (car) {
            res.redirect("/cars/all");
        });
    };
    return CarsController;
}());
exports.CarsController = CarsController;
