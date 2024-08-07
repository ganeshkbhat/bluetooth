


const { exec } = require('child_process');

function listDevices(callback) {
  exec('bluetoothctl devices', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error listing devices: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    const devices = stdout.trim().split('\n').map(line => {
      const [_, mac, ...nameParts] = line.split(' ');
      return { mac, name: nameParts.join(' ') };
    });
    callback(devices);
  });
}

function pairDevice(macAddress, callback) {
  exec(`bluetoothctl pair ${macAddress}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error pairing with device ${macAddress}: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    callback(stdout.trim());
  });
}

function unpairDevice(macAddress, callback) {
  exec(`bluetoothctl remove ${macAddress}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error unpairing with device ${macAddress}: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    callback(stdout.trim());
  });
}

function openBluetooth(callback) {
  exec('rfkill unblock bluetooth', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error enabling Bluetooth: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    callback(stdout.trim());
  });
}

function closeBluetooth(callback) {
  exec('rfkill block bluetooth', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error disabling Bluetooth: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    callback(stdout.trim());
  });
}

listDevices(devices => { console.log('Available devices:', devices); });
pairDevice('XX:XX:XX:XX:XX:XX', result => { console.log('Pairing result:', result); });
unpairDevice('XX:XX:XX:XX:XX:XX', result => { console.log('Unpairing result:', result); });
openBluetooth(result => { console.log('Bluetooth enabled:', result); });
closeBluetooth(result => { console.log('Bluetooth disabled:', result); });

