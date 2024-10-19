const currentUrl = (req) => {
    const { originalUrl, protocol } = req;
    const host = req.get('host');
    console.log("🤠 ", host);
    
    const url = `${protocol}://${host}`;
    console.log("💸💸💸 ", url);
    return url;
}

module.exports = currentUrl;