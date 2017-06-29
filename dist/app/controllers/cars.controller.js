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
            var makes = ["Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", "Chevrolet8", "Chrysler", "Citroen", "Dodge", "Ferrari", "Fiat", "Ford", "Geely", "General Motors", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Koenigsegg", "Lamborghini", "Land Rover", "Lexus", "Maserati", "Mazda", "McLaren", "Mercedes- Benz", "Mini2", "Mitsubishi", "Nissan", "Pagani", "Peugeot", "Porsche", "Ram", "Renault", "Rolls Royce", "Saab", "Subaru", "Suzuki", "TATA Motors", "Tesla", "Toyota", "Volkswagen", "Volvo"];
            var prices1 = [1000, 2000, 3000, 4000, 5000, 7500, 10000, 15000, 20000, 30000, 40000, 50000];
            var prices2 = [50000, 40000, 30000, 20000, 15000, 10000, 7500, 5000, 4000, 3000, 2000, 1000];
            var model = {
                model: cars,
                user: req.user,
                makes: makes,
                prices1: prices1,
                prices2: prices2
            };
            return res.render("layout/wellcome", model);
        });
    };
    CarsController.prototype.getForm = function (req, res) {
        var makes = ["Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", "Chevrolet8", "Chrysler", "Citroen", "Dodge", "Ferrari", "Fiat", "Ford", "Geely", "General Motors", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Koenigsegg", "Lamborghini", "Land Rover", "Lexus", "Maserati", "Mazda", "McLaren", "Mercedes- Benz", "Mini2", "Mitsubishi", "Nissan", "Pagani", "Peugeot", "Porsche", "Ram", "Renault", "Rolls Royce", "Saab", "Subaru", "Suzuki", "TATA Motors", "Tesla", "Toyota", "Volkswagen", "Volvo"];
        var model = {
            model: makes
        };
        return res.render("cars/car-add", model);
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
        return this.data.getAll()
            .then(function (cars1) {
            var car = cars1.filter(function (car1) {
                return (car1.Makes === body.Makes || body.Makes === "All") && +car1.Price >= body.Price1 && +car1.Year >= body.Year && +car1.Price <= body.Price2;
            });
            // .filter((car2) =>
            //     +car2.Price >= body.Price1
            // )
            // .filter((car3) =>
            //     +car3.Price <= body.Price2
            // );
            var model = {
                model: car
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
