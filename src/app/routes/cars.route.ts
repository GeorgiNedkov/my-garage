import * as express from "express";
import { BaseController } from "../controllers/base/base.controller";
import { Car } from "../models/cars";
import { BaseRoute } from "./base/base.route";

export class CarsRoute implements BaseRoute {
    controller: BaseController<Car>;
    router: express.Router;

    constructor(controller: BaseController<Car>) {
        this.router = express.Router();
        this.controller = controller;
        this.initRoutes();
    }

    initRoutes() {
        let books = [{
            id: 1,
            title: "harry",
            description: "desc about harrry"
        }];

        this.router
            .get("/cars/all", (req, res) => this.controller.getAll(req, res))
            .get("/cars/add", this.ensureAuthenticated, (req, res) => this.controller.getForm(req, res))
            .get("/cars/:id", (req, res) => this.controller.getById(req, res))
            .get("/", (req, res) => this.controller.GetAll(req, res))
            .get("/profile", (req, res) => this.controller.profileCars(req, res))
            .post("/cars/car-search", (req, res) => this.controller.search(req, res))
            .post("/cars", (req, res) => this.controller.add(req, res))
            .get("/books", (req, res) => {
                return res.send(books);
            });


    }
    ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            // req.flash('error_msg','You are not logged in');
            res.redirect("/auth/login");
        }
    }

    public getRouter(): any {
        return this.router;
    }
}