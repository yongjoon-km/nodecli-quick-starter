import figlet from "figlet";

function renderLogo(text) {
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
    });
  });
}

export default renderLogo;
