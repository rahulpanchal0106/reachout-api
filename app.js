require("dotenv").config();
const express = require("express");
const { rootController } = require("./Controllers/root.cotroller");
const { oAuth2Controller } = require("./Controllers/AuthControllers/oAuth2..controller");
const app = express();

app.use(express.json());

app.get("/", rootController);
app.get("/auth/google", oAuth2Controller);
app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    console.log("auth code: ",code);
    // Exchange the authorization code for tokens
    // Use the Google Auth library or axios to make the request
    // Handle the response and store tokens as needed
    res.send('OAuth callback handled');
});

module.exports = app;
