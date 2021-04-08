import { Murmur } from "../../lib/murmur/Murmur";
import { Ice } from "ice";
import { MurmurException } from "./MurmurException";
import { IPv4 } from "../../lib/IPv4";


export abstract class MurmurService {
    private static _ic: Ice.Communicator = Ice.initialize();
    private static _server: Promise<Murmur.ServerPrx> = MurmurService.initializeService();

    private static async initializeService(): Promise<Murmur.ServerPrx>{
        try {
            MurmurService._ic.getProperties().setProperty("Ice.Default.EncodingVersion", "1.0");
            
            let base = MurmurService._ic.stringToProxy("Meta -e 1.0:tcp -h 127.0.0.1 -p 6502");
            let meta = await Murmur.MetaPrx.checkedCast(base);
            return (await meta.getAllServers())[0];
        } catch (err) {
            console.error(err)
            process.exit(1)
            //return Promise.reject(new MurmurException(err));
        }
    }

    public static async getUsers(): Promise<Murmur.User[]> {
        try {
            return Array.from((await (await MurmurService._server).getUsers()).values());
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

    public static async sendMessageToIpChannel(ip:IPv4, message: string): Promise<void> {
        try {
            let users = await (await MurmurService._server).getUsers()
            users.forEach((user) => {
                if(ip.Equals(new IPv4(user.address))) {
                    MurmurService.sendMessageToChannel(user.channel, message)
                }
            });
        } catch (err) {
            return Promise.reject(new MurmurException(err));
        }
    }

}