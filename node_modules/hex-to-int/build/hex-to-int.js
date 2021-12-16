"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexToInt = void 0;
function hexToInt(rawValue) {
    var rawValueArray = rawValue.split("");
    for (var i in rawValueArray) {
        var num = rawValueArray[i];
        if (num === "a" || num === "A") {
            rawValueArray[i] = 10;
        }
        else if (num === "b" || num === "B") {
            rawValueArray[i] = 11;
        }
        else if (num === "c" || num === "C") {
            rawValueArray[i] = 12;
        }
        else if (num === "d" || num === "D") {
            rawValueArray[i] = 13;
        }
        else if (num === "e" || num === "E") {
            rawValueArray[i] = 14;
        }
        else if (num === "f" || num === "F") {
            rawValueArray[i] = 15;
        }
        ;
    }
    ;
    var x = 0;
    var sum = 0;
    for (var i in rawValueArray) {
        x += 1;
        sum += rawValueArray[i] * (Math.pow(16, (rawValueArray.length - x)));
    }
    ;
    return sum;
}
exports.hexToInt = hexToInt;
//# sourceMappingURL=hex-to-int.js.map