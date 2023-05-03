import { getComparison } from "../controllers/compareContoller.js";

export default (router) => {
    router.get('/api/compare', getComparison);
};