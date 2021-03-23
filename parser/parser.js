// sample url and object to test functionality of web scraper
const url = 'https://www.cbcscomics.com/grading-notes/21-04D753B-004';
const puppeteer = require ('puppeteer');


let parse = async (url) => {
  let comicData = {};

  await puppeteer.launch()
    .then (async browser => { 
      const page = await browser.newPage(); 	
      await page.goto(url); 	
      await page.waitForSelector('body');

      await page.goto(url, { waitUntil: 'networkidle0' });

      //refactor to concurrent calls
      Promise.all([
        await page.evaluate(() => document.querySelector('body * > div.input-group > input').value),
        await page.evaluate(() => document.querySelector('body * > div.projects > h2').innerText),
        await page.evaluate(() => document.querySelector('body * > div.projects > ul > li:first-child').innerText),
        await page.evaluate(() => document.querySelector('body * > div.projects > h2:nth-child(5)').innerText)
      ])
        .then (result => {
          // console.log('promise chain result array here', result);

          let finalText = [...result];
          comicData.comicId = finalText[0];
          comicData.title = finalText[1];
          comicData.publisher = finalText[2];
          comicData.grade = finalText[3];

          // console.log('comic data here', comicData);
          return comicData; 
        })
        .catch (err => {
          console.log('failed to retrieve text from HTML', err);
        })

    })
    .catch (function (err) {
      console.error(err);
    });
  
  // console.log('comic data here', comicData);
  return comicData;

}

parse(url);

module.exports = parse; 