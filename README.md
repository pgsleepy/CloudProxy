
# CloudProxy
A simple yet highly efficient CloudFlare anti-bot bypasser using [puppeteer-extra](https://github.com/berstend/puppeteer-extra) and [# puppeteer-extra-plugin-stealth](https://github.com/turnalan/puppeteer-extra-plugin-stealth-corgi-io) built in [Node.JS](https://nodejs.org/en/) with :heart: by PGSleepy

## Installation
Before anything, please install [NodeJS](https://nodejs.org/en/).
Once you've installed that, proceed with the installation.

You'll firstly need to install the dependencies, you will need to do the command:
`npm install` in the directory where you placed CloudProxy.

This should install 3 dependencies: 
 - puppeteer
 - puppeteer-extra
 - puppeteer-extra-plugin-stealth


## Linux
### (_**NOT RECOMMENDED FOR PUBLIC USAGE! ALLOWS FOR REMOTE CODE EXECUTION!**_)

Additionally, if you're using a Linux based system, there are some additional steps that need to be taken before you're able to run it.
First things first, you'll need to install all the dependencies for Chromium.

`sudo apt-get install libgconf-2-4 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libgbm-dev libnss3-dev libxss-dev libasound2`

Once that's done there's an error `Running as root without --no-sandbox is not supported.` which is caused by the nature of Chromium not being able to run in root.
Luckily, you can mostly fix that by passing the --no-sandbox argument 

Disabling the sandbox makes your server more vulnerable to exploits via webpages and especially with the nature of this program it means that anyone can go to your CloudProxy IP:Port/?url= and perform [Remote Code Execution/Arbitary Code Execution](https://en.wikipedia.org/wiki/Arbitrary_code_execution).

Use at your own risk!

To do this you change the field in `index.js` that says 

`const  browser  =  await  puppeteer.launch({  headless: true  });`

to

`const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});`


## Usage
Once you've done the installation, you should be ready to go.
You will need to run `node index` and you'll be welcomed by the CloudProxy ASCII art followed by 
`Proxy succesfully started on port 1337!`

From here you should be able to go to `http://localhost:1337/?url=https://json.org/example.html` and it should reroute the connection without any hiccups!

Keep in mind, not all traffic will work, this is mainly made to gather JSON data from websites with CloudFlare's anti-bot protection.

## Issues
Feel free to make new issues when something arises, I'll gladly try to help you out!
