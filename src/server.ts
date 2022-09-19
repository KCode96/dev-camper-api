import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import database from './config/db';
import * as color from 'ansi-colors';
import 'express-async-errors';
dotenv.config();

import initRoutes from './routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to DB
database.connectDB();

// Init routes
initRoutes(app);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(color.cyan(`Listening on port ${PORT}...`)));
