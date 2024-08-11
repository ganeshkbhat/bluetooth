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



/**
 * Function to execute system commands
 *
 * @param {*} command
 * @return {*} 
 */
function executeCommand(command) {
  try {
    return execSync(command, { stdio: 'pipe' }).toString();
  } catch (error) {
    console.error(`Error executing command: ${command}\n${error.message}`);
    return null;
  }
}


/**
 * Identify Bluetooth status
 *
 * @param {*} callback
 */
function checkStatus(callback) {
  const command = 'system_profiler SPBluetoothDataType | grep "Bluetooth Power"';
  const result = executeCommand(command);
  console.log(`Bluetooth Status: ${result}`);
  callback(result);
}


/**
 * Turn Bluetooth on
 *
 * @param {*} callback
 */
function turnOn(callback) {
  const command = 'blueutil --power 1';
  executeCommand(command);
  console.log('Bluetooth turned on.');
  callback(result);
}


/**
 * Turn Bluetooth off
 *
 * @param {*} callback
 */
function turnOff(callback) {
  const command = 'blueutil --power 0';
  executeCommand(command);
  console.log('Bluetooth turned off.');
  callback(result);
}


/**
 * List paired devices
 *
 * @param {*} callback
 */
function listPaired(callback) {
  const command = 'blueutil --paired';
  const result = executeCommand(command);
  console.log(`Paired Devices:\n${result}`);
  callback(result);
}


/**
 * Pair with a device (replace XX-XX-XX-XX-XX-XX with the device address)
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function pairDevice(deviceAddress, callback) {
  const command = `blueutil --pair ${deviceAddress}`;
  const result = executeCommand(command);
  console.log(`Paired with device: ${deviceAddress}`);
  callback(result);
}

/**
 * Unpair a device (replace XX-XX-XX-XX-XX-XX with the device address)
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function unpairDevice(deviceAddress, callback) {
  const command = `blueutil --unpair ${deviceAddress}`;
  const result = executeCommand(command);
  console.log(`Unpaired device: ${deviceAddress}`);
  callback(result);
}


/**
 * List all Bluetooth devices
 *
 */
function listDevices(callback) {
  const command = 'system_profiler SPBluetoothDataType';
  const result = executeCommand(command);

  const devices = [];
  const lines = result.split('\n');

  let currentDevice = null;
  lines.forEach(line => {
    if (line.includes('Device Name:')) {
      if (currentDevice) devices.push(currentDevice);
      currentDevice = { name: line.split(': ')[1].trim() };
    } else if (line.includes('Address:')) {
      if (currentDevice) currentDevice.address = line.split(': ')[1].trim();
    } else if (line.includes('Connected:')) {
      if (currentDevice) currentDevice.connected = line.split(': ')[1].trim();
    }
  });

  if (currentDevice) devices.push(currentDevice);

  console.log('All Bluetooth Devices:');
  devices.forEach((device, index) => {
    console.log(`${index + 1}. Name: ${device.name}, Address: ${device.address}, Connected: ${device.connected}`);
  });
  callback(devices);
}

// // Example usage
// checkStatus();
// turnOn();
// listPaired();
// listDevices();
// // pairDevice('XX-XX-XX-XX-XX-XX'); // Replace with actual device address
// // unpairDevice('XX-XX-XX-XX-XX-XX'); // Replace with actual device address
// turnOff();

module.exports = {
  checkStatus,
  turnOn,
  turnOff,
  listPaired,
  pairDevice,
  unpairDevice,
  listDevices
}

