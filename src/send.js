/**
 * 
 * Package: bluetooth.js
 * Author: Ganesh B
 * Description: 
 * Install: npm i bluetooth.js --save
 * Github: https://github.com/ganeshkbhat/bluetooth
 * npmjs Link: https://www.npmjs.com/package/bluetooth
 * File: index.js
 * File Description: 
 * 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const { execSync } = require('child_process');

function sendFile(deviceAddress, filePath, callback = (r) => { console.log(`data from sender ${r}`) }) {
  let result;
  try {
    const command = `bluetooth-sendto --device=${deviceAddress} ${filePath}`;
    result = execSync(command);
    console.log(`File sent to ${deviceAddress}`);
  } catch (error) {
    console.error(`Failed to send file to ${deviceAddress}:`, error);
  } finally {
    callback(result);
  }
}

module.exports = sendFile;
