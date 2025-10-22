import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
console.log(">>> SERVER starting, importing config...")
import { config } from './config'
console.log(">>> CONFIG loaded:", config)
import { authRouter } from './auth/auth.routes'
import {initMockUsers} from "./services/users.service";

//API
const app = express();

//Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

//Routes
app.get('/', (_: Request, res: Response) => res.json({ ok: true }));

app.use('/api/auth', authRouter);

//Errorhandler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.error(err)
  res.status(500).json({ message: 'Serverfehler' })
});

// Erst Mock-User initialisieren, dann Server starten
      try {
        initMockUsers();
      } catch (err) {
        console.error("Init MockUser: keine  MockUser initialisert:", err);
      }

//Server starten
app.listen(config.port, () => {
  console.log(`✅ Server läuft auf http://localhost:${config.port}`);
});


