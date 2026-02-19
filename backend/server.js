import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
dotenv.config();

const app = express();

app.use(express.json()); //it's a middleware that helps us to parse the JSON data from the request body
app.use(helmet()); //it's a security middleware that heelps us to protect our app by setting various HTTP headers
app.use(morgan("dev")); //log the requests
app.use(cors()); //it's a middleware that helps us to allow the requests from the different origins

const PORT = process.env.PORT || 3000;

app.use("/api/products", productRoutes);

async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        console.log('Table created successfully');
    } catch (error) {
        console.log(`Error creating table: ${error}`);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});