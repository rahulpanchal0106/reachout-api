require("dotenv").config();
const express = require("express");
const { rootController } = require("./Controllers/root.cotroller");
const { oAuth2Controller } = require("./Controllers/AuthControllers/oAuth2..controller");
const oAuthCallback = require("./Controllers/AuthControllers/oAuthCallback.controller");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors())

app.get("/", rootController);
app.get("/auth/google", oAuth2Controller);
app.get('/auth/google/callback', oAuthCallback);

module.exports = app;
