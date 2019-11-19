import { MurmurService } from "./services/murmur-service/MurmurService";
import { MurmurException } from "./services/murmur-service/MurmurException";
import express = require('express');
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