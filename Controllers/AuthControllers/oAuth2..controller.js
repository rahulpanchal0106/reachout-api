const {google} = require('googleapis');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = "http://localhost:8080/auth/google/callback";
const UserModel = require("../../Models/user.model")

const oAuth2Controller = async (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        GOOGLE_REDIRECT_URI
    );

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/gmail.send',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
    });

    console.log('Authorize this app by visiting this url:', authUrl);
    return res.status(200).json({authUrl:authUrl});
};

module.exports = {
    oAuth2Controller
};
