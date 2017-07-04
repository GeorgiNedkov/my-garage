import { Request, Response } from "express";

import { BaseData } from "./../data/base/base.data";
import { BaseController } from "./base/base.controller";
import { Car } from "../models/cars";
import { User } from "../models/user.model";

export class ProfileController<T> implements BaseController<Car> {



    carsdata: BaseData<Car>;
    userdata: BaseData<User>;
    constructor(carsdata: BaseData<Car>, userdata: BaseData<User>) {
        this.carsdata = carsdata;
        this.userdata = userdata;
    }
    getAll(req, res) {
        return this.carsdata.getAll()
            .then((cars: Car[]) => {
                res.send(cars);
            });
    }

    GetAll(req, res) {
        const message = "You are logged in";
        res.send(message);
    }

    getForm(req, res) {

    }

    getById(req, res) {

    }
    search(req, res) {
        let id = req.params.id;
        return this.carsdata.getAll()
            .then((cars1: Car[]) => {
                this.userdata.getById(id)
                    .then((user: User) => {
                        let cars: Car[] = cars1.filter((car1) => car1.userID == user.id);
                        res.send(cars);
                    });
            });
    }

    profileCars(req, res) {
        let id = req.params.id;
        return this.carsdata.getAll()
            .then((cars1: Car[]) => {
                this.userdata.getById(id)
                    .then((user: User) => {
                        let cars: Car[] = cars1.filter((car1) => car1.userID == user.id);
                        for (let car1 of cars1) {
                            console.log(`${car1.userID} === ${user.id}`);
                        }
                        console.log(cars);
                        let model = {
                            model: user,
                            cars: cars,
                            user: req.user
                        };
                        res.render("user/user-id", model);
                    });
            });
    }

    add(req, res) {

    }
    ajaxGetAll(req: any, res: any) {

    }
}