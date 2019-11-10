import { MurmurService } from "./services/murmur-service/MurmurService";

async function callIce(): Promise<void> {
    MurmurService.getUsers().then(
        (users) => {
            users.forEach ((user)=> {
                console.log(user.name)
            })
        }
    )

}

callIce();