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


## Usage
Once you've done the installation, you should be ready to go.
You will need to run `node index` and you'll be welcomed by the CloudProxy ASCII art followed by 
`Proxy succesfully started on port 1337!`

From here you should be able to go to `http://localhost:1337/?url=https://json.org/example.html` and it should reroute the connection without any hiccups!

Keep in mind, not all traffic will work, this is mainly made to gather JSON data from websites with CloudFlare's anti-bot protection.

## Issues
Feel free to make new issues when something arises, I'll gladly try to help you out!
