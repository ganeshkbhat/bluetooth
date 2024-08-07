


const { exec } = require('child_process');

// Function to execute a command
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

// Identify Bluetooth Devices
function listBluetoothDevices() {
  const command = `powershell "Get-PnpDevice -Class Bluetooth"`;
  executeCommand(command, (output) => {
    console.log('Bluetooth Devices:');
    console.log(output);
  });
}

// Enable Bluetooth
function enableBluetooth() {
  const command = `powershell "Start-Service bthserv"`;
  executeCommand(command, (output) => {
    console.log('Bluetooth enabled');
  });
}

// Disable Bluetooth
function disableBluetooth() {
  const command = `powershell "Stop-Service bthserv"`;
  executeCommand(command, (output) => {
    console.log('Bluetooth disabled');
  });
}

// Pair with a Bluetooth Device
function pairBluetoothDevice(deviceId) {
  const command = `powershell "Add-BluetoothDevice -DeviceAddress ${deviceId}"`;
  executeCommand(command, (output) => {
    console.log(`Paired with device: ${deviceId}`);
  });
}

// Unpair with a Bluetooth Device
function unpairBluetoothDevice(deviceId) {
  const command = `powershell "Remove-BluetoothDevice -DeviceAddress ${deviceId}"`;
  executeCommand(command, (output) => {
    console.log(`Unpaired with device: ${deviceId}`);
  });
}

// // Example usage
// listBluetoothDevices();
// enableBluetooth();
// // Replace 'DEVICE_ID' with the actual Bluetooth device ID
// pairBluetoothDevice('DEVICE_ID');
// unpairBluetoothDevice('DEVICE_ID');
// disableBluetooth();
