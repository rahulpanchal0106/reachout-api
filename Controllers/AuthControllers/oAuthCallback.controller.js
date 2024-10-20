const UserModel = require('../../Models/user.model')
const currentUrl = require('../../Utils/currentURL')
const {google} = require('googleapis');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const oAuthCallback = async (req,res)=>{
    var fullUrl = currentUrl(req)
    const GOOGLE_REDIRECT_URI = `${fullUrl}/auth/google/callback`;

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        GOOGLE_REDIRECT_URI
    );

    try {
        const {code} = req.query;
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });

        const response = await oauth2.userinfo.get();
        console.log("👁️ ",response.data)
        const { name, email } = response.data;
        const googleId = response.data.id;

        let user = await UserModel.findOne({ username: name });
        if (!user) {
            user = new UserModel({
                username: name,
                googleId: googleId,
                email: email,
                refreshToken: tokens.refresh_token,
                accessToken: tokens.access_token
            });
        } else {
            user.refreshToken = tokens.refresh_token;
            user.accessToken = tokens.access_token;
        }

        await user.save();
        console.log('User saved to database');

        // Set tokens as cookies
        res.cookie('refreshToken', tokens.refresh_token, { httpOnly: true, secure: true });
        res.cookie('accessToken', tokens.access_token, { httpOnly: true, secure: true });

        res.redirect('http://localhost:3000');
    } catch (err) {
        console.error('Error during authentication process', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = oAuthCallback
