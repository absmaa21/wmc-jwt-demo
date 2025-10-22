import { decodeAccessToken } from './jwt.service'
import {TJwtUserPayload} from "../models/auth.types";
import {Request, Response, NextFunction, RequestHandler} from 'express'
import {TRoleValue} from "../models/auth.types";

//TODO: NEW : declare module statt declare gloval
/** declare module
    * Request vom Express-Modul um ein Feld erweitern
    * wirkt nur im module (sonst declare global)
    * wird automatisch wirksam, sobald import 'express' und import "auth.service.ts" in deinem Projekt vorkommt.
 **/
declare module 'express-serve-static-core' {
  interface Request {
    user?: TJwtUserPayload;
  }
}

/***
 Middleware-Helperfunktionen
 .1 für JWT AUTH
 */
// TODO LEARN
export const requireAccessToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.cookies.access_token
  if (!token) {
    res.status(400).json({message: "No Access Token!"})
    return
  }

  req.user = decodeAccessToken(token)
  next()
}

/***
 Middleware-Helperfunktionen
 .2 für Rollen
 */
// TODO LEARN
export function requireRole (...roles: TRoleValue[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user) {
      res.status(400).json({message: 'User not in req!'})
      return
    }

    const userRoles = user.roles ?? []
    if (!roles.some(r => userRoles.includes(r))) {
      res.status(401).json({message: 'User is not authorized with roles'})
      return
    }

    next()
  }
}


/**
 * Hilfsfunktionen COOKIES ***********************************
 * @param res
 * @param accessToken
 * @param refreshToken
 */
export function setAuthCookies (res: Response, { accessToken, refreshToken }: { accessToken: string, refreshToken: string }): void {
  const isProd = process.env.NODE_ENV === 'production'
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    maxAge: 1000 * 60 * 15
  })
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    maxAge: 1000 * 60 * 60 * 24 * 7
  })
}

export function clearAuthCookies (res: Response): void {
  res.clearCookie('access_token')
  res.clearCookie('refresh_token')
}