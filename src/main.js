"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Murmur_1 = require("../lib/murmur/Murmur");
const ice_1 = require("ice");
async function callIce() {
    let ic = ice_1.Ice.initialize();
    let server = await ice_1.Ice.Promise.try(async function () {
        let base = ic.stringToProxy("Meta:tcp -h 127.0.0.1 -p 6502");
        let meta = await Murmur_1.Murmur.MetaPrx.checkedCast(base);
        let server = (await meta.getAllServers())[0];
        return server;
    }).finally(function () {
    }).catch(function (ex) {
        console.log(ex.toString());
    });
    if (!(server instanceof Murmur_1.Murmur.ServerPrx)) {
        return Promise.resolve();
    }
    server.sendMessageChannel(17, false, "hello").catch((e) => console.log("send message channel dieded", e));
    server.getUsers().then((users) => {
        users.forEach((user) => {
            console.log(user.name);
        });
    });
    ic.destroy();
}
callIce();
