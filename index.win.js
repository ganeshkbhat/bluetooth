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
 * Identify Bluetooth Devices
 *
 */
function listDevices(callback) {
  const command = `powershell "Get-PnpDevice -Class Bluetooth"`;
  executeCommand(command, (error, stdout, stderr) => {
    console.log('Bluetooth Devices:');
    console.log(stdout);
    callback(stdout);
  });
}


/**
 * Enable Bluetooth
 *
 */
function turnOn(callback) {
  const command = `powershell "Start-Service bthserv"`;
  executeCommand(command, (error, stdout, stderr) => {
    console.log('Bluetooth enabled');
    callback(stdout);
  });
}


/**
 * Disable Bluetooth
 *
 */
function turnOff(callback) {
  const command = `powershell "Stop-Service bthserv"`;
  executeCommand(command, (error, stdout, stderr) => {
    console.log('Bluetooth disabled');
    callback(stdout);
  });
}


/**
 * Pair with a Bluetooth Device
 *
 * @param {*} deviceAddress
 */
function pairDevice(deviceAddress, callback) {
  const command = `powershell "Add-BluetoothDevice -DeviceAddress ${deviceAddress}"`;
  executeCommand(command, (error, stdout, stderr) => {
    console.log(`Paired with device: ${deviceAddress}`);
    callback(stdout);
  });
}


/**
 * Unpair with a Bluetooth Device
 *
 * @param {*} deviceAddress
 */
function unpairDevice(deviceAddress, callback) {
  const command = `powershell "Remove-BluetoothDevice -DeviceAddress ${deviceAddress}"`;
  executeCommand(command, (error, stdout, stderr) => {
    console.log(`Unpaired with device: ${deviceAddress}`);
    callback(stdout);
  });
}

// List All Paired Bluetooth Devices
function listPairedDevices(callback) {
  const command = `
    $devices = Get-PnpDevice -Class Bluetooth | Where-Object { $_.Status -eq 'OK' }
    $devices | ForEach-Object { $_.FriendlyName }
  `;
  executeCommand(command, (error, stdout, stderr) => {
    console.log('Paired Bluetooth Devices:');
    console.log(stdout.trim() ? stdout : 'No paired devices found.');
    callback(stdout);
  });
}


// Check Bluetooth Status
function checkStatus(callback) {
  const command = `Get-Service -Name bthserv | Select-Object -ExpandProperty Status`;
  executeCommand(command, (error, stdout, stderr) => {
    if (stdout.trim() === 'Running') {
      console.log('Bluetooth is enabled and running');
      callback(stdout);
    } else {
      console.log('Bluetooth is disabled or not running');
      callback(stdout);
    }
  });
}

// // Example usage
// listDevices();
// turnOn();
// // Replace 'DEVICE_ID' with the actual Bluetooth device ID
// pairDevice('DEVICE_ID');
// unpairDevice('DEVICE_ID');
// listPairedDevices();
// checkStatus();
// turnOff();

module.exports = {
  listDevices,
  turnOn,
  turnOff,
  pairDevice,
  unpairDevice,
  listPairedDevices,
  checkStatus
}

