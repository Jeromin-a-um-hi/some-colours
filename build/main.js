"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hex8 = exports.Hex = exports.Hex3 = exports.CMYK = exports.RGBA = exports.RGB = void 0;
// @ts-ignore
var hex_to_int_1 = require("hex-to-int");
var StringMethods;
(function (StringMethods) {
    function stringCheck(string) {
        if (typeof string === 'string' || string instanceof String) {
            return true;
        }
        else {
            return false;
        }
    }
    StringMethods.stringCheck = stringCheck;
    function stringArrayCheck(string) {
        for (var _i = 0, string_1 = string; _i < string_1.length; _i++) {
            var item = string_1[_i];
            if (stringCheck(item) === false) {
                return false;
            }
        }
        return true;
    }
    StringMethods.stringArrayCheck = stringArrayCheck;
    function removeTrailingZeroes(string) {
        return "" + parseFloat(string);
    }
    StringMethods.removeTrailingZeroes = removeTrailingZeroes;
})(StringMethods || (StringMethods = {}));
var Intermediate = /** @class */ (function () {
    function Intermediate(value, isLowerCase) {
        this.isLowerCase = isLowerCase;
        this.type = "Intermediate";
        this.value = value;
    }
    /**
     * Intermediate -> RGBA
     * @returns RGBa
     */
    Intermediate.prototype.toRGBA = function () {
        var a = parseFloat((Number(this.value[3]) / 255).toFixed(2).toString()).toString();
        return new RGBA([this.value[0], this.value[1], this.value[2], StringMethods.removeTrailingZeroes((Number(this.value[3]) / 255).toFixed(3))]);
    };
    /**
     * Intermediate -> RGB
     * @returns RGB
     */
    Intermediate.prototype.toRGB = function () {
        return new RGB([this.value[0], this.value[1], this.value[2]]);
    };
    /**
     * Intermediate -> Hex
     * @returns Hex
     */
    Intermediate.prototype.toHex = function () {
        var unused = this.value.pop();
        var unconvertedR = Number(this.value[0]);
        var unconvertedG = Number(this.value[1]);
        var unconvertedB = Number(this.value[2]);
        var convertedR = this.intToHex(unconvertedR, this.isLowerCase);
        var convertedG = this.intToHex(unconvertedG, this.isLowerCase);
        var convertedB = this.intToHex(unconvertedB, this.isLowerCase);
        return new Hex("#" + convertedR + convertedG + convertedB);
    };
    Intermediate.prototype.intToHex = function (int, isLowerCase) {
        var floatRegex = /^(.*?)[.]/;
        var afterPointRegex = /\.(.*)/;
        var dividedNumber = (int / 16).toString();
        var wholeNumber;
        if (Number(dividedNumber) % 1 === 0) {
            wholeNumber = Number(dividedNumber);
        }
        else {
            wholeNumber = floatRegex.exec(dividedNumber) === null ? 0 : Number(floatRegex.exec(dividedNumber)[1]);
        }
        var points = afterPointRegex.exec(dividedNumber) === null ? 0 : Number("0" + afterPointRegex.exec(dividedNumber)[0]);
        var secondaryNumber = points * 16;
        return "" + this.miniIntToHex(wholeNumber, isLowerCase) + this.miniIntToHex(secondaryNumber, isLowerCase);
    };
    Intermediate.prototype.miniIntToHex = function (int, isLowerCase) {
        if (int > 9) {
            switch (int) {
                case 10:
                    return isLowerCase ? "a" : "A";
                    break;
                case 11:
                    return isLowerCase ? "b" : "B";
                    break;
                case 12:
                    return isLowerCase ? "c" : "C";
                    break;
                case 13:
                    return isLowerCase ? "d" : "D";
                    break;
                case 14:
                    return isLowerCase ? "e" : "E";
                    break;
                case 15:
                    return isLowerCase ? "f" : "F";
                    break;
            }
        }
        else {
            return int.toString();
        }
    };
    Intermediate.prototype.toHex3 = function () {
        //@ts-ignore
        var hex = this.toHex(this.value).value.split("");
        if (hex[1] === hex[2] && hex[3] === hex[4] && hex[5] == hex[6]) {
            return this.isLowerCase ? new Hex3(("" + hex[0] + hex[1] + hex[3] + hex[5]).toLowerCase()) : new Hex3("" + hex[0] + hex[1] + hex[3] + hex[5]);
        }
        else {
            throw new Error("This cannot be converted into a Hex3.");
        }
    };
    Intermediate.prototype.toHex8 = function () {
        var unconvertedR = Number(this.value[0]);
        var unconvertedG = Number(this.value[1]);
        var unconvertedB = Number(this.value[2]);
        var unconvertedA = Math.round(Number(this.value[3]));
        var convertedR = this.intToHex(unconvertedR, this.isLowerCase);
        var convertedG = this.intToHex(unconvertedG, this.isLowerCase);
        var convertedB = this.intToHex(unconvertedB, this.isLowerCase);
        var convertedA = this.intToHex(unconvertedA, this.isLowerCase);
        return new Hex8("#" + convertedR + convertedG + convertedB + convertedA);
    };
    Intermediate.prototype.toCMYK = function () {
        var R = Number(this.value[0]);
        var G = Number(this.value[1]);
        var B = Number(this.value[2]);
        var R2 = R / 255;
        var G2 = G / 255;
        var B2 = B / 255;
        var K = (1 - Math.max(R2, G2, B2));
        var C = ((1 - R2 - K) / (1 - K));
        var M = ((1 - G2 - K) / (1 - K));
        var Y = (1 - B2 - K) / (1 - K);
        return new CMYK([Math.round(C * 100).toString() + "%", Math.round(M * 100).toString() + "%", Math.round(Y * 100).toString() + "%", Math.round(K * 100).toString() + "%"]);
    };
    return Intermediate;
}());
/**
 * Class from which all colours inherit their values.
 */
