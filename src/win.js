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
 * Helper function to run a PowerShell command
 *
 * @param {*} command
 * @param {*} callback
 */
function executeCommand(command, callback) {
  exec(`powershell -Command "${command}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing PowerShell command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    callback(error, stdout.trim(), stderr);
  });
}


/**
 * Identify Bluetooth Devices
 *
 */
function listDevices(callback) {
  const command = `Get-PnpDevice -Class Bluetooth`;
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
  const command = `Start-Service bthserv`;
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
  const command = `Stop-Service bthserv`;
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
  const command = `Add-BluetoothDevice -DeviceAddress ${deviceAddress}`;
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
  const command = `Remove-BluetoothDevice -DeviceAddress ${deviceAddress}`;
  executeCommand(command, (error, stdout, stderr) => {
    console.log(`Unpaired with device: ${deviceAddress}`);
    callback(stdout);
  });
}


/**
 * List All Paired Bluetooth Devices
 *
 * @param {*} callback
 */
function listPaired(callback) {
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


/**
 * Check Bluetooth Status
 *
 * @param {*} callback
 */
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


/**
 * Power on Bluetooth
 *
 * @param {*} callback
 */
function powerOn(callback) {
  const command = 'Get-Service bthserv | Start-Service';
  executeCommand(command, callback);
}


/**
 * Power off Bluetooth
 *
 * @param {*} callback
 */
function powerOff(callback) {
  const command = 'Get-Service bthserv | Stop-Service';
  executeCommand(command, callback);
}


/**
 * Set Bluetooth device discoverable on
 *
 * @param {*} callback
 */
function discoverableOn(callback) {
  const command = 'Set-BluetoothDiscoveryMode -Discoverable';
  executeCommand(command, callback);
}


/**
 * Set Bluetooth device discoverable off
 *
 * @param {*} callback
 */
function discoverableOff(callback) {
  const command = 'Set-BluetoothDiscoveryMode -NonDiscoverable';
  executeCommand(command, callback);
}


/**
 * Pair with a Bluetooth device
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function pairDevice(deviceAddress, callback) {
  const command = `Add-BluetoothDevice -Address ${deviceAddress}`;
  executeCommand(command, callback);
}


/**
 * Unpair a Bluetooth device
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function unpairDevice(deviceAddress, callback) {
  const command = `Remove-BluetoothDevice -Address ${deviceAddress}`;
  executeCommand(command, callback);
}


/**
 * Trust a Bluetooth device
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function trustDevice(deviceAddress, callback) {
  const command = `Set-BluetoothDevice -Address ${deviceAddress} -Trusted $true`;
  executeCommand(command, callback);
}


/**
 * Connect to a Bluetooth device
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function connectDevice(deviceAddress, callback) {
  const command = `Connect-BluetoothDevice -Address ${deviceAddress}`;
  executeCommand(command, callback);
}


/**
 * Disconnect from a Bluetooth device
 *
 * @param {*} deviceAddress
 * @param {*} callback
 */
function disconnectDevice(deviceAddress, callback) {
  const command = `Disconnect-BluetoothDevice -Address ${deviceAddress}`;
  executeCommand(command, callback);
}


/**
 * Scan for visible Bluetooth devices
 *
 * @param {*} callback
 */
function listDevices(callback) {
  const command = 'Get-BluetoothDevice | Where-Object {$_.IsVisible}';
  executeCommand(command, callback);
}


/**
 * List all connected Bluetooth devices
 *
 * @param {*} callback
 */
function listConnected(callback) {
  const command = 'Get-BluetoothDevice | Where-Object {$_.Connected}';
  executeCommand(command, callback);
}


/**
 * List all paired Bluetooth devices
 *
 * @param {*} callback
 */
function listPaired(callback) {
  const command = 'Get-BluetoothDevice | Where-Object {$_.Paired}';
  executeCommand(command, callback);
}


/**
 * Agent On
 *
 * @param {*} callback
 */
function agentOn(callback) {
  const command = 'Enable-BluetoothDevice -Agent';
  executeCommand(command, callback);
}


/**
 * Agent Off
 *
 * @param {*} callback
 */
function agentOff(callback) {
  const command = 'Disable-BluetoothDevice -Agent';
  executeCommand(command, callback);
}


/**
 * Start Scanning
 *
 * @param {*} callback
 */
function scanOn(callback) {
  const command = 'Start-BluetoothScan';
  executeCommand(command, callback);
}


/**
 * Stop Scanning
 *
 * @param {*} callback
 */
function scanOff(callback) {
  const command = 'Stop-BluetoothScan';
  executeCommand(command, callback);
}


/**
 * Make Pairable On
 *
 * @param {*} callback
 */
function pairableOn(callback) {
  const command = 'Set-BluetoothPairable -On';
  executeCommand(command, callback);
}


/**
 * Make Pairable Off
 *
 * @param {*} callback
 */
function pairableOff(callback) {
  const command = 'Set-BluetoothPairable -Off';
  executeCommand(command, callback);
}


/**
 * Check default Bluetooth device
 *
 * @param {*} callback
 */
function defaultDevice(callback) {
  // PowerShell command to get the default audio device and check if it's Bluetooth
  const command = `
      $defaultDevice = Get-WmiObject -Query "SELECT * FROM Win32_SoundDevice WHERE Status='OK'"
      $defaultDevice | Where-Object { $_.ProductName -like "*Bluetooth*" } | Select-Object -ExpandProperty ProductName
  `;
  executeCommand(command, callback);
}

// // Example usage
// defaultDevice((result) => {
//   if (result) { console.log('Default Bluetooth device:', result); } else { console.log('No default Bluetooth device found.'); }
// });

// // Example usage
// agentOn((result) => console.log('Agent turned on:', result));
// agentOff((result) => console.log('Agent turned off:', result));
// scanOn((result) => console.log('Scanning started:', result));
// scanOff((result) => console.log('Scanning stopped:', result));
// pairableOn((result) => console.log('Device is pairable:', result));
// pairableOff((result) => console.log('Device is not pairable:', result));

// // Example usage
// powerOn((result) => console.log('Bluetooth powered on:', result));
// powerOff((result) => console.log('Bluetooth powered off:', result));
// discoverableOn((result) => console.log('Bluetooth set to discoverable:', result));
// discoverableOff((result) => console.log('Bluetooth set to non-discoverable:', result));
// pairDevice('XX:XX:XX:XX:XX:XX', (result) => console.log('Device paired:', result));
// unpairDevice('XX:XX:XX:XX:XX:XX', (result) => console.log('Device unpaired:', result));
// trustDevice('XX:XX:XX:XX:XX:XX', (result) => console.log('Device trusted:', result));
// connectDevice('XX:XX:XX:XX:XX:XX', (result) => console.log('Device connected:', result));
// disconnectDevice('XX:XX:XX:XX:XX:XX', (result) => console.log('Device disconnected:', result));
// listDevices((result) => console.log('Scanned devices:', result));
// listConnected((result) => console.log('Connected devices:', result));
// listPaired((result) => console.log('Paired devices:', result));

// // Example usage
// listDevices();
// turnOn();
// // Replace 'DEVICE_ID' with the actual Bluetooth device ID
// pairDevice('DEVICE_ID');
// unpairDevice('DEVICE_ID');
// listPaired();
// checkStatus();
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
  defaultDevice,
  listPaired,
  listConnected,
  checkStatus
}

