"use strict";
exports.__esModule = true;
var ProfileController = (function () {
    function ProfileController(carsdata, userdata) {
        this.carsdata = carsdata;
        this.userdata = userdata;
    }
    ProfileController.prototype.getAll = function (req, res) {
        return this.carsdata.getAll()
            .then(function (cars) {
            res.send(cars);
        });
    };
    ProfileController.prototype.GetAll = function (req, res) {
        var message = "You are logged in";
        res.send(message);
    };
    ProfileController.prototype.getForm = function (req, res) {
    };
    ProfileController.prototype.getById = function (req, res) {
        var url = "https://uau.bg/7926-12680-home/frantic-stamper-fra-die-09164-race-car.jpg";
        res.send(url);
    };
    ProfileController.prototype.search = function (req, res) {
    };
    ProfileController.prototype.profileCars = function (req, res) {
        var _this = this;
        var id = req.params.id;
        return this.carsdata.getAll()
            .then(function (cars1) {
            _this.userdata.getById(id)
                .then(function (user) {
                var cars = cars1.filter(function (car1) { return car1.userID == user.id; });
                for (var _i = 0, cars1_1 = cars1; _i < cars1_1.length; _i++) {
                    var car1 = cars1_1[_i];
                    console.log(car1.userID + " === " + user.id);
                }
                console.log(cars);
                var model = {
                    model: user,
                    cars: cars,
                    user: req.user
                };
                res.render("user/user-id", model);
                // res.send(cars);
            });
        });
    };
    ProfileController.prototype.add = function (req, res) {
    };
    ProfileController.prototype.ajaxGetAll = function (req, res) {
    };
    return ProfileController;
}());
exports.ProfileController = ProfileController;
