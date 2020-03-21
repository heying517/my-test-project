/* eslint-disable */
const path = require('path');
const fs = require('fs');

function entryFunc(moduleArray = [], basePath = path.resolve(__dirname, '../src/')) {
  const files = fs.readdirSync(basePath);
  const entryObj = {};
  files
    .filter((item) => {
      // const whiteList = ['discovery', 'faq'];
      // if (process.env.NODE_ENV === 'development') {
      //   return whiteList.includes(item);
      // }
      return !item.includes('demo') && item !== 'common' && !item.startsWith('.');
    })
    .map((item) => {
      if (item.indexOf('.') > 0) {
        entryObj[item.substr(0, item.indexOf('.'))] = moduleArray.concat(path.resolve(basePath, item));
      } else {
        entryObj[item] = moduleArray.concat(path.resolve(basePath, item, 'index.js'));
      }
    });

  return entryObj;
}

module.exports = entryFunc;
