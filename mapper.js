#! /usr/bin/env node
import fs from 'fs';

import currencyList from './src/currencyList';

/**
 * Unable to dynamically import image sources, creating a list of cryptocurrency images into a JavaScript file
 */

let text = 'export default { \n';
currencyList.forEach((value) => {
  text += `  ${value}: require('./${value}.png'), \n`;
});
text += '};';

fs.writeFile('./src/images/index.js', text, (error) => {
  if (error) {
    throw error;
  }
});
