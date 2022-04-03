import chalkAnimation from "chalk-animation";
import path from "path";
import fs from "fs";
import admZip from "adm-zip";
import fetchSpringBootInstaller from "../client/springBootFetcher.js";

const SPRING_STARTER_ZIP_FILE = "starter.zip"

async function installSpringBoot(springInitializerParam) {
  const zipFilePath = path.resolve(process.cwd(), ".", SPRING_STARTER_ZIP_FILE);

  chalkAnimation.rainbow("Installing...").start();

  // install starter.zip
  const response = await fetchSpringBootInstaller(springInitializerParam);
  const writeStream = response.data.pipe(fs.createWriteStream(zipFilePath));
  await download(writeStream);

  console.log(`${SPRING_STARTER_ZIP_FILE} is installed`);

  // unzip the starter.zip (extract spring boot source code)
  const unzipper = new admZip(SPRING_STARTER_ZIP_FILE);
  chalkAnimation.rainbow("Unzipping...").start();
  unzipper.extractAllTo(".", true);
  console.log("finished unzip");

  // remove starter.zip
  fs.unlink(zipFilePath, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`removed ${SPRING_STARTER_ZIP_FILE}`);
  });
}

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

export default installSpringBoot;
