// Import Express framework
import express from 'express';

// Load environment variables
import 'dotenv/config';

// Import CORS
import cors from 'cors';

// Import database connection
import connectDB from './configs/db.js';

// Import routes
import adminRoute from './routes/adminRoute.js';
import blogRoute from './routes/blogRoute.js';

// Create Express app
const app = express();


// -------------------- DATABASE CONNECTION --------------------

try {
    await connectDB();
    console.log("MongoDB Connected");
} catch (error) {
    console.log("Database Connection Error:", error.message);
}


// -------------------- MIDDLEWARE --------------------

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());


// -------------------- ROUTES --------------------

// Home route
app.get('/', (req, res) => {
    res.send('API is working');
});

// Prevent favicon crash on Vercel
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

// API Routes
app.use('/api/admin', adminRoute);
app.use('/api/blog', blogRoute);


// -------------------- ERROR HANDLER --------------------

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});


// -------------------- EXPORT APP --------------------

// IMPORTANT:
// Do NOT use app.listen() on Vercel

export default app;