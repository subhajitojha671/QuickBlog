// Import Express framework to create server
import express from 'express';

// Load environment variables from .env file
import 'dotenv/config';

// Import CORS to allow cross-origin requests (frontend ↔ backend)
import cors from 'cors';

// ❌ Not needed (you are not using these)
// import { connect, get } from 'mongoose';

// Import your MongoDB connection function
import connectDB from './configs/db.js';

// Create Express app
const app = express();


// Connect to MongoDB database
// This will run before server starts
await connectDB();


// -------------------- MIDDLEWARE --------------------

// Enable CORS (important for frontend connection)
app.use(cors());

// Parse incoming JSON data (req.body)
app.use(express.json());


// -------------------- ROUTES --------------------

// Test route
// When you open http://localhost:PORT/
// it will show "API is working"
app.get('/', (req, res) => {
    res.send('API is working');
});


// -------------------- SERVER --------------------

// Set PORT from .env or default 3000
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// Export app (useful for testing or modular structure)
export default app;