// import chrome from "chrome-aws-lambda";
// import { launch } from "puppeteer-core";

const chrome = require('chrome-aws-lambda');
const puppeteer = require("puppeteer-core")

// mac
// const exePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// windows
const exePath =  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

async function getOptions(isDev) {
    let options;

    if (isDev) {
        options = {
            args: [],
            executablePath: exePath,
            headless: true
        };
    } else {
        options = {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless
        };
    }

    return options;
}

async function getScreenshot(url, isDev) {
    const options = await getOptions(isDev);
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(url, { waitUntil: 'networkidle0' });

    return page.screenshot({ type: "jpeg", quality: 100 });
}

exports.handler = async (event, context) => { 
    try {
        const url = `http://localhost:3000/opengraph/?${event.rawQuery}`
        console.log('url', url)
        const photoBuffer = await getScreenshot(url, true)
        return {
            statusCode: 200,
            body: photoBuffer.toString('base64'),
            isBase64Encoded: true
        }
    } catch(e) {
        return {
            statusCode: 500,
            body: e.toString()
        }
    }
}