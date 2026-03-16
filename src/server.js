import { connectDB } from "./db/db.js";
import app from "./app.js";
import { config } from "./config/config.js";

connectDB()
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(config.port || 5000, () => {
            console.log(`Server is running on port ${config.port || 5000}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });