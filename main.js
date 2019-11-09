"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Murmur_1 = require("./Murmur");
const ice_1 = require("ice");
let murmur;
ice_1.Ice.Promise.try(function () {
    let ic = ice_1.Ice.initialize();
    let base = ic.stringToProxy("Meta:tcp -h 127.0.0.1 -p 6502");
    Murmur_1.Murmur.MetaPrx.checkedCast(base).then((metaprx) => (metaprx.getAllServers().then((serverList) => {
        serverList.forEach((server) => {
            server.getUsers().then((users) => {
                users.forEach((user) => {
                    console.log(user.name);
                });
            });
        });
    }))).catch((e) => { console.log(e); }).finally(() => { ic.destroy(); });
}).finally(function () {
}).catch(function (ex) {
    //console.log(ex.toString());
    process.exit(1);
});
