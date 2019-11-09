"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Murmur_1 = require("./Murmur");
const ice_1 = require("ice");
let ic = ice_1.Ice.initialize();
let murmur;
ice_1.Ice.Promise.try(async function () {
    let base = ic.stringToProxy("Meta:tcp -h 127.0.0.1 -p 6502");
    await Murmur_1.Murmur.MetaPrx.checkedCast(base).then((metaprx) => (metaprx.getAllServers().then((serverList) => {
        serverList.forEach((server) => {
            server.getUsers().then((users) => {
                users.forEach((user) => {
                    console.log(user.name);
                });
            });
        });
    }))).catch((e) => { console.log(e); });
}).finally(function () {
    if (ic) {
        ic.destroy();
    }
}).catch(function (ex) {
    //console.log(ex.toString());
    process.exit(1);
});
