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
        this.router
            .get("/cars/all", (req, res) => this.controller.getAll(req, res))
            .get("/cars/add", (req, res) => this.controller.getForm(req, res))
            .get("/cars/:id", (req, res) => this.controller.getById(req, res))
            .get("/", (req, res) => this.controller.GetAll(req, res))
            .post("/cars/car-search", (req, res) => this.controller.search(req, res))
            .post("/cars", (req, res) => this.controller.add(req, res));


    }

    public getRouter(): any {
        return this.router;
    }
}