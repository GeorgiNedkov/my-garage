import { Request, Response } from "express";

import { BaseData } from "./../data/base/base.data";
import { BaseController } from "./base/base.controller";
import { Car } from "../models/cars";

export class CarsController<T> implements BaseController<Car> {
    data: BaseData<Car>;

    constructor(data: BaseData<Car>) {
        this.data = data;
    }

    getAll(req, res) {
        return this.data.getAll()
            .then((cars: Car[]) => {
                const model = {
                    model: cars,
                    user: req.user
                };

                return res.render("cars/car-all", model);
            });
    }

    GetAll(req, res) {
        return this.data.getAll()
            .then((cars: Car[]) => {
                let makes = ["Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", "Chevrolet8", "Chrysler", "Citroen", "Dodge", "Ferrari", "Fiat", "Ford", "Geely", "General Motors", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Koenigsegg", "Lamborghini", "Land Rover", "Lexus", "Maserati", "Mazda", "McLaren", "Mercedes- Benz", "Mini2", "Mitsubishi", "Nissan", "Pagani", "Peugeot", "Porsche", "Ram", "Renault", "Rolls Royce", "Saab", "Subaru", "Suzuki", "TATA Motors", "Tesla", "Toyota", "Volkswagen", "Volvo"]
                let prices1 = [1000, 2000, 3000, 4000, 5000, 7500, 10000, 15000, 20000, 30000, 40000, 50000];
                let prices2 = [50000, 40000, 30000, 20000, 15000, 10000, 7500, 5000, 4000, 3000, 2000, 1000];
                const model = {
                    model: cars,
                    user: req.user,
                    makes: makes,
                    prices1: prices1,
                    prices2: prices2
                };

                return res.render("layout/wellcome", model);
            });
    }

    getForm(req, res) {
        let makes = ["Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", "Chevrolet8", "Chrysler", "Citroen", "Dodge", "Ferrari", "Fiat", "Ford", "Geely", "General Motors", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Koenigsegg", "Lamborghini", "Land Rover", "Lexus", "Maserati", "Mazda", "McLaren", "Mercedes- Benz", "Mini2", "Mitsubishi", "Nissan", "Pagani", "Peugeot", "Porsche", "Ram", "Renault", "Rolls Royce", "Saab", "Subaru", "Suzuki", "TATA Motors", "Tesla", "Toyota", "Volkswagen", "Volvo"]
        let model = {
            model: makes,
            user: req.user
        }
        return res.render("cars/car-add", model);
    }

    getById(req, res) {
        let id = req.params.id;
        return this.data.getById(id)
            .then((car: Car) => {
                let model = {
                    model: car,
                    user: req.user
                };

                return res.render("cars/car-id", model);
            });
    }
    search(req, res) {
        let body = req.body;
        return this.data.getAll()
            .then(cars1 => {
                let car: Car[] = cars1.filter((car1) =>
                    (car1.Makes === body.Makes || body.Makes === "All") && +car1.Price >= body.Price1 && +car1.Year >= body.Year && +car1.Price <= body.Price2
                );
                // .filter((car2) =>
                //     +car2.Price >= body.Price1
                // )
                // .filter((car3) =>
                //     +car3.Price <= body.Price2
                // );

                let model = {
                    model: car,
                    user: req.user
                };
                res.render("cars/car-search", model);
            });
    }

    profileCars(req, res) {
        return this.data.getAll()
            .then((cars1: Car[]) => {
                let car: Car[] = cars1.filter((car1) => car1.userID === "\"" + req.user.id + "\"");
                for (let car1 of cars1) { console.log(`${car1.userID} === ${req.user.id}`); };
                console.log(car);
                let model = {
                    model: car,
                    user: req.user
                };
                res.render("user/profile", model);
            });
    }

    add(req, res) {
        let body = req.body;
        let userID = JSON.stringify(req.user.id);
        body["userID"] = userID;
        console.log(userID);
        return this.data.add(body)
            .then(car => {
                res.redirect("/cars/all");
            });
    }
}