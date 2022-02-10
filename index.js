import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express();
app.use(cors());
app.options("*",cors());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log("Server is running on PORT: " + PORT))