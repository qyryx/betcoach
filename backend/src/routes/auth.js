import { login, register } from '../controllers/authController';

export default (router) => {
    router.post('/auth/login', login);
    router.post('/auth/register', register);
};