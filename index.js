#!/usr/bin/env node

import figlet from "figlet";

import chalkAnimation from "chalk-animation";
import axios from "axios";
import path, { resolve } from "path";
import fs from "fs";
import chalk from "chalk";
import admZip from "adm-zip";
import { program } from "commander";

// dependencies https://start.spring.io/dependencies

program.option("-n, --name <name>", "name of the project");

program.parse();

const options = program.opts();

function startFiglet(text) {
  return new Promise((res, rej) => {
    figlet(text, (err, data) => {
      if (err) {
        console.log("Oops... something went wrong...");
        console.dir(err);
        rej("error");
        return;
      }
      console.log(data);
      res("done");
      return;
    });
  });
}

try {
  await startFiglet("Starter");
} catch {
  console.log("error");
}

const projectName = options.name ? options.name : "demo";
const zipFileName = "starter.zip";

// parameeter for spring initializer
const baseDir = projectName;
const groupId = "com.example";
const artifactId = projectName;
const name = projectName;
const packageName = `${groupId}/${artifactId}`;

chalkAnimation.rainbow("Installing...").start();

const response = await axios({
  method: "GET",
  url: `https://start.spring.io/${zipFileName}`,
  params: { groupId, baseDir, artifactId, name, packageName },
  responseType: "stream",
});

const zipFilePath = path.resolve(process.cwd(), ".", zipFileName);
const writeStream = response.data.pipe(fs.createWriteStream(zipFilePath));

function download(writeStream) {
  return new Promise((res, rej) => {
    writeStream.on("finish", () => {
      res("done");
    });
    writeStream.on("error", (error) => {
      console.log(error);
      rej("error");
    });
  });
}

await download(writeStream);
console.log(`${zipFileName} is installed`);

const unzipper = new admZip(zipFileName);
chalkAnimation.rainbow("Unzipping...").start();
unzipper.extractAllTo(".", true);
console.log("finished unzip");
fs.unlink(zipFilePath, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`removed ${zipFileName}`);
});
