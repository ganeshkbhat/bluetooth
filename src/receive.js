/**
 * 
 * Package: bluetooth.js
 * Author: Ganesh B
 * Description: 
 * Install: npm i bluetoothjs --save
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

function receiveData(deviceAddress, channel = 1, callback = (r) => { console.log(`data from sender ${r}`) }) {
  let result;
  try {
    execSync(`rfcomm bind 0 ${deviceAddress} ${channel}`);
    result = execSync('cat /dev/rfcomm0', { stdio: 'inherit' });
    console.log(`Listening for data from ${deviceAddress} on channel ${channel}`);
  } catch (error) {
    console.error(`Failed to receive data from ${deviceAddress}:`, error);
  } finally {
    execSync(`rfcomm release 0`);
    callback(result);
  }
}

module.exports = receiveData;
