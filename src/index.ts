import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import 'dotenv/config'
import cors from "cors";
import router from "./Route";
import bodyParser from 'body-parser';

createConnection().then(async connection => {

    const app = express();
    const PORT = process.env.PORT || 4000;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors())

    router(app)
    app.listen(PORT, () =>{
        console.log("Server is running at PORT: " + PORT )
    })


    //console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    //console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
