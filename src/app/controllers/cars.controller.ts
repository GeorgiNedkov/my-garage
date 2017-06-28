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
                let Models: ["volvo", "BMV", "mercedes", "Audi"];
                let prices: [1000, 2000, 3000, 4000, 5000, 6000];
                const model = {
                    model: cars,
                    user: req.user,
                    Models: ["volvo", "BMV", "mercedes", "Audi"],
                    prices: [1000, 2000, 3000, 4000, 5000, 6000]
                };

                return res.render("layout/wellcome", model);
            });
    }

    getForm(req, res) {
        return res.render("cars/car-add");
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
        return this.data.find(body.Model, body.Year)
            .then(cars => {
                let model = {
                    model: cars
                };
                res.render("cars/car-search", model);
            });
    }

    add(req, res) {
        let body = req.body;
        return this.data.add(body)
            .then(car => {
                res.redirect("/cars/all");
            });
    }
}