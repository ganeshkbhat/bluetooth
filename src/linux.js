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
 * @param {*} deviceAddress
 * @param {*} callback
 */
function removeDevice(deviceAddress, callback) {
  unpairDevice(deviceAddress, callback);
}

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function trustDevice(deviceAddress, callback) {
  executeCommand(`bluetoothctl trust ${deviceAddress}`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function connectDevice(deviceAddress, callback) {
  executeCommand(`bluetoothctl connect ${deviceAddress}`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function disconnectDevice(deviceAddress, callback) {
  executeCommand(`bluetoothctl disconnect ${deviceAddress}`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function powerOn(deviceAddress, callback) {
  executeCommand(`bluetoothctl power on`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function powerOff(deviceAddress, callback) {
  executeCommand(`bluetoothctl power off`, (error, stdout, stderr) => {
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

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function agentOn(deviceAddress, callback) {
  executeCommand(`bluetoothctl agent on`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function agentOff(deviceAddress, callback) {
  executeCommand(`bluetoothctl agent off`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function scanOn(deviceAddress, callback) {
  executeCommand(`bluetoothctl scan on`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function scanOff(deviceAddress, callback) {
  executeCommand(`bluetoothctl scan off`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function pairableOn(deviceAddress, callback) {
  executeCommand(`bluetoothctl pairable on`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function pairableOff(deviceAddress, callback) {
  executeCommand(`bluetoothctl pairable off`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function discoverableOn(deviceAddress, callback) {
  executeCommand(`bluetoothctl discoverable on`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

/**
 *
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function discoverableOff(deviceAddress, callback) {
  executeCommand(`bluetoothctl discoverable off`, (error, stdout, stderr) => {
    callback(stdout.trim());
  });
}

// Function to list paired Bluetooth devices
function listPaired(callback) {
  executeCommand(`bluetoothctl paired-devices`, (error, stdout, stderr) => {
    const devices = stdout.trim().split('\n').map(line => {
      const [_, mac, ...nameParts] = line.split(' ');
      return { mac, name: nameParts.join(' ') };
    });
    callback(devices);
  });
}

// Function to list connected Bluetooth devices
function listConnected(callback) {
  executeCommand(`bluetoothctl list`, (error, stdout, stderr) => {
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
  powerOn,
  powerOff,
  removeDevice,
  trustDevice,
  connectDevice,
  disconnectDevice,
  agentOn,
  agentOff,
  scanOn,
  scanOff,
  pairableOn,
  pairableOff,
  discoverableOn,
  discoverableOff,
  listPaired,
  listConnected,
  checkStatus
}

