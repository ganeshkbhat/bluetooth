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

// Power on Bluetooth
function powerOn(callback) {
  let result = execCommand('blueutil --power 1');
  console.log('Bluetooth powered on');
  callback(result);
}

// Power off Bluetooth
function powerOff(callback) {
  let result = execCommand('blueutil --power 0');
  console.log('Bluetooth powered off');
  callback(result);
}

// Set agent on (enable Bluetooth)
function agentOn(callback) {
  let result = execCommand('blueutil --discoverable 1');
  console.log('Bluetooth agent on');
  callback(result);
}

// Set agent off (disable Bluetooth)
function agentOff(callback) {
  let result = execCommand('blueutil --discoverable 0');
  console.log('Bluetooth agent off');
  callback(result);
}

// Make Bluetooth discoverable
function discoverableOn(callback) {
  let result = execCommand('blueutil --discoverable 1');
  console.log('Bluetooth discoverable on');
  callback(result);
}

// Make Bluetooth non-discoverable
function discoverableOff(callback) {
  let result = execCommand('blueutil --discoverable 0');
  console.log('Bluetooth discoverable off');
  callback(result);
}

// Start scanning for Bluetooth devices
function scanOn(callback) {
  let result = execCommand('blueutil --inquiry 1');
  console.log('Bluetooth scanning on');
  callback(result);
}

// Stop scanning for Bluetooth devices
function scanOff(callback) {
  let result = execCommand('blueutil --inquiry 0');
  console.log('Bluetooth scanning off');
  callback(result);
}

// Set device as pairable (enabled by default on macOS)
function pairableOn(callback) {
  console.log('Bluetooth pairable on (default state)');
}

// Set device as non-pairable
function pairableOff(callback) {
  console.log('Bluetooth pairable off (no direct command to disable on macOS)');
}

// Trust a Bluetooth device by its address
function trustDevice(deviceAddress, callback) {
  let result = execCommand(`blueutil --trust ${deviceAddress}`);
  console.log(`Trusted device: ${deviceAddress}`);
  callback(result);
}

// Connect to a Bluetooth device by its address
function connectDevice(deviceAddress, callback) {
  let result = execCommand(`blueutil --connect ${deviceAddress}`);
  console.log(`Connected to device: ${deviceAddress}`);
  callback(result);
}

// Disconnect a Bluetooth device by its address
function disconnectDevice(deviceAddress, callback) {
  let result = execCommand(`blueutil --disconnect ${deviceAddress}`);
  console.log(`Disconnected from device: ${deviceAddress}`);
  callback(result);
}

// List visible Bluetooth devices during scan
function listDevices(callback) {
  const devices = execCommand('blueutil --paired --inquiry');
  console.log('Visible Bluetooth devices:\n', devices);
  callback(devices);
}

// List connected Bluetooth devices
function listConnected(callback) {
  const devices = execCommand('system_profiler SPBluetoothDataType | grep "Connected: Yes" -B 7');
  console.log('Connected Bluetooth devices:\n', devices);
  callback(devices);
}

// List paired Bluetooth devices
function listPaired(callback) {
  const devices = execCommand('blueutil --paired');
  console.log('Paired Bluetooth devices:\n', devices);
  callback(devices);
}

// // Example usage
// (async () => {
//   try {
//     await powerOn();
//     await powerOff();
//     await agentOn();
//     await agentOff();
//     await discoverableOn();
//     await discoverableOff();
//     await scanOn();
//     await scanOff();
//     await trustDevice('XX:XX:XX:XX:XX:XX');  // Replace with the actual device address
//     await connectDevice('XX:XX:XX:XX:XX:XX'); // Replace with the actual device address
//     await disconnectDevice('XX:XX:XX:XX:XX:XX'); // Replace with the actual device address
//     await listDevices();
//     await listConnected();
//     await listPaired();
    
//   } catch (error) {
//     console.error(error);
//   }
// })();

// // Example usage
// checkStatus();
// turnOn();
// listPaired();
// listDevices();
// // pairDevice('XX-XX-XX-XX-XX-XX'); // Replace with actual device address
// // unpairDevice('XX-XX-XX-XX-XX-XX'); // Replace with actual device address
// turnOff();

module.exports = {
  listDevices,
  pairDevice,
  unpairDevice,
  turnOn,
  turnOff,
  powerOn,
  powerOff,
  // removeDevice,
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
  // defaultDevice,
  listPaired,
  listConnected,
  checkStatus
}

