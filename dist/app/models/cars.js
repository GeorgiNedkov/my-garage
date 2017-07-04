"use strict";
exports.__esModule = true;
var Car = (function () {
    function Car(id, Makes, Mileage, location, Price, Year, Description, imgUrl, Telephone, userID, userName) {
        this.id = id;
        this.Makes = Makes;
        this.Mileage = Mileage;
        this.location = location;
        this.Price = Price;
        this.Year = Year;
        this.Description = Description;
        this.imgUrl = imgUrl;
        this.Telephone = Telephone;
        this.userID = userID;
        this.userName = userName;
    }
    Car.toModel = function (obj) {
        return {
            Makes: obj.Makes,
            Mileage: obj.Mileage,
            location: obj.location,
            Price: obj.Price,
            Year: obj.Year,
            Description: obj.Description,
            imgUrl: obj.imgUrl,
            Telephone: obj.Telephone,
            userID: obj.userID,
            userName: obj.userName
        };
    };
    Car.fromModel = function (model) {
        var id = model.id || model._id;
        var Makes = model.Makes;
        var Mileage = model.Mileage;
        var location = model.location;
        var Price = model.Price;
        var Year = model.Year;
        var Description = model.Description;
        var imgUrl = model.imgUrl;
        var Telephone = model.Telephone;
        var userID = model.userID;
        var userName = model.userName;
        return new Car(id, Makes, Mileage, location, Price, Year, Description, imgUrl, Telephone, userID, userName);
    };
    return Car;
}());
exports.Car = Car;
