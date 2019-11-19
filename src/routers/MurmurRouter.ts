import express = require('express');
import { MurmurService } from '../services/murmur-service/MurmurService';

export let MurmurRouter = express.Router()


async function getIps(): Promise<Array<string>> {
    let users = await MurmurService.getUsers();
    let output = new Array<string>();
    users.forEach((user) => {
        let ipString = ""
        for (let numDex = (user.address.length - 4); numDex < user.address.length; numDex++) {
            ipString += String(user.address[numDex])
            if(numDex < user.address.length - 1) {
                ipString += "."
            }
        }
        output.push(ipString);
    });
    return output;
}

let isIpAddressOnline = async (req: express.Request, res: express.Response) => {
    if ((await getIps()).indexOf(req.params.ip) >= 0 ){
        res.send(true)
    }
    else {
        res.send(false)
    }
};

MurmurRouter.get('/:ip',  isIpAddressOnline)

//getIps().then((ips) => (console.log(ips)))