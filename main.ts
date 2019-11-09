import { Murmur } from "./Murmur";
import { Ice } from "ice";


let ic = Ice.initialize();

Ice.Promise.try(
    function()
    {
        let base = ic.stringToProxy("Meta:tcp -h 127.0.0.1 -p 6502");
        Murmur.MetaPrx.checkedCast(base);
    }
).finally(
    function()
    {
        if(ic)
        {
            return ic.destroy();
        }
    }
).catch(
    function(ex)
    {
        console.log(ex.toString());
        process.exit(1);
    });