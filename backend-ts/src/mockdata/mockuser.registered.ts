import {Roles} from "../models/auth.types";
import {IUser} from "../models/auth.interfaces";


//TODO: Projektbezogen Anpassen

//Spezielle Notwendige User z.B. Admin
export const mockuserRegistered_OWNER: IUser[] = [
    ];

//Mock User für einfachere Tests
export const mockuserRegistered_USER: IUser[] = [
]

//Zusammenführen als ein Array aller registrierten User
export const mockuserRegistered: IUser[] = [
        ...mockuserRegistered_OWNER,
        ...mockuserRegistered_USER
];

