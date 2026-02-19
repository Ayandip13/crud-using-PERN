import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json()); //it's a middleware that helps us to parse the JSON data from the request body
app.use(helmet()); //it's a security middleware that heelps us to protect our app by setting various HTTP headers
app.use(morgan("dev")); //log the requests
app.use(cors()); //it's a middleware that helps us to allow the requests from the different origins

const PORT = process.env.PORT || 3000;

app.get("/api/products", (req, res) => {
    //get all the products from the database
    res.status(200).json({
        success: true,
        data: [
            {
                id: 1,
                name: "Product 1",
            },
            {
                id: 2,
                name: "Product 2",
            },
            {
                id: 3,
                name: "Product 3",
            }
        ]
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});