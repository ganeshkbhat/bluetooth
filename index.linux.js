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

const { exec } = require('child_process');

/**
 * Function to execute a command
 *
 * @param {*} command
 * @param {*} callback
 */
function executeCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    callback(error, stdout, stderr);
  });
}

/**
 *
 *
 * @param {*} callback
 */
function listDevices(callback) {
  executeCommand('bluetoothctl devices', (error, stdout, stderr) => {
    const devices = stdout.trim().split('\n').map(line => {
      const [_, mac, ...nameParts] = line.split(' ');
      return { mac, name: nameParts.join(' ') };
    });
    callback(devices);
  });

}

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function pairDevice(deviceAddress, callback) {
  executeCommand(`bluetoothctl pair ${deviceAddress}`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function unpairDevice(deviceAddress, callback) {
  executeCommand(`bluetoothctl remove ${deviceAddress}`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} callback
 */
function turnOn(callback) {
  executeCommand('rfkill unblock bluetooth', (error, stdout, stderr) => {
    callback(stdout.trim());
  });

}

/**
 *
 *
 * @param {*} callback
 */
function turnOff(callback) {
  executeCommand('rfkill block bluetooth', (error, stdout, stderr) => {
    callback(stdout.trim());
  });

}

// Function to list paired Bluetooth devices
function listPairedDevices(callback) {
  executeCommand(`bluetoothctl paired-devices`, (error, stdout, stderr) => {
    const devices = stdout.trim().split('\n').map(line => {
      const [_, mac, ...nameParts] = line.split(' ');
      return { mac, name: nameParts.join(' ') };
    });
    callback(devices);
  });
}

// Function to check Bluetooth status
function checkStatus(callback) {
  executeCommand('systemctl is-active bluetooth', (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

// listDevices(devices => { console.log('Available devices:', devices); });
// pairDevice('XX:XX:XX:XX:XX:XX', result => { console.log('Pairing result:', result); });
// unpairDevice('XX:XX:XX:XX:XX:XX', result => { console.log('Unpairing result:', result); });
// turnOn(result => { console.log('Bluetooth enabled:', result); });
// turnOff(result => { console.log('Bluetooth disabled:', result); });
// checkStatus

module.exports = {
  listDevices,
  pairDevice,
  unpairDevice,
  turnOn,
  turnOff,
  listPairedDevices,
  checkStatus
}

