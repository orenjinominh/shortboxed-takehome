// sample url and object to test functionality of web scraper
const url = 'https://www.cbcscomics.com/grading-notes/21-04D753B-004';
const axios = require('axios');
const puppeteer = require ('puppeteer');

const parse = async (url) => {
  puppeteer.launch()
    .then (async browser => { 
      const page = await browser.newPage(); 	
      await page.goto(url); 	
      await page.waitForSelector('body');

      await page.goto(url, { waitUntil: 'networkidle0' });
      const data = await page.evaluate(() => document.querySelector('body * > div.projects').outerHTML);

      console.log(data);

    })
    .catch (function (err) {
      console.error (err);
    });
}
parse(url);