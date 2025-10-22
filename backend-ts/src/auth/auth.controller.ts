import { Request, Response } from 'express'
import {registerUser, getUserById, verifyUser} from "../services/users.service";
import {ISafeUser} from "../models/auth.interfaces";
import {signAccessToken, signRefreshToken, decodeRefreshToken} from "../services/jwt.service";
import {TJwtUserPayload, TLoginUser} from "../models/auth.types";
import {clearAuthCookies, setAuthCookies} from "../services/auth.service";
import {registeredUserStore} from "../services/registeredUser.store";

/**
 * AUTH Route CONTROLLER - Business Implementierungen  der HTTP-Routen
 */

const refreshStore = new Map<string, { userId: number }>()


// TODO LEARN
export async function register (req: Request, res: Response): Promise<void> {
  const {username, password} = req.body ?? {}
  if (!username || !password) {
    res.status(400).json({message: "Username und password im body benötigt!"})
    return
  }

  const user = await registerUser({username, password})
  if (!user) {
    res.status(400).json({message: 'Username already taken'})
    return
  }

  res.status(201).json({user})
}


// TODO LEARN
export async function login (req: Request, res: Response): Promise<void> {
  const {username, password} = req.body ?? {}
  if (!username || !password) {
    res.status(400).json({message: "Username und password im body benötigt!"})
    return
  }

  const user = await verifyUser({username, password})
  if (!user) {
    res.status(400).json({message: 'Credentials wrong!'})
    return
  }

  const accessToken = signAccessToken({sub: String(user.id), username, roles: user.roles})
  const refreshToken = signRefreshToken({sub: String(user.id)})
  refreshStore.set(refreshToken, {userId: user.id})
  setAuthCookies(res, {accessToken, refreshToken})
  res.status(200).json({user})
}


// TODO LEARN
export async function refresh (req: Request, res: Response): Promise<void> {
  const refreshToken = req.cookies.refresh_token
  if (!refreshToken) {
    res.status(400).json({message: "Refresh Token is missing!"})
    return
  }

  const userId = refreshStore.get(refreshToken)
  if (!userId) {
    res.status(400).json({message: "Refresh Token is invalid!"})
    return
  }

  const user = getUserById(userId.userId)
  if (!user) {
    res.status(400).json({message: "No user found with this id!"})
    return
  }

  const accessToken = signAccessToken({sub: String(user.id), username: user.username, roles: user.roles, iat: Date.now()})
  setAuthCookies(res, {accessToken, refreshToken})
  res.status(200).json({user})
}


// TODO LEARN
export async function logout (req: Request, res: Response): Promise<void> {
  const refreshToken: string | undefined = req.cookies.refresh_token
  if (refreshToken) refreshStore.delete(refreshToken)
  clearAuthCookies(res)
  res.status(200).json({message: "Logout successful"})
}


