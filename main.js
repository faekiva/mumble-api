"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Murmur_1 = require("./Murmur");
const ice_1 = require("ice");
let ic = ice_1.Ice.initialize();
ice_1.Ice.Promise.try(function () {
    let base = ic.stringToProxy("Meta:tcp -h 127.0.0.1 -p 6502");
    Murmur_1.Murmur.MetaPrx.checkedCast(base);
}).finally(function () {
    if (ic) {
        return ic.destroy();
    }
}).catch(function (ex) {
    console.log(ex.toString());
    process.exit(1);
});
