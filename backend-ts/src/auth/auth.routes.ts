import { Router, Request, Response} from 'express'
import { login, register, refresh, logout } from './auth.controller'
import {requireRole, requireAccessToken} from '../services/auth.service'
import {Roles} from "../models/auth.types";

export const authRouter = Router();

/**
 * AUTH Route - URL Pfade und RouteBusiness CALLS der HTTP-Routen
 *
 */

// TODO LEARN
//Auth
authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.post('/refresh', refresh)
authRouter.post('/logout', logout)

// TODO LEARN
/**JWT Protected Routes
 */
