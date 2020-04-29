'use strict';

const fs = require(`fs`).promises;
const endOfLine = require(`os`).EOL;
const chalk = require(`chalk`);

const {
  ExitCode
} = require(`../../constants`);


const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getPictureFileName = (num) => {
  const paddedNum = (num + ``).padStart(2, `0`);
  return `item${paddedNum}.jpg`;
};

const getRandomCategories = (categories) => {
  return Array.from(
      new Set(
          Array.from({
            length: getRandomInt(1, categories.length - 1)
          }, () => {
            return getRandomItem(categories);
          })));
};

const getRandomOfferType = (OfferType) => {
  return getRandomItem(Object.values(OfferType));
};

const getRandomItem = (arr) => {
  return arr[getRandomInt(0, arr.length - 1)];
};

const getDataFromFile = async (filename) => {
  let result = [];
  try {
    const pathToFile = `${__dirname}/../../../data/${filename}`;
    const data = await fs.readFile(pathToFile, `utf8`);
    result = data.split(endOfLine).filter((x) => !!x);
  } catch (e) {
    console.error(chalk.red(`Can't read data from file ${filename}... Error: ${e}`));
    process.exit(ExitCode.ERROR);
  }
  return result;
};

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

module.exports = {
  getDataFromFile,
  getPictureFileName,
  getRandomInt,
  getRandomCategories,
  getRandomItem,
  getRandomOfferType,
  sendResponse,
  shuffle,
};

