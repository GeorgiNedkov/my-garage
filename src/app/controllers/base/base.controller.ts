export interface BaseController<T> {
    getAll(req, res);
    GetAll(req, res);
    getById(req, res);
    add(req, res);
    getForm(req, res);
    search(req, res);
    profileCars(req, res);
}