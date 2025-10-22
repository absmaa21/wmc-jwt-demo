import {TJwtUserPayload} from "../models/auth.types";
import jwt from 'jsonwebtoken'
import {config} from "../config";

/**
 * Utility Funktionen bzgl JWT
 */

// TODO LEARN
export const decodeAccessToken = (token:string):TJwtUserPayload => {
    return jwt.decode(token) as TJwtUserPayload;
}

// TODO LEARN
export const decodeRefreshToken = (token:string):TJwtUserPayload  => {
    return jwt.decode(token) as TJwtUserPayload;
}

// TODO LEARN
export const signAccessToken = (payload:TJwtUserPayload):string => {
    return jwt.sign(payload, config.jwt.accessSecret, {expiresIn: config.jwt.accessExpiresIn});
}

// TODO LEARN
export const signRefreshToken = (payload:TJwtUserPayload):string => {
    return jwt.sign(payload, config.jwt.refreshSecret, {expiresIn: config.jwt.refreshExpiresInDays * 24 * 60 * 60});
}

