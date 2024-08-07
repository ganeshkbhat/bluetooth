




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
function listPairedDevices() {
  const command = 'blueutil --paired';
  const result = executeCommand(command);
  console.log(`Paired Devices:\n${result}`);
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

// // Example usage
// getBluetoothStatus();
// turnBluetoothOn();
// listPairedDevices();
// // pairWithDevice('XX-XX-XX-XX-XX-XX'); // Replace with actual device address
// // unpairDevice('XX-XX-XX-XX-XX-XX'); // Replace with actual device address
// turnBluetoothOff();

