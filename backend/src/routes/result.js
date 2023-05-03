import { getResultsRefresh, getResultsFromSource } from '../controllers/scrapeController';

export default (router) => {
    router.get('/results/source', getResultsFromSource);
    router.get('/results/refresh', getResultsRefresh);
};