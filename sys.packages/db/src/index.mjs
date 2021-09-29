
import logger from '@sys.packages/logger';

import fs from 'fs';
import path from 'path';
import Sq from 'sequelize';

export let models = {};
export let sequelize = null;

const __dirname = process.cwd();


export default async (host) => {
  try {
    logger['info']('DB: Создание соединения к базе данных');

    sequelize = new Sq.Sequelize(host, {
      dialect: 'postgres',
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 2000,
        idle: 1000
      },
    });

    logger['info']('DB: Объект базы данных создан');

    await sequelize.authenticate();

    logger['info']('DB: Подключение к базе данный прошло успешно');

    const files = fs.readdirSync(path.resolve(__dirname, 'src/models'))
      .map((fileName) => ({
        path: path.join(__dirname, 'src/models', fileName),
        name: fileName.replace(/\.[^/.]+$/, ""),
      }));

    for (let index in files) {
      if (files.hasOwnProperty(index)) {
        const file = files[index];
        const modelModule = await import(file['path']);

        logger['info']('DB: добавлена модель: ' + file['name']);

        models[file['name']] = modelModule['default'](sequelize, Sq.DataTypes);
      }
    }

    for (let index in models) {
      if (models.hasOwnProperty(index)) {
        const model = models[index];

        model['associate'] && model['associate'](models);
      }
    }

    await sequelize.sync();

    logger['info']('DB: Синхронизация моделей');

    return true;
  }
  catch(error) {
    console.log(error)
    logger['error']('DB: ' + error['message']);
  }
}

export { Sequelize } from 'sequelize';
