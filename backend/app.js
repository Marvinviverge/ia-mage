import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config({ encoding: "latin1" });

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const corsOptions = {
    origin: '*',
    allowedHeaders: [
        "Origin", 
        "X-Requested-With", 
        "x-access-token", 
        "role", 
        "Content", 
        "Accept", 
        "Content-Type", 
        "Authorization"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "Vous avez effectué plus de 100 requêtes dans une limite de 15 minutes!",
        headers: true,
    })
);

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/user', userRoutes);

app.get('/', async (req, res) => {
    res.send('Hello from Dall-E !');
});

export default app;
