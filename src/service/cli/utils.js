'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.getRandomInt = getRandomInt;

module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

module.exports.getPictureFileName = (num) => {
  const paddedNum = (num + '').padStart(2, '0');
  return `item${paddedNum}.jpg`
};

module.exports.getRandomCategories = (categories) => {
  if (Array.isArray(categories)) {
    return Array.from(
      new Set(
        Array.from({
          length: getRandomInt(1, categories.length - 1)
        }, () => {
          return categories[getRandomInt(0, categories.length - 1)]
        })))
  } else {
    throw 'Categories must be of Array type'
  }
};

module.exports.getRandomOfferType = (OfferType) => {
  const keys = Object.keys(OfferType);
  return keys[Math.floor(Math.random() * keys.length)]
};
