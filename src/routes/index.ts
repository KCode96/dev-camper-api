import { Express } from 'express';
import { version } from '../utilities/constants';
import authRoute from './auth.route';

const initRoutes = (app: Express): void => {
    app.use(`/api/${version}/auth`, authRoute);
};

export default initRoutes;
