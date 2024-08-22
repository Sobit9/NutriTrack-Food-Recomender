import fs from "fs";

const j = data.sort((a, b) => a[0] - b[0]);

const jsonData = JSON.stringify(j, null, 2);
fs.writeFile("datacheck1.js", jsonData, (err) => {
  if (err) {
    console.error("Error writing file", err);
  } else {
    console.log("File has been saved");
  }
});
