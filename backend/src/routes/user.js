import { verifyToken } from '../middleware/auth';
import { getUserByHisId } from '../controllers/userController';

export default (router) => {
    router.get('/api/user', verifyToken, getUserByHisId);
};