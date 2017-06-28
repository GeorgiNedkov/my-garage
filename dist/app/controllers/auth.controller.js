"use strict";
exports.__esModule = true;
var encryptor_1 = require("./../utils/encryptor");
var user_model_1 = require("./../models/user.model");
var AuthController = (function () {
    function AuthController(data, validator) {
        this.data = data;
        this.validator = validator;
    }
    AuthController.prototype.getLoginForm = function (req, res) {
        return res.render("auth/login");
    };
    AuthController.prototype.getRegisterForm = function (req, res) {
        return res.render("auth/register", {
            error: req.query.error
        });
    };
    AuthController.prototype.loginUser = function (req, res) {
        if (req.isAuthenticated()) {
            res.redirect("/");
        }
        else {
            res.redirect("/login");
        }
    };
    AuthController.prototype.registerUser = function (req, res) {
        var _this = this;
        var encryptor = new encryptor_1.Encryptor();
        var username = req.body.username;
        var password = req.body.password;
        var user = new user_model_1.User("", username, password);
        return Promise.resolve(user)
            .then(function (user) {
            if (!_this.validator.isValid(user.username)) {
                throw new Error("ShortUsername");
            }
            return _this.data.findOne({ username: user.username }, false);
        })
            .then(function (dbUser) {
            if (dbUser) {
                throw new Error("UserExists");
            }
            return _this.data.add(user);
        })
            .then(function (user) {
            return res.redirect("/auth/login");
        })["catch"](function (err) {
            return res.status(401)
                .redirect("/auth/register?error=" + err.message);
        });
    };
    AuthController.prototype.logoutUser = function (req, res) {
        req.logOut();
        res.redirect("/");
    };
    return AuthController;
}());
exports.AuthController = AuthController;
