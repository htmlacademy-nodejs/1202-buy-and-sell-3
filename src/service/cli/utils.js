'use strict';

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

module.exports = {
  getPictureFileName,
  getRandomInt,
  getRandomCategories,
  getRandomItem,
  getRandomOfferType,
  shuffle,
};

