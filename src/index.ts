import { MongoClient } from "mongodb";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import path = require("path");
import { authMiddleware } from "./auth/auth";
import * as dotenv from 'dotenv';

const app = express();
app.use(authMiddleware);
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

dotenv.config();


const PORT = process.env.PORT || 3000;
var autoRoutes = require('express-auto-routes')(app); // you don't need `routes` folder any more
autoRoutes(path.join(__dirname, './controllers')); // auto mounting... done!

let mongoManager;
MongoClient.connect(process.env.mongoUrl).then(client => {
    if(client) {
        mongoManager = client.db(process.env.db);
        console.log("successful connection with the server")
    }
}).catch(error => {
    console.log("Connection not successfull")
});

export const getManager =  () => {
    if(mongoManager) {
        return mongoManager;
    }
}

// This will be stored in the localstorage of the browser
export const UserDetails = {
    "username":"somnathb583",
    "userPassword":"somnath1234!@",
    "email":"somnathb583@gmail.com",
    "userId": 1
}

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})
