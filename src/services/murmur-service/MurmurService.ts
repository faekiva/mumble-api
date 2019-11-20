import { Murmur } from "../../lib/murmur/Murmur";
import { Ice } from "ice";
import { MurmurException } from "./MurmurException";


export abstract class MurmurService {
    private static _ic: Ice.Communicator = Ice.initialize();
    private static _server: Promise<Murmur.ServerPrx> = MurmurService.initializeService();

    private static async initializeService(): Promise<Murmur.ServerPrx>{
        try {
            let base = MurmurService._ic.stringToProxy("Meta:tcp -h 127.0.0.1 -p 6502");
            let meta = await Murmur.MetaPrx.checkedCast(base);
            return (await meta.getAllServers())[0];
        } catch (err) {
            return Promise.reject(new MurmurException(err));
        }
    }

    public static async getUsers(): Promise<Murmur.UserMap> {
        try {
            return (await MurmurService._server).getUsers();
        } catch(err) {
            return Promise.reject(new MurmurException(err));
        }
    }
    
    public static async sendMessageToChannel(channelId: number, message: string, includeSubChannels = false): Promise<void> {
        try {
            (await MurmurService._server).sendMessageChannel(channelId, includeSubChannels, message);
        } catch (err) {
            return Promise.reject(new MurmurException(err));
        }
    }

//     public static async sendMessageToIpChannel(ip:string): Promise<void> {
//         try
//     }

}