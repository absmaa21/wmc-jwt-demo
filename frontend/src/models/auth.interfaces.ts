//  Interface mit Vererbung - Beispiel
// .1 ISafeUser: API-Response
// .2 IUser: Interne Speicherung in DB/Repo
//
// * IUser (mit passwordHash) → besser als interface (klarer Vertrag für ein Eingabeobjekt).
// * ISafeUser (ohne passwordHash) → Interface Vererbung besser als interface (klarer Vertrag für ein Eingabeobjekt).

import {TRoleValue} from "./auth.types";

export interface ISafeUser {
    id: number
    username: string
    roles: TRoleValue[]
}
export interface IUser extends ISafeUser {
    passwordHash: string
}