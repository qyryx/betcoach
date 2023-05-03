import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes';
import { validateTickets } from './controllers/validateController';
import { getOfferFromSource, getResultsFromSource } from './controllers/scrapeController';

const app = express();

// Middleware
app.use(bodyParser.json());

// CORS configuration
app.use(
    cors({
        origin: "https://betcoach.netlify.app",
        credentials: true,
    })
);

const allowedOrigins = ['https://betcoach.netlify.app'];
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/', router());

// Error handling middleware
app.use((err, req, res) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/betting_app";
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL).then(() => console.log(`Connected to DB on URL ${MONGO_URL}`));
mongoose.connection.on('error', (error) => console.log(error));

(async function () {
    await getOfferFromSource();
    await getResultsFromSource();
    await validateTickets();

    // Start calling the functions every minute
    setInterval(async () => {
        await getOfferFromSource();
        await getResultsFromSource();
        await validateTickets();
    }, 60000);
})();

export default app;