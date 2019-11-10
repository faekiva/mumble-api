import { Murmur } from "../../lib/murmur/Murmur";
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
                    let base = MurmurService._ic.stringToProxy("Meta:tcp -h 127.0.0.1 -p 6502");
                    let meta = await Murmur.MetaPrx.checkedCast(base);
                    let server = (await meta.getAllServers())[0];
                    MurmurService._server = server;
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

    public static async getUsers(): Promise<Murmur.UserMap> {
        await MurmurService.initializeService();
        return MurmurService._server.getUsers();
    }
    
    public static async sendMessageToChannel(channelId: number, text: string, includeSubChannels = false): Promise<void> {
        await MurmurService.initializeService();
        MurmurService._server.sendMessageChannel(channelId, includeSubChannels, text);
    }
}