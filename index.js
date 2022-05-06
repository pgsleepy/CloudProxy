const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const http = require('http')
const url = require('url')

// CONFIGURE THE PORT TO YOUR LIKINGS IF THIS PORT IS BLOCKED!/
var port = 1337;
//--------------------------------------------------------/

(async () => {
    var urlInt = 0;
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({ headless: true });

    //Start Native Nodejs HTTP server
    var server = http.createServer(async function (req, res) {
        const queryObject = url.parse(req.url, true);
        if (queryObject.search === null) return;
        if (queryObject.search.includes('?url=')) urlInt++;

        if (urlInt < 1) return res.end("No URL parameters given.")

        urlParams = queryObject.search.replace("?url=", "")

        if (!urlParams.includes("http://")) if (!urlParams.includes("https://")) return res.end(`Invalid URL. HTTP:// or HTTPS:// expected\nDid you perhabs mean: https://${urlParams}`)

        const page = await browser.newPage();

        urlresponse = await page.goto(urlParams);
        responseBody = await urlresponse.text();

        res.write(responseBody)
        res.end()

        urlInt = 0;
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

