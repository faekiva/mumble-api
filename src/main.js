"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MurmurService_1 = require("./services/murmur-service/MurmurService");
async function callIce() {
    MurmurService_1.MurmurService.getUsers().then((users) => {
        users.forEach((user) => {
            console.log(user.name);
        });
    });
}
callIce();
