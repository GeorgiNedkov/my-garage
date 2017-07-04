"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var MongoDbData = (function () {
    function MongoDbData(db, Klass, modelFuncs) {
        this.db = db;
        var collectionName = this.getCollectionName(Klass);
        this.collection = this.db.collection(collectionName);
        this.modelFuncs = modelFuncs;
    }
    MongoDbData.prototype.getAll = function () {
        var _this = this;
        return this.collection.find()
            .toArray()
            .then(function (models) {
            if (!models) {
                return [];
            }
            return models.map(function (model) { return _this.modelFuncs.fromModel(model); });
        });
    };
    MongoDbData.prototype.findOne = function (query, isCaseSensitive) {
        var _this = this;
        if (isCaseSensitive === void 0) { isCaseSensitive = true; }
        if (!isCaseSensitive) {
            query = Object.keys(query)
                .reduce(function (q, key) {
                q[key] = new RegExp(query[key].toLowerCase(), "i");
                return q;
            }, {});
        }
        return this.collection.findOne(query)
            .then(function (model) {
            if (!model) {
                return model;
            }
            return _this.modelFuncs.fromModel(model);
        });
    };
    MongoDbData.prototype.getById = function (id) {
        var _this = this;
        var objectId = new mongodb_1.ObjectID(id);
        return this.collection.findOne({ _id: objectId })
            .then(function (model) { return _this.modelFuncs.fromModel(model); });
    };
    MongoDbData.prototype.add = function (item) {
        return this.collection.insertOne(item)
            .then(function (result) {
            return item;
        });
    };
    MongoDbData.prototype.find = function (Model, Year) {
        return this.collection.find({ Model: Model, Year: Year }).toArray();
    };
    MongoDbData.prototype.getCollectionName = function (Klass) {
        var klassName = Klass.prototype.constructor.name;
        console.log(klassName);
        return klassName.toLowerCase() + "s";
    };
    return MongoDbData;
}());
exports.MongoDbData = MongoDbData;
