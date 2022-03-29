#!/usr/bin/env node

import figlet from 'figlet';

import chalkAnimation from 'chalk-animation';
import axios from 'axios';
import path, { resolve } from 'path';
import fs from 'fs';
import chalk from 'chalk';
import admZip from 'adm-zip'

// dependencies https://start.spring.io/dependencies

function startFiglet(text) {

    return new Promise((res, rej) => {
        figlet(text, (err, data) => {
            if (err) {
                console.log('Oops... something went wrong...');
                console.dir(err);
                rej('error');
                return;
            }
            console.log(data);
            res('done');
            return;
        });
    
    })

}

try {
    await startFiglet('Starter');
} catch {
    console.log('error')
}

// baseDir = demo
// groupId = com.example
// artifactId = demo
// name = demo
// packageName groupId + artifactId

// TODO Recieve name for the project
let projectName = 'demo'
const zipFileName = 'starter.zip'

chalkAnimation.rainbow('Installing...').start()

const response = await axios({
    method: 'GET',
    url: `https://start.spring.io/${zipFileName}`,
    responseType: 'stream'
})

const zipFilePath = path.resolve(process.cwd(), '.', zipFileName);
const writeStream = response.data.pipe(fs.createWriteStream(zipFilePath))

function download(writeStream) {
    return new Promise((res, rej) => {
        writeStream.on('finish', () => {
            res('done')
        })
        writeStream.on('error', (error) => {
            console.log(error)
            rej('error')
        })
    })
}

await download(writeStream)
console.log(`${zipFileName} is installed`);

const unzipper = new admZip(zipFileName);
chalkAnimation.rainbow('Unzipping...').start()
unzipper.extractAllTo(projectName, true);
console.log('finished unzip');
fs.unlink(zipFilePath, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(`removed ${zipFileName}`)
});
