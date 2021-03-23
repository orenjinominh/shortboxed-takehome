# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run start-server`
Runs the Express server set to port 4000 and enables connection to your local MongoDB. 

### `node parser/parser.js`
At the top of your local directory, retrieves the CBCS metadata of comicId, publisher, title, and grade. 
- Un-comment the sample url at the top of the file, comment out line 7, and pass it in as a parameter and execute parse(url)
- OR add parse(paramID) of your choice to retrieve any comic's metadata in an JSON format, independent of this project. ParamID will be a string.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

FOR COMPLETE DOCUMENTATION AND MY JOURNEY WITH THIS TAKE HOME, PLEASE GO TO https://www.notion.so/ShortBoxed-Take-Home-Assignment-b9e6b6f6099a4927b3c915379271be65