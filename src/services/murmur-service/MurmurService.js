"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Murmur_1 = require("../../../lib/murmur/Murmur");
const ice_1 = require("ice");
class MurmurService {
    static async initializeService() {
        if (!MurmurService.isInitialized) {
            await ice_1.Ice.Promise.try(async () => {
                let base = MurmurService.ic.stringToProxy("Meta:tcp -h 127.0.0.1 -p 6502");
                let meta = await Murmur_1.Murmur.MetaPrx.checkedCast(base);
                let server = (await meta.getAllServers())[0];
                MurmurService.server = server;
            }).catch(function (ex) {
                console.log(ex.toString());
                process.exit(1);
            });
            MurmurService.isInitialized = true;
        }
    }
    static get ic() {
        return MurmurService._ic;
    }
    static set server(server) {
        MurmurService._server = server;
    }
    static async getUsers() {
        await MurmurService.initializeService();
        return this._server.getUsers();
    }
}
exports.MurmurService = MurmurService;
MurmurService._ic = ice_1.Ice.initialize();
MurmurService.isInitialized = false;
