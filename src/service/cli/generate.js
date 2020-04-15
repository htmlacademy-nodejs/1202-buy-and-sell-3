'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {
  getRandomInt,
  shuffle,
  getPictureFileName,
  getRandomCategories,
  getRandomOfferType,
  getRandomItem,
} = require(`./utils`);

const {
  CATEGORIES,
  SENTENCES,
  PictureRestrict,
  TITLES,
  OfferType,
  SumRestrict,
} = require(`./mocks`);

const {
  ExitCode
} = require(`../../constants`);

const FILE_NAME = `mocks.json`;
const DEFAULT_COUNT = 1;

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: getRandomCategories(CATEGORIES),
    description: shuffle(SENTENCES).slice(1, getRandomInt(1, 5)).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: getRandomItem(TITLES),
    type: getRandomOfferType(OfferType),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await fs.writeFile(FILE_NAME, content);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file... Error: ${err}`));
      process.exit(ExitCode.ERROR);
    }
  }
};

