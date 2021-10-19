import { MurmurService } from "./services/murmur-service/MurmurService";
import express from 'express';
import { MurmurRouter } from "./routers/MurmurRouter";


async function callIce(): Promise<void> {
    try {
        let users = await MurmurService.getUsers();
        users.forEach((user) => console.log(user.name));
    } catch(e) {
        console.log(e);
    }
}

// callIce();

const app = express();
app.use('/murmur', MurmurRouter)
console.log("running!")
app.listen(process.env.PORT || 4815)