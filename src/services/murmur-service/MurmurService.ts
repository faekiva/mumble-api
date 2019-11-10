import { Murmur } from "../../../lib/murmur/Murmur";
import { Ice } from "ice";




export abstract class MurmurService {
    private static _ic: Ice.Communicator = Ice.initialize();
    private static _server: Murmur.ServerPrx;
    private static isInitialized = false;

    private static async initializeService(){
        if (!MurmurService.isInitialized) {
            await Ice.Promise.try(
                async () =>
                {
                    let base = MurmurService.ic.stringToProxy("Meta:tcp -h 127.0.0.1 -p 6502");
                    let meta = await Murmur.MetaPrx.checkedCast(base);
                    let server = (await meta.getAllServers())[0];
                    MurmurService.server = server;
                }
            ).catch(
                function(ex)
                {
                    console.log(ex.toString());
                    process.exit(1);
                });
            MurmurService.isInitialized = true;
        }
            
    }

    static get ic() {
        return MurmurService._ic;
    }

    static set server(server: Murmur.ServerPrx) {
        MurmurService._server = server;
    }

    public static async getUsers(): Promise<Murmur.UserMap> {
        await MurmurService.initializeService();
        return this._server.getUsers();
    }
    
}