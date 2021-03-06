const chrome = require('chrome-aws-lambda');
const puppeteer = require("puppeteer-core")

// mac
// const exePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// windows
const exePath =  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

// setup the browser
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
            headless: true,
            ignoreDefaultArgs: ['–disable-extensions'] 
        };
    }

    return options;
}

// take the screenshot
async function getScreenshot(url, isDev) {
    const options = await getOptions(isDev);
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(url, { waitUntil: 'networkidle0' });

    screenshot = page.screenshot({ type: "jpeg", quality: 100 });
    
    return screenshot
}

// send it to netlify
exports.handler = async (event, context) => { 
    try {
        const url = `http://${event.headers.host}/opengraph/?${event.rawQuery}`
        const photoBuffer = await getScreenshot(url, false)
        
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