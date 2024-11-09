import connectDB from './db/index.js';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({
    path: './.env'
});

// Connect to the database, then start the server
connectDB()
    .then(() => {
        app.on('error', (err) => {
            console.error('Error occurred: Database connection failed', err);
        });
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Listening on port: ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => {
        console.error('Connection to database failed', err);
    });
