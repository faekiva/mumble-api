import { Murmur } from "./Murmur";
import { Ice } from "ice";



let murmur: any;

Ice.Promise.try(
    function()
    {
        let ic = Ice.initialize();
        let base = ic.stringToProxy("Meta:tcp -h 127.0.0.1 -p 6502");
        Murmur.MetaPrx.checkedCast(base).then( 
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
            ).catch((e) => {console.log(e)}).finally(() => {ic.destroy();})
    }
).finally(
    function()
    {

        
    }
).catch(
    function(ex)
    {
        //console.log(ex.toString());
        process.exit(1);
    });