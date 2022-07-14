import chrome from "chrome-aws-lambda";
import { launch } from "puppeteer-core";

// mac
// const exePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// windows
const exePath =  'C:\\Program Files (x86)\\Microsoft\\Edge Dev\\Application\\msedge.exe'

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
    const browser = await launch(options);
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(url);

    return page.screenshot({ type: "jpeg", quality: 100 });
}

exports.handler = async (event, context) => { 
    try {
        const url = "https://chance.utc24.io"
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