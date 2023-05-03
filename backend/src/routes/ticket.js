import { verifyToken } from '../middleware/auth';
import { submitTicket, getUserTickets, getLiveFeed } from '../controllers/ticketController';

export default (router) => {
    router.post('/ticket/submit', verifyToken, submitTicket);
    router.get('/ticket/tickets', verifyToken, getUserTickets);
    router.get('/ticket/feed', getLiveFeed);
};