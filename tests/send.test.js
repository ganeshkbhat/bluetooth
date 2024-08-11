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
const sendFile = require('../sendFile');

const { expect } = chai;

describe('sendFile', function () {
    let execSyncStub;

    beforeEach(function () {
        execSyncStub = sinon.stub(execSync);
    });

    afterEach(function () {
        sinon.restore();
    });

    it('should execute the correct command to send a file', function () {
        const deviceAddress = 'XX:XX:XX:XX:XX:XX';
        const filePath = '/path/to/your/file.txt';
        const command = `bluetooth-sendto --device=${deviceAddress} ${filePath}`;

        sendFile(deviceAddress, filePath);

        expect(execSyncStub.calledOnceWithExactly(command)).to.be.true;
    });

    it('should log a success message when the file is sent successfully', function () {
        const consoleLogStub = sinon.stub(console, 'log');

        const deviceAddress = 'XX:XX:XX:XX:XX:XX';
        const filePath = '/path/to/your/file.txt';

        sendFile(deviceAddress, filePath);

        expect(consoleLogStub.calledOnceWithExactly(`File sent to ${deviceAddress}`)).to.be.true;

        consoleLogStub.restore();
    });

    it('should log an error message when the command fails', function () {
        const consoleErrorStub = sinon.stub(console, 'error');

        execSyncStub.throws(new Error('Command failed'));

        const deviceAddress = 'XX:XX:XX:XX:XX:XX';
        const filePath = '/path/to/your/file.txt';

        sendFile(deviceAddress, filePath);

        expect(consoleErrorStub.calledOnceWithMatch(/Failed to send file/)).to.be.true;

        consoleErrorStub.restore();
    });
});
