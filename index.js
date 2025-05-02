const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes Middleware
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comment");

// [SECTION] Environment Setup
require('dotenv').config();

const app = express();

// Enable CORS for specific origin
// app.use(cors({
//     origin: [
//         'http://localhost:3000', // For local development
//         'https://blog-post-steel-gamma.vercel.app/', // For production
//     ],
// }));

// OR CAN USE THIS: but add the key and value in render environment variables
    // Key: ALLOWED_ORIGINS
    // Value: http://localhost:3000,https://blog-post-steel-gamma.vercel.app/
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

app.use(cors({
    origin: allowedOrigins,
}));

// Connecting to MongoDB Atlas
mongoose.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// If the connection is successful, output in the console
mongoose.connection.once("open", () => console.log("We're connected to the cloud database"));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// [SECTION] Backend Routes
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/comments", commentRoutes);

// Start the server
if (require.main === module) {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${process.env.PORT || 4000}`);
    });
}

module.exports = { app, mongoose };