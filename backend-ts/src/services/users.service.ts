import bcrypt from 'bcrypt'
import {Roles, TLoginUser, TRoleValue} from "../models/auth.types"
import { config } from "../config"
import {ISafeUser, IUser} from "../models/auth.interfaces";
import { registeredUserStore } from "./registeredUser.store";
import {mockuserRegistered} from "../mockdata/mockuser.registered";


/**
 * Utility Funktionen bzgl registered User
 */

// TODO LEARN
export async function registerUser({username, password}: TLoginUser): Promise<ISafeUser | null> {
  const exists = registeredUserStore.findByUsername(username)
  if (exists) return null

  const passwordHash = await bcrypt.hash(password, config.bcrypt.saltRounds)
  const user: IUser = {
    id: Date.now(),
    username,
    roles: [Roles.USER],
    passwordHash,
  }

  registeredUserStore.add(user)
  return sanitize(user)
}

// TODO LEARN
export async function verifyUser({username, password}: TLoginUser): Promise<ISafeUser | null> {
    const user = registeredUserStore.findByUsername(username)
    if (!user) return null

    const passwordValid = await bcrypt.compare(password, user.passwordHash)
    if (!passwordValid) return null

    return sanitize(user)
}

/**
 * Hilfsfunktionen Funktionen bzgl registered User
 */
// TODO LEARN
export function getUserById(id: number): ISafeUser | null {
  const user = registeredUserStore.findById(id)
  if (user) return sanitize(user)
  return null
}

/**
 * sanitize(TUser)
 * entfernt sensible Daten wie das Passwort-Hash
 */
function sanitize(u: IUser): ISafeUser {
  const { passwordHash, ...safe } = u;
  console.log("sanitize=user,userSafe", u, safe);
  return safe;
}

export  function   initMockUsers(): void {
    if (registeredUserStore.users.length === 0) {
        for (const user of mockuserRegistered) {
             registeredUserStore.add(user);
        }
        console.log("✅ Mock-User initialisiert:", registeredUserStore.users)
    }
}


