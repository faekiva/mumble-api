import {Request, Router, Response} from 'express';
import { MurmurService } from '../services/murmur-service/MurmurService';
import { IPv4 } from '../lib/IPv4';
import bodyParser = require('body-parser');


export const MurmurRouter = Router()

async function getIps(): Promise<Array<IPv4>> {
    const users = MurmurService.getUsers();
    const output = new Array<IPv4>();
    (await users).forEach((user) => {
        output.push(new IPv4(user.address));
    });
    return output;
}

let isIpAddressOnline = async (req: Request, res: Response) => {
    let ips = getIps()
    let reqIp = new IPv4(req.params.ip);
    if (reqIp.In(await ips)){
        res.send(true)
    }
    else {
        res.send(false)
    }
};

let sendMessageToIpChannel = async (req: Request, res: Response) => {
    let body = (req.body as ipChannelJson)
    await MurmurService.sendMessageToIpChannel(new IPv4(body.ip), body.message)
    res.status(200)
    res.send()
}

MurmurRouter.get('/isConnected/:ip',  isIpAddressOnline)

MurmurRouter.route('/messageIp')
    .post(bodyParser.json(), sendMessageToIpChannel)
//getIps().then((ips) => (console.log(ips))) 

interface ipChannelJson {
    ip: string
    message: string
}