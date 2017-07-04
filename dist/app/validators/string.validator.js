"use strict";
exports.__esModule = true;
var StringValidator = (function () {
    function StringValidator(minLength, maxLength, chars) {
        this.minLength = minLength;
        this.maxLength = maxLength;
        if (chars) {
            this.chars =
                Array.isArray(chars)
                    ? chars
                    : chars.split("");
        }
        else {
            this.chars = [""];
        }
    }
    StringValidator.prototype.isValid = function (value) {
        var _this = this;
        var isString = (typeof value === "string");
        if (!isString) {
            return false;
        }
        var str = (value + "").split("");
        var isLengthValid = str.length >= this.minLength &&
            str.length <= this.maxLength;
        if (!isLengthValid) {
            return false;
        }
        var doesContainValidChars = str.every(function (ch) { return _this.chars.indexOf(ch) >= 0; });
        return doesContainValidChars;
    };
    return StringValidator;
}());
exports.StringValidator = StringValidator;
