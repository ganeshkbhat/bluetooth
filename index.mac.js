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

// Function to execute system commands
function executeCommand(command) {
  try {
    return execSync(command, { stdio: 'pipe' }).toString();
  } catch (error) {
    console.error(`Error executing command: ${command}\n${error.message}`);
    return null;
  }
}

// Identify Bluetooth status
function getBluetoothStatus() {
  const command = 'system_profiler SPBluetoothDataType | grep "Bluetooth Power"';
  const result = executeCommand(command);
  console.log(`Bluetooth Status: ${result}`);
}

// Turn Bluetooth on
function turnBluetoothOn() {
  const command = 'blueutil --power 1';
  executeCommand(command);
  console.log('Bluetooth turned on.');
}

// Turn Bluetooth off
function turnBluetoothOff() {
  const command = 'blueutil --power 0';
  executeCommand(command);
  console.log('Bluetooth turned off.');
}

// List paired devices
function listPairedDevices(callback) {
  const command = 'blueutil --paired';
  const result = executeCommand(command);
  console.log(`Paired Devices:\n${result}`);
  callback(result);
}

// Pair with a device (replace XX-XX-XX-XX-XX-XX with the device address)
function pairWithDevice(deviceAddress) {
  const command = `blueutil --pair ${deviceAddress}`;
  executeCommand(command);
  console.log(`Paired with device: ${deviceAddress}`);
}

// Unpair a device (replace XX-XX-XX-XX-XX-XX with the device address)
function unpairDevice(deviceAddress) {
  const command = `blueutil --unpair ${deviceAddress}`;
  executeCommand(command);
  console.log(`Unpaired device: ${deviceAddress}`);
}

// List all Bluetooth devices
function listAllBluetoothDevices() {
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
}

// // Example usage
// getBluetoothStatus();
// turnBluetoothOn();
// listPairedDevices();
// listAllBluetoothDevices();
// // pairWithDevice('XX-XX-XX-XX-XX-XX'); // Replace with actual device address
// // unpairDevice('XX-XX-XX-XX-XX-XX'); // Replace with actual device address
// turnBluetoothOff();

