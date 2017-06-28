"use strict";
exports.__esModule = true;
var Car = (function () {
    function Car(id, Model, Mileage, Color, Price, Year, Description, imgUrl) {
        this.id = id;
        this.Model = Model;
        this.Mileage = Mileage;
        this.Color = Color;
        this.Price = Price;
        this.Year = Year;
        this.Description = Description;
        this.imgUrl = imgUrl;
    }
    Car.toModel = function (obj) {
        return {
            Model: obj.Model,
            Mileage: obj.Mileage,
            Color: obj.Color,
            Price: obj.Price,
            Year: obj.Year,
            Description: obj.Description,
            imgUrl: obj.imgUrl
        };
    };
    Car.fromModel = function (model) {
        var id = model.id || model._id;
        var Model = model.Model;
        var Mileage = model.Mileage;
        var Color = model.Color;
        var Price = model.Price;
        var Year = model.Year;
        var Description = model.Description;
        var imgUrl = model.imgUrl;
        return new Car(id, Model, Mileage, Color, Price, Year, Description, imgUrl);
    };
    return Car;
}());
exports.Car = Car;
