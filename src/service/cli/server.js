'use strict';
const http = require(`http`);
const fsPromises = require(`fs`).promises;
const chalk = require(`chalk`);
const {sendResponse} = require(`./utils`);
const {HttpCode} = require(`./../../constants`);

const DEFAULT_SERVER_PORT = 3000;
const FILE_NAME = `mocks.json`;

const onClientConnect = async (request, response) => {
  try {
    switch (request.url) {
      case `/`: {
        const pathToFile = `./${FILE_NAME}`;
        const data = await fsPromises.readFile(pathToFile, `utf8`);
        const result = JSON.parse(data);
        const titles = result.map((item) => item.title);
        const responseText = `<ul>${titles.map((title) => `<li>${title}</li>`).join(``)}</ul>`;
        return sendResponse(response, HttpCode.OK, responseText);
      }
      default:
        return sendResponse(response, HttpCode.NOT_FOUND, `Not found`);
    }
  } catch (e) {
    if (e.code === `ENOENT`) {
      console.error(chalk.red(`${e.path} doesn't exist`));
      return sendResponse(response, HttpCode.NOT_FOUND, `Not found`);
    }
    console.error(chalk.red(`Unexpected error: ${e}`));
    return sendResponse(response, HttpCode.INTERNAL_SERVER_ERROR, `Internal server error`);
  }
};


module.exports = {
  name: `--server`,
  async run(args) {
    const [count] = args;
    const port = Number.parseInt(count, 10) || DEFAULT_SERVER_PORT;
    const httpServer = http.createServer(onClientConnect);
    httpServer.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании http-сервера.`, err);
      }
      return console.info(`Принимаю подключения на ${port}`);
    });
  }
};
