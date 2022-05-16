import puppetteer from 'puppeteer';
import {fork} from 'child_process';


jest.setTimeout(30000);

describe('',()=>{
    let browser = null;
    let page = null;
    let server = null;
    const baseUrl = 'http://localhost:9000';

    beforeAll(async () => {
        server = fork(`${__dirname}/e2e.server.js`);
        await new Promise((resolve, reject) => {
          server.on('error', reject);
          server.on('message', (message) => {
            if (message === 'ok') {
              resolve();
            }
          });
        });
    
        browser = await puppetteer.launch({
          headless: false, // show gui
          slowMo: 500,
          devtools: true, // show devTools
        });
        page = await browser.newPage();
        await page.goto(baseUrl);
      });

    afterAll(async () => {
        await browser.close();
        server.kill();
    });

    test('test input popover', async () => {
       const input = await page.$('.input');
       await input.click();
       await page.waitForSelector('.popover', {
            visible: true,
       });
    });

    test('test button popover', async () => {
        const button = await page.$('.button_popover');
        await button.click();
        await page.waitForSelector('.popover', {
             visible: true,
        });
     });
 
});