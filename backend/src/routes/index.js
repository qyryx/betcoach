import express from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import ticketRoutes from './ticket';
import offerRoutes from './offer';
import resultRoutes from './result';
import compareRoutes from './compare';

const router = express.Router();

export default () => {
    authRoutes(router);
    userRoutes(router);
    ticketRoutes(router);
    offerRoutes(router);
    resultRoutes(router);
    compareRoutes(router);
    return router;
};