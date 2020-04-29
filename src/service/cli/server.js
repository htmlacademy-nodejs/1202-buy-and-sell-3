'use strict';
const http = require(`http`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {sendResponse} = require(`./utils`);
const {HttpCode} = require(`./../../constants`);

const DEFAULT_SERVER_PORT = 3000;
const FILE_NAME = `mocks.json`;

const onClientConnect = async (request, response) => {
  try {
    switch (request.url) {
      case `/`: {
        let data = ``;
        try {
          const pathToFile = `./${FILE_NAME}`;
          data = await fs.readFile(pathToFile, `utf8`);
        } catch (e) {
          console.error(chalk.red(`Can't read data from file ${FILE_NAME}... Error: ${e}`));
          sendResponse(response, HttpCode.NOT_FOUND, `Not found`);
        }
        const result = JSON.parse(data);
        const titles = result.map((item) => item.title);
        const responseText = `<ul>${titles.map((title) => `<li>${title}</li>`).join(``)}</ul>`;
        sendResponse(response, HttpCode.OK, responseText);
        break;
      }
      default:
        sendResponse(response, HttpCode.NOT_FOUND, `Not found`);
    }
  } catch (e) {
    console.error(chalk.red(`Unexpected error: ${e}`));
    sendResponse(response, HttpCode.INTERNAL_SERVER_ERROR, `Internal server error`);
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
