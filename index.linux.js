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
 * @param {*} macAddress
 * @param {*} callback
 */
function pairDevice(macAddress, callback) {
  executeCommand(`bluetoothctl pair ${macAddress}`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} macAddress
 * @param {*} callback
 */
function unpairDevice(macAddress, callback) {
  executeCommand(`bluetoothctl remove ${macAddress}`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} callback
 */
function openBluetooth(callback) {
  executeCommand('rfkill unblock bluetooth', (error, stdout, stderr) => {
    callback(stdout.trim());
  });

}

/**
 *
 *
 * @param {*} callback
 */
function closeBluetooth(callback) {
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
function checkBluetoothStatus(callback) {
  executeCommand('systemctl is-active bluetooth', (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

// listDevices(devices => { console.log('Available devices:', devices); });
// pairDevice('XX:XX:XX:XX:XX:XX', result => { console.log('Pairing result:', result); });
// unpairDevice('XX:XX:XX:XX:XX:XX', result => { console.log('Unpairing result:', result); });
// openBluetooth(result => { console.log('Bluetooth enabled:', result); });
// closeBluetooth(result => { console.log('Bluetooth disabled:', result); });


module.exports = {
  listDevices,
  pairDevice,
  unpairDevice,
  openBluetooth,
  closeBluetooth,
  listPairedDevices,
  checkBluetoothStatus
}

