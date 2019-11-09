import { Murmur } from "./Murmur";
import { Ice } from "ice";


let ic = Ice.initialize();
let murmur: any;

Ice.Promise.try(
    async function()
    {
        
        let base = ic.stringToProxy("Meta:tcp -h 127.0.0.1 -p 6502");
        await Murmur.MetaPrx.checkedCast(base).then( 
            (metaprx) => (metaprx.getAllServers().then (
                (serverList) => {
                    serverList.forEach((server) =>{
                        server.getUsers().then(
                            (users) => {
                                users.forEach(
                                    (user) => {
                                        console.log(user.name);
                                    }
                                )
                            }
                        )
                    })
                }
            ))
            ).catch((e) => {console.log(e)});
    }
).finally(
    function()
    {
        if (ic) {
            ic.destroy();
        }
        
    }
).catch(
    function(ex)
    {
        //console.log(ex.toString());
        process.exit(1);
    });