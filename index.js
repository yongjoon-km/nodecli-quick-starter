#!/usr/bin/env node

import figlet from 'figlet';

import chalkAnimation from 'chalk-animation';
import axios from 'axios';
import path from 'path';
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

const rainbow = chalkAnimation.rainbow('Installing...');
rainbow.start();

const response = await axios({
    method: 'GET',
    url: 'https://start.spring.io/starter.zip',
    responseType: 'stream'
})

const localFilePath = path.resolve(process.cwd(), '.', 'starter.zip');
const w = response.data.pipe(fs.createWriteStream(localFilePath))

w.on('finish', () => {
    console.log('DONE');
    console.log('Please check', chalk.green('starter.zip'));
    
    // unzip
});
