"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyByValue = void 0;
function getKeyByValue(enumObj, value) {
    const keys = Object.keys(enumObj);
    return keys.find((key) => enumObj[key] === value);
}
exports.getKeyByValue = getKeyByValue;
