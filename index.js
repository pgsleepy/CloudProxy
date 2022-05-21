const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const http = require('http')
const url = require('url')

// CONFIGURE THE PORT TO YOUR LIKINGS IF THIS PORT IS BLOCKED!/
var port = 1337;
//--------------------------------------------------------/

(async () => {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({ headless: true });

    //Start Native Nodejs HTTP server
    var server = http.createServer(async function (req, res) {
        const parsedUrl = url.parse(req.url, true);

        if (parsedUrl.query == null) return res.end("Something went wrong, please restart.");
        if (parsedUrl.query.url == null || parsedUrl.query.url === '') return res.end("No URL parameters given.");

        urlParams = parsedUrl.query.url;

        if (!urlParams.match(/^https?/)) return res.end(`Invalid URL. HTTP:// or HTTPS:// expected\nDid you perhaps mean: https://${urlParams}`);

        const page = await browser.newPage();

        page.goto(urlParams)
        .then(async urlresponse => {
            console.log('urlresp', urlresponse);
            responseBody = await urlresponse.text();
            res.write(responseBody);
            res.end();
        })
        .catch(e => {
            res.end(e.message);
        });

        process.on("exit", async (code) => {
            await browser.close();
            console.log("Closed CloudScraper with code: " + code);
        })
    });

    server.listen(port);
    process.stdout.write('\033c');
    console.log(`   _____ _                 _ _____                     \n  / ____| |               | |  __ \\                    \n | |    | | ___  _   _  __| | |__) _ __ _____  ___   _ \n | |    | |/ _ \\| | | |/ _\` |  ___| '__/ _ \\ \\/ | | | |\n | |____| | (_) | |_| | (_| | |   | | | (_) >  <| |_| |\n  \\_____|_|\\___/ \\__,_|\\__,_|_|   |_|  \\___/_/\\_\\__,  |\n                                                  __/ |\nBy \x1b[1mPGSleepy (https://github.com/pgsleepy)\x1b[0m        |___/ \n\x1b[0m\n\x1b[7mUsage: http://localhost:${port}/?url=https://www.yoururl.com/index.php\x1b[0m`)
    console.log(`\x1b[7mMake sure to add the HTTP(S):// protocol!\x1b[0m`)
    console.log(`Proxy succesfully started on port ${port}`)
})();
