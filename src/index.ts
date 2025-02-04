import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import gadgetRoutes from './routes/gadgetRoutes';
import authRoutes from './routes/authRoutes';

// Load environment variables from .env file
dotenv.config();

const app: Application = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// Route setup
app.use('/api/v1/gadgets', gadgetRoutes);
app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
