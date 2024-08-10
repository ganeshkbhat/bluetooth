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
    callback(stdout);
  });
}


/**
 * Identify Bluetooth Devices
 *
 */
function listBluetoothDevices(callback) {
  const command = `powershell "Get-PnpDevice -Class Bluetooth"`;
  executeCommand(command, callback || function (output) {
    console.log('Bluetooth Devices:');
    console.log(output);
  });
}


/**
 * Enable Bluetooth
 *
 */
function enableBluetooth() {
  const command = `powershell "Start-Service bthserv"`;
  executeCommand(command, callback || function (output) {
    console.log('Bluetooth enabled');
  });
}


/**
 * Disable Bluetooth
 *
 */
function disableBluetooth() {
  const command = `powershell "Stop-Service bthserv"`;
  executeCommand(command, callback || function (output) {
    console.log('Bluetooth disabled');
  });
}


/**
 * Pair with a Bluetooth Device
 *
 * @param {*} deviceId
 */
function pairBluetoothDevice(deviceId) {
  const command = `powershell "Add-BluetoothDevice -DeviceAddress ${deviceId}"`;
  executeCommand(command, callback || function (output) {
    console.log(`Paired with device: ${deviceId}`);
  });
}


/**
 * Unpair with a Bluetooth Device
 *
 * @param {*} deviceId
 */
function unpairBluetoothDevice(deviceId) {
  const command = `powershell "Remove-BluetoothDevice -DeviceAddress ${deviceId}"`;
  executeCommand(command, callback || function (output) {
    console.log(`Unpaired with device: ${deviceId}`);
  });
}

// List All Paired Bluetooth Devices
function listPairedBluetoothDevices() {
  const command = `
    $devices = Get-PnpDevice -Class Bluetooth | Where-Object { $_.Status -eq 'OK' }
    $devices | ForEach-Object { $_.FriendlyName }
  `;
  executeCommand(command, (output) => {
    console.log('Paired Bluetooth Devices:');
    console.log(output.trim() ? output : 'No paired devices found.');
  });
}


// Check Bluetooth Status
function checkBluetoothStatus() {
  const command = `Get-Service -Name bthserv | Select-Object -ExpandProperty Status`;
  executeCommand(command, (output) => {
    if (output.trim() === 'Running') {
      console.log('Bluetooth is enabled and running');
    } else {
      console.log('Bluetooth is disabled or not running');
    }
  });
}


// // Example usage
listBluetoothDevices();
// enableBluetooth();
// // Replace 'DEVICE_ID' with the actual Bluetooth device ID
// pairBluetoothDevice('DEVICE_ID');
// unpairBluetoothDevice('DEVICE_ID');
// disableBluetooth();


module.exports = {
  listBluetoothDevices,
  enableBluetooth,
  disableBluetooth,
  pairBluetoothDevice,
  unpairBluetoothDevice
}

