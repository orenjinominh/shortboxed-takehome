
console.log('inside parser folder');
// /* PARSER FUNCTION
// - should take in id from end of website string
// - if ID exists in dB, don't add
// - if ID does NOT exist in db, add to dB using model 

// */

// const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// sample url and object to test functionality of web scraper
const url = 'https://www.cbcscomics.com/grading-notes/21-04D753B-004';

let comicMetadata = {
  id: '21-04D753B-004',
  title: '',
  publisher: '',
  grade: ''
};

const parse = (url, comicMetadata) => {


  puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => {
      return page.goto(url).then(function() {
        return page.content();
      });
    })
    .then(html => {
      const $ = cheerio.load(html);
      console.log(html);

      const projectDiv = $('div[class="project"]');

      // add specific metadata here:
      // grab title
      projectDiv.find('h2').each(function() {
        console.log('meta b4 title');
        comicMetadata.title = $(this).text();
        console.log('meta after', comicMetadata);
        // newsHeadlines.push({
        //   title: $(this).text(),
        // });
      });
      // grab publisher
      // projectDiv.find('ul:nth-child(1)').each(function() {
      //   comicMetadata.publisher = $(this).text();
      // });

      // // grab grade
      // projectDiv.find('nth-child(4)').each(function() {
      //   comicMetadata.grade = $(this).text();
      // });

      // console.log('final json object is grabbed as follows: ', comicMetadata);
      return comicMetadata;
    })
    .catch(console.error);
}

parse(url, comicMetadata);

module.exports = parse; 