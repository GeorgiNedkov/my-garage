"use strict";
exports.__esModule = true;
var Car = (function () {
    function Car(id, Makes, Mileage, Color, Price, Year, Description, imgUrl) {
        this.id = id;
        this.Makes = Makes;
        this.Mileage = Mileage;
        this.Color = Color;
        this.Price = Price;
        this.Year = Year;
        this.Description = Description;
        this.imgUrl = imgUrl;
    }
    Car.toModel = function (obj) {
        return {
            Makes: obj.Makes,
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
        var Makes = model.Makes;
        var Mileage = model.Mileage;
        var Color = model.Color;
        var Price = model.Price;
        var Year = model.Year;
        var Description = model.Description;
        var imgUrl = model.imgUrl;
        return new Car(id, Makes, Mileage, Color, Price, Year, Description, imgUrl);
    };
    return Car;
}());
exports.Car = Car;