var ColourType = /** @class */ (function () {
    function ColourType(passedValue, type) {
        this.type = type;
        if (StringMethods.stringCheck(passedValue)) {
            this.value = passedValue;
        }
        else if (StringMethods.stringArrayCheck(passedValue)) {
            this.value = passedValue;
        }
        else {
            throw new Error("The value of the variable/variables entered must be a string.");
        }
    }
    ColourType.prototype.toIntermediate = function () { };
    ;
    ColourType.prototype.toHex = function () {
        return this.toIntermediate().toHex();
    };
    ;
    ColourType.prototype.toHex3 = function () {
        return this.toIntermediate().toHex3();
    };
    ;
    ColourType.prototype.toRGB = function () {
        return this.toIntermediate().toRGB();
    };
    ColourType.prototype.toCMYK = function () {
        return this.toIntermediate().toCMYK();
    };
    ColourType.prototype.toRGBA = function () {
        return this.toIntermediate().toRGBA();
    };
    ColourType.prototype.toHex8 = function () {
        return this.toIntermediate().toHex8();
    };
    ColourType.prototype.toHSV = function () {
        return this.toIntermediate().toHSV();
    };
    return ColourType;
}());
// Line break for ease of reading
/**
 * String type class.
 * Hex class, accepts string values. Eg: "#000000" which is pitch black.
 */
