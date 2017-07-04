import * as express from "express";
import { BaseController } from "../controllers/base/base.controller";
import { Car } from "../models/cars";
import { BaseRoute } from "./base/base.route";

export class ProfileRoute implements BaseRoute {
    controller: BaseController<Car>;
    router: express.Router;

    constructor(controller: BaseController<Car>) {
        this.router = express.Router();
        this.controller = controller;
        this.initRoutes();
    }

    initRoutes() {
        this.router
            .get("/profile/:id", (req, res) => this.controller.profileCars(req, res))
            .get("/profile/getall/cars/from/db/by/ajax", (req, res) => this.controller.getAll(req, res))
            .get("/profilemassage/ajax/massage", (req, res) => this.controller.GetAll(req, res));

    }

    public getRouter(): any {
        return this.router;
    }
}