#!/usr/bin/env node

import figlet from 'figlet';

import chalkAnimation from 'chalk-animation';
import axios from 'axios';
import path, { resolve } from 'path';
import fs from 'fs';
import chalk from 'chalk';

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

const rainbow = chalkAnimation.rainbow('Installing...');
rainbow.start();

const response = await axios({
    method: 'GET',
    url: 'https://start.spring.io/starter.zip',
    responseType: 'stream'
})

const localFilePath = path.resolve(process.cwd(), '.', 'starter.zip');
const writeStream = response.data.pipe(fs.createWriteStream(localFilePath))

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
console.log('starter.zip is installed');