var Hex = /** @class */ (function (_super) {
    __extends(Hex, _super);
    function Hex(passedValue, isLowerCase) {
        if (isLowerCase === void 0) { isLowerCase = false; }
        var _this = _super.call(this, passedValue, "Hex") || this;
        _this.isLowerCase = isLowerCase;
        Hex.checkIfHex(_this.value);
        _this.checkIfLowerCase(_this.value);
        return _this;
    }
    Hex.checkIfHex = function (value) {
        var CHECKHEX = /^[#][0-9a-fA-F]{6}/;
        if (CHECKHEX.test(value)) {
        }
        else {
            throw new Error("Invalid Hex: " + value);
        }
    };
    Hex.prototype.toIntermediate = function () {
        // @ts-ignore
        var valueSliced = this.value.slice(1);
        var valueSplit = valueSliced.split("");
        var unconvertedR = "" + (valueSplit[0] + valueSplit[1]);
        var unconvertedG = "" + (valueSplit[2] + valueSplit[3]);
        var unconvertedB = "" + (valueSplit[4] + valueSplit[5]);
        var convertedR = hex_to_int_1.hexToInt(unconvertedR).toString();
        var convertedG = hex_to_int_1.hexToInt(unconvertedG).toString();
        var convertedB = hex_to_int_1.hexToInt(unconvertedB).toString();
        var A = "255";
        return new Intermediate([convertedR, convertedG, convertedB, A], this.isLowerCase);
    };
    ;
    Hex.prototype.checkIfLowerCase = function (value) {
        var CHECK_LOWER = /[a-f]/;
        if (CHECK_LOWER.test(value)) {
            this.isLowerCase = true;
        }
    };
    return Hex;
}(ColourType));
exports.Hex = Hex;
/**
 * String type class.
 * Hex3 class, accepts string values, minified version of Hex intended for CSS. Eg: "#FFF" (Which is "#FFFFFF" in Hex)
 */
var Hex3 = /** @class */ (function (_super) {
    __extends(Hex3, _super);
    function Hex3(passedValue, isLowerCase) {
        if (isLowerCase === void 0) { isLowerCase = false; }
        var _this = _super.call(this, passedValue, "Hex3") || this;
        _this.isLowerCase = isLowerCase;
        Hex3.checkIfHex3(_this.value);
        _this.checkIfLowerCase(_this.value);
        return _this;
    }
    Hex3.checkIfHex3 = function (value) {
        var CHECK_HEX3 = /^[#][0-9a-fA-F]{3}/;
        if (CHECK_HEX3.test(value)) {
            return;
        }
        else {
            throw new Error("Invalid Hex3. " + value);
        }
    };
    Hex3.prototype.toIntermediate = function () {
        // @ts-ignore
        var valueSliced = this.value.slice(1);
        var valueSplit = valueSliced.split("");
        var unconvertedR = "" + (valueSplit[0] + valueSplit[0]);
        var unconvertedG = "" + (valueSplit[1] + valueSplit[1]);
        var unconvertedB = "" + (valueSplit[2] + valueSplit[2]);
        var convertedR = hex_to_int_1.hexToInt(unconvertedR).toString();
        var convertedG = hex_to_int_1.hexToInt(unconvertedG).toString();
        var convertedB = hex_to_int_1.hexToInt(unconvertedB).toString();
        var A = "255";
        return new Intermediate([convertedR, convertedG, convertedB, A], this.isLowerCase);
    };
    Hex3.prototype.checkIfLowerCase = function (value) {
        var CHECK_LOWER = /[a-f]/;
        if (CHECK_LOWER.test(value)) {
            this.isLowerCase = true;
        }
    };
    return Hex3;
}(ColourType));
exports.Hex3 = Hex3;
/**
 * Array type class.
 *  RGB class, accepts string[] values. Eg: ["0", "0", "0"] is black.
 */
var RGB = /** @class */ (function (_super) {
    __extends(RGB, _super);
    function RGB(passedValue) {
        var _this = _super.call(this, passedValue, "RGB") || this;
        RGB.checkIfRGB(_this.value);
        return _this;
    }
    RGB.checkIfRGB = function (value) {
        var CHECK_RGB = /^[0-9]{1,3}/;
        if (CHECK_RGB.test(value[0]) && CHECK_RGB.test(value[1]) && CHECK_RGB.test(value[2])) {
            return;
        }
        else {
            throw new Error("Invalid RGB. " + value);
        }
    };
    RGB.prototype.toIntermediate = function () {
        return new Intermediate([this.value[0], this.value[1], this.value[2], "255"]);
    };
    return RGB;
}(ColourType));
exports.RGB = RGB;
/**
 * Array type class.
 * CMYK class, accepts string[] values. Eg: ["75%", "68%", "76%", "90%"] is black in CMYK. % symbols must be added.
 */
var CMYK = /** @class */ (function (_super) {
    __extends(CMYK, _super);
    function CMYK(passedValue) {
        var _this = _super.call(this, passedValue, "CMYK") || this;
        CMYK.checkIfCMYK(_this.value);
        return _this;
    }
    CMYK.checkIfCMYK = function (value) {
        var CHECK_CMYK = /^[0-9]{1,3}[%]/;
        if (CHECK_CMYK.test(value[0]) && CHECK_CMYK.test(value[1]) && CHECK_CMYK.test(value[2]) && CHECK_CMYK.test(value[3])) {
            return;
        }
        else {
            throw new Error("Invalid CMYK. " + value);
        }
    };
    CMYK.prototype.toIntermediate = function () {
        var C = Number(this.value[0].slice(0, -1)) / 100;
        var M = Number(this.value[1].slice(0, -1)) / 100;
        var Y = Number(this.value[2].slice(0, -1)) / 100;
        var K = Number(this.value[3].slice(0, -1)) / 100;
        var R = 255 * (1 - C) * (1 - K);
        var G = 255 * (1 - M) * (1 - K);
        var B = 255 * (1 - Y) * (1 - K);
        return new Intermediate([Math.round(R).toString(), Math.round(G).toString(), Math.round(B).toString(), "255"]);
    };
    return CMYK;
}(ColourType));
exports.CMYK = CMYK;
/**
 * Array type class.
 * RGBA class, accepts string[] values, it is the extended version of RGB with an alpha channel. Eg: ["0", "0", "0", "1"], which is pitch black.
 */
var RGBA = /** @class */ (function (_super) {
    __extends(RGBA, _super);
    function RGBA(passedValue) {
        var _this = _super.call(this, passedValue, "RGBA") || this;
        RGBA.checkIfRBGA(_this.value);
        return _this;
    }
    RGBA.checkIfRBGA = function (value) {
        var CHECK_RGB = /^[0-9]{1,3}/;
        var CHECK_RGBA = /^([0](\.[0-9]{1,3})?)?([1][^0-9\.])?/;
        if (CHECK_RGB.test(value[0]) && CHECK_RGB.test(value[1]) && CHECK_RGB.test(value[2]) && CHECK_RGBA.test(value[3])) {
            return;
        }
        else if (CHECK_RGB.test(value[0]) && CHECK_RGB.test(value[1]) && CHECK_RGB.test(value[2]) && value[3] === "1") {
            return;
        }
        else {
            throw new Error("Invalid RGBA. " + value);
        }
    };
    RGBA.prototype.toIntermediate = function () {
        return new Intermediate([this.value[0], this.value[1], this.value[2], "" + Math.round(Number(this.value[3]) * 255)]);
    };
    return RGBA;
}(ColourType));
exports.RGBA = RGBA;
/**
 * String type class.
 * Hex8 class, accepts Str and string values, it is the extended version of Hex with an alpha channel.
 */
var Hex8 = /** @class */ (function (_super) {
    __extends(Hex8, _super);
    function Hex8(passedValue, isLowerCase) {
        if (isLowerCase === void 0) { isLowerCase = false; }
        var _this = _super.call(this, passedValue, "Hex8") || this;
        _this.isLowerCase = isLowerCase;
        Hex8.checkIfHex8(_this.value);
        _this.checkIfLowerCase(_this.value);
        return _this;
    }
    Hex8.checkIfHex8 = function (value) {
        var CHECK_HEX3 = /^[#][0-9a-fA-F]{8}/;
        if (CHECK_HEX3.test(value)) {
            return;
        }
        else {
            throw new Error("Invalid Hex8.");
        }
    };
    Hex8.prototype.toIntermediate = function () {
        // @ts-ignore
        var valueSliced = this.value.slice(1);
        var valueSplit = valueSliced.split("");
        var unconvertedR = "" + (valueSplit[0] + valueSplit[1]);
        var unconvertedG = "" + (valueSplit[2] + valueSplit[3]);
        var unconvertedB = "" + (valueSplit[4] + valueSplit[5]);
        var unconvertedA = "" + (valueSplit[6] + valueSplit[7]);
        var convertedR = hex_to_int_1.hexToInt(unconvertedR).toString();
        var convertedG = hex_to_int_1.hexToInt(unconvertedG).toString();
        var convertedB = hex_to_int_1.hexToInt(unconvertedB).toString();
        var convertedA = hex_to_int_1.hexToInt(unconvertedA).toString();
        return new Intermediate([convertedR, convertedG, convertedB, convertedA], this.isLowerCase);
    };
    Hex8.prototype.checkIfLowerCase = function (value) {
        var CHECK_LOWER = /[a-f]/;
        if (CHECK_LOWER.test(value)) {
            this.isLowerCase = true;
        }
    };
    return Hex8;
}(ColourType));
exports.Hex8 = Hex8;
//# sourceMappingURL=main.js.map