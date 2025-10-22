
//TODO: Projektbezogen Anpassen
export const Roles = {
    ADMIN: "Admin",
    USER: "User"
} as const;
//Key: "ADMIN" | "USER"
export type TRoleKey = keyof typeof Roles;
//Value: "Admin" | "User"
export type TRoleValue = typeof Roles[TRoleKey];

export type TLoginUser = {
    username: string
    password: string
}

export type TJwtUserPayload = {
    sub: string;
    username?: string;
    roles?: TRoleValue[];
    iat?: number;
    exp?: number;
}

/** type als Alternative statt Interface + Vererbung

export type TUser = {
    id: number;
    username: string;
    passwordHash: string;
    roles: TRoleValue[];
}
 export type TSafeUser = Omit<TUser, 'passwordHash'>;

 *******
 * OMIT:
 * eingebauten Utility Type Omit<T, K> von TypeScript.
 Ergebnis: ein neuer Typ, der alle Properties von T enthält,
 außer den ausgeschlossenen.

 * Was macht Omit<T, K>?
 * T = ein Typ (meist ein Objekt mit Properties
 * K = ein oder mehrere Keys, die ausgeschlossen werden sollen
 *
 *******
 *
 **** Eigener Type möglich statt OMIT, aber kein Best Practise
 * export type TSafeUser = {
      id: number;
      username: string;
      roles: TRoleValue[];
  }
 ********
 */


