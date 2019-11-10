import { Murmur } from "./Murmur";
import { Ice } from "ice";
import { isNull } from "util";
import { AssertionError } from "assert";


function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

async function callIce(): Promise<void> {
    let ic = Ice.initialize();

    let server = await Ice.Promise.try(
        async function()
        {
            let base = ic.stringToProxy("Meta:tcp -h 127.0.0.1 -p 6502");
            let meta = await Murmur.MetaPrx.checkedCast(base);
            let server = (await meta.getAllServers())[0];
            return server;
        }
    ).finally(
        function()
        {
            
        }
    ).catch(
        function(ex)
        {
            console.log(ex.toString());
        });
    
    if (!(server instanceof Murmur.ServerPrx)) {
        return Promise.resolve();
    }

    server.sendMessageChannel(17, false, "hi Justin").catch((e) => console.log("send message channel dieded", e));
    server.getUsers().then(
        (users) => {
            users.forEach(
                (user) => {
                    console.log(user.name)
                }
            )
        }
    )
    

    ic.destroy();

}

callIce();