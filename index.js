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

const os = require("os");
const ost = os.type().toLowerCase();
var bluetooth;

if (ost === "linux") {
    bluetooth = { ...require("./index.linux") };
} else if (ost === "darwin") {
    bluetooth = { ...require("./index.mac") };
} else if (ost === "windows_nt") {
    bluetooth = { ...require("./index.win") };
} else {
    bluetooth = { ...require("./index.linux") };
}

module.exports = bluetooth;
