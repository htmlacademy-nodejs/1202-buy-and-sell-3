'use strict';

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const fs = require(`fs`);
const {
  getRandomInt,
  shuffle,
  getPictureFileName,
  getRandomCategories,
  getRandomOfferType,
} = require(`./utils`);

const {
  CATEGORIES,
  SENTENCES,
  PictureRestrict,
  TITLES,
  OfferType,
  SumRestrict,
} = require(`./mocks`);

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: getRandomCategories(CATEGORIES),
    description: shuffle(SENTENCES).slice(1, getRandomInt(1, 5)).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: getRandomOfferType(OfferType),
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
  }))
);

module.exports = {
  name: '--generate',
  run: function (args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }
    });

  }
};

