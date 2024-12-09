import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import characterRoutes from './routes/character.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/characters", characterRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('server started at http://localhost:' + PORT);
});