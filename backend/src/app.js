import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

const app = express();

// Configure CORS to allow requests from the frontend origin
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Default to frontend URL if not set
    credentials: true
}));

app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Import routes
import userRouter from './routes/user.routes.js';
import aiRoutes from './routes/ai.routes.js';
import blogRoutes from './routes/blog.routes.js';
import commentRoutes from './routes/comment.routes.js';
import likeRoutes from './routes/like.routes.js';
import webinarRoutes from './routes/webinar.routes.js';
import contactUsRoutes from './routes/contactus.routes.js';

// Set up route handlers
app.use('/api/v4/users', userRouter);
app.use('/api/v4/ai', aiRoutes);
app.use('/api/v4/blogs', blogRoutes);
app.use('/api/v4/comments', commentRoutes);
app.use('/api/v4/likes', likeRoutes);
app.use('/api/v4/webinar', webinarRoutes);
app.use('/api/v4/contactUs', contactUsRoutes);

export default app;
