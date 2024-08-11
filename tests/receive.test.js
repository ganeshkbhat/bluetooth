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

const chai = require('chai');
const sinon = require('sinon');
const { execSync } = require('child_process');
const receiveData = require('../receiveData');

const { expect } = chai;

describe('receiveData', function() {
  let execSyncStub;

  beforeEach(function() {
    execSyncStub = sinon.stub(execSync);
  });

  afterEach(function() {
    sinon.restore();
  });

  it('should bind the RFCOMM channel correctly', function() {
    const deviceAddress = 'XX:XX:XX:XX:XX:XX';
    const channel = 1;
    const bindCommand = `rfcomm bind 0 ${deviceAddress} ${channel}`;

    receiveData(deviceAddress, channel);

    expect(execSyncStub.calledWith(bindCommand)).to.be.true;
  });

  it('should execute the correct command to listen for data', function() {
    const catCommand = 'cat /dev/rfcomm0';

    receiveData('XX:XX:XX:XX:XX:XX');

    expect(execSyncStub.calledWith(catCommand)).to.be.true;
  });

  it('should log a success message when listening for data', function() {
    const consoleLogStub = sinon.stub(console, 'log');

    const deviceAddress = 'XX:XX:XX:XX:XX:XX';

    receiveData(deviceAddress);

    expect(consoleLogStub.calledOnceWithExactly(`Listening for data from ${deviceAddress} on channel 1`)).to.be.true;

    consoleLogStub.restore();
  });

  it('should log an error message if the command fails', function() {
    const consoleErrorStub = sinon.stub(console, 'error');

    execSyncStub.throws(new Error('Command failed'));

    receiveData('XX:XX:XX:XX:XX:XX');

    expect(consoleErrorStub.calledOnceWithMatch(/Failed to receive data/)).to.be.true;

    consoleErrorStub.restore();
  });

  it('should release the RFCOMM channel after use', function() {
    const releaseCommand = `rfcomm release 0`;

    receiveData('XX:XX:XX:XX:XX:XX');

    expect(execSyncStub.calledWith(releaseCommand)).to.be.true;
  });
});
