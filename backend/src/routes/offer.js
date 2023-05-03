import { getOfferFromSource, getOfferRefresh } from '../controllers/scrapeController';

export default (router) => {
    router.get('/offer/source', getOfferFromSource);
    router.get('/offer/refresh', getOfferRefresh);
};