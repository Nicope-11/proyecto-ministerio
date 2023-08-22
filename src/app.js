import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import placeRoutes from './routes/place.routes.js';
import printerRoutes from './routes/printer.routes.js';
import stateRoutes from './routes/state.routes.js';
import makerRoutes from './routes/maker.routes.js';
import modelRoutes from './routes/model.routes.js';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { corsOptions } from './config/corsOptions.js';

dotenv.config({ path: './src/.env' });

const app = express();

app.use(logger);

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', placeRoutes);
app.use('/api', stateRoutes);
app.use('/api', modelRoutes);
app.use('/api', makerRoutes);
app.use('/api', printerRoutes);

app.use(errorHandler);

export default app;
