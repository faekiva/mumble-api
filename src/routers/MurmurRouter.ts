import express = require('express');
import { MurmurService } from '../services/murmur-service/MurmurService';
import { ipv4 } from '../lib/ipv4';

export const MurmurRouter = express.Router()

async function getIps(): Promise<Array<ipv4>> {
    const users = await MurmurService.getUsers();
    const output = new Array<ipv4>();
    users.forEach((user) => {
        output.push(new ipv4(user.address));
    });
    return output;
}

let isIpAddressOnline = async (req: express.Request, res: express.Response) => {
    let ips = await getIps()
    let reqIp = new ipv4(req.params.ip);
    if (reqIp.In(ips)){
        res.send(true)
    }
    else {
        res.send(false)
    }
};

MurmurRouter.get('/isConnected/:ip',  isIpAddressOnline)
//getIps().then((ips) => (console.log(ips))) 