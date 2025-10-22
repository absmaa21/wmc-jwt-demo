import {IUser} from "../models/auth.interfaces";


/***Variante 1 — JSON-Objekt:
 entspricht Singleton mit globalen Zugriff
 Mock: Users werden in einem JSON -Array gespeichert
 **/

export const registeredUserStore = {
    users: [] as IUser[],
    add(user: IUser) {
        this.users.push(user);
        console.log("registeredUserStore:add:user=", user);
    },
    findByUsername(username: string):IUser | undefined {
        console.log("1findByUsername:username=", username);
        const user:IUser | undefined = this.users.find( (u:IUser) =>
            {
                console.log("2if:u.username=", u.username);
                const found = u.username === username;
                return found;
            }
        );
        console.log("3findByUsername:user=", user);
        return user;
    },
    findById(userid: number) {
        return this.users.find(u => u.id === userid);
    },

};
