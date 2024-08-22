let originalArray = [
  [805, 45, 75, 1000, 10, 0, 1, 0],
  [805, 45, 75, 1000, 8, 0, 1, 0],
  [805, 45, 75, 1000, 11, 0, 1, 0],
  [805, 45, 75, 900, 10, 0, 1, 0],
  [805, 45, 75, 900, 8, 0, 1, 0],
  [805, 45, 75, 900, 11, 0, 1, 0],
  [805, 45, 75, 800, 10, 0, 1, 0],
  [805, 45, 75, 800, 8, 0, 1, 0],
  [805, 45, 75, 800, 11, 0, 1, 0],
  [805, 45, 75, 700, 10, 0, 1, 0],
  [805, 45, 75, 700, 8, 0, 1, 0],
  [805, 45, 75, 700, 11, 0, 1, 0],
  [805, 40, 75, 1000, 10, 0, 1, 0],
  [805, 40, 75, 1000, 8, 0, 1, 0],
  [805, 40, 75, 1000, 11, 0, 1, 0],
  [805, 40, 75, 900, 10, 0, 1, 0],
  [805, 40, 75, 900, 8, 0, 1, 0],
  [805, 40, 75, 900, 11, 0, 1, 0],
  [805, 40, 75, 800, 10, 0, 1, 0],
  [805, 40, 75, 800, 8, 0, 1, 0],
  [805, 40, 75, 800, 11, 0, 1, 0],
  [805, 40, 75, 700, 10, 0, 1, 0],
  [805, 40, 75, 700, 8, 0, 1, 0],
  [805, 40, 75, 700, 11, 0, 1, 0],
  [805, 55, 75, 1000, 10, 0, 1, 0],
  [805, 55, 75, 1000, 8, 0, 1, 0],
  [805, 55, 75, 1000, 11, 0, 1, 0],
  [805, 55, 75, 900, 10, 0, 1, 0],
  [805, 55, 75, 900, 8, 0, 1, 0],
  [805, 55, 75, 900, 11, 0, 1, 0],
  [805, 55, 75, 800, 10, 0, 1, 0],
  [805, 55, 75, 800, 8, 0, 1, 0],
  [805, 55, 75, 800, 11, 0, 1, 0],
  [805, 55, 75, 700, 10, 0, 1, 0],
  [805, 55, 75, 700, 8, 0, 1, 0],
  [805, 55, 75, 700, 11, 0, 1, 0],
  [855, 45, 75, 1000, 10, 0, 1, 0],
  [855, 45, 75, 1000, 8, 0, 1, 0],
  [855, 45, 75, 1000, 11, 0, 1, 0],
  [855, 45, 75, 900, 10, 0, 1, 0],
  [855, 45, 75, 900, 8, 0, 1, 0],
  [855, 45, 75, 900, 11, 0, 1, 0],
  [855, 45, 75, 800, 10, 0, 1, 0],
  [855, 45, 75, 800, 8, 0, 1, 0],
  [855, 45, 75, 800, 11, 0, 1, 0],
  [855, 45, 75, 700, 10, 0, 1, 0],
  [855, 45, 75, 700, 8, 0, 1, 0],
  [855, 45, 75, 700, 11, 0, 1, 0],
  [855, 40, 75, 1000, 10, 0, 1, 0],
  [855, 40, 75, 1000, 8, 0, 1, 0],
  [855, 40, 75, 1000, 11, 0, 1, 0],
  [855, 40, 75, 900, 10, 0, 1, 0],
  [855, 40, 75, 900, 8, 0, 1, 0],
  [855, 40, 75, 900, 11, 0, 1, 0],
  [855, 40, 75, 800, 10, 0, 1, 0],
  [855, 40, 75, 800, 8, 0, 1, 0],
  [855, 40, 75, 800, 11, 0, 1, 0],
  [855, 40, 75, 700, 10, 0, 1, 0],
  [855, 40, 75, 700, 8, 0, 1, 0],
  [855, 40, 75, 700, 11, 0, 1, 0],
  [855, 55, 75, 1000, 10, 0, 1, 0],
  [855, 55, 75, 1000, 8, 0, 1, 0],
  [855, 55, 75, 1000, 11, 0, 1, 0],
  [855, 55, 75, 900, 10, 0, 1, 0],
  [855, 55, 75, 900, 8, 0, 1, 0],
  [855, 55, 75, 900, 11, 0, 1, 0],
  [855, 55, 75, 800, 10, 0, 1, 0],
  [855, 55, 75, 800, 8, 0, 1, 0],
  [855, 55, 75, 800, 11, 0, 1, 0],
  [855, 55, 75, 700, 10, 0, 1, 0],
  [855, 55, 75, 700, 8, 0, 1, 0],
  [855, 55, 75, 700, 11, 0, 1, 0],
  [905, 45, 75, 1000, 10, 0, 1, 0],
  [905, 45, 75, 1000, 8, 0, 1, 0],
  [905, 45, 75, 1000, 11, 0, 1, 0],
  [905, 45, 75, 900, 10, 0, 1, 0],
  [905, 45, 75, 900, 8, 0, 1, 0],
  [905, 45, 75, 900, 11, 0, 1, 0],
  [905, 45, 75, 800, 10, 0, 1, 0],
  [905, 45, 75, 800, 8, 0, 1, 0],
  [905, 45, 75, 800, 11, 0, 1, 0],
  [905, 45, 75, 700, 10, 0, 1, 0],
  [905, 45, 75, 700, 8, 0, 1, 0],
  [905, 45, 75, 700, 11, 0, 1, 0],
  [905, 40, 75, 1000, 10, 0, 1, 0],
  [905, 40, 75, 1000, 8, 0, 1, 0],
  [905, 40, 75, 1000, 11, 0, 1, 0],
  [905, 40, 75, 900, 10, 0, 1, 0],
  [905, 40, 75, 900, 8, 0, 1, 0],
  [905, 40, 75, 900, 11, 0, 1, 0],
  [905, 40, 75, 800, 10, 0, 1, 0],
  [905, 40, 75, 800, 8, 0, 1, 0],
  [905, 40, 75, 800, 11, 0, 1, 0],
  [905, 40, 75, 700, 10, 0, 1, 0],
  [905, 40, 75, 700, 8, 0, 1, 0],
  [905, 40, 75, 700, 11, 0, 1, 0],
  [905, 55, 75, 1000, 10, 0, 1, 0],
  [905, 55, 75, 1000, 8, 0, 1, 0],
  [905, 55, 75, 1000, 11, 0, 1, 0],
  [905, 55, 75, 900, 10, 0, 1, 0],
  [905, 55, 75, 900, 8, 0, 1, 0],
  [905, 55, 75, 900, 11, 0, 1, 0],
  [905, 55, 75, 800, 10, 0, 1, 0],
  [905, 55, 75, 800, 8, 0, 1, 0],
  [905, 55, 75, 800, 11, 0, 1, 0],
  [905, 55, 75, 700, 10, 0, 1, 0],
  [905, 55, 75, 700, 8, 0, 1, 0],
  [905, 55, 75, 700, 11, 0, 1, 0],
];

// Function to update the first element
function updateFirstElement(array) {
  // Iterate through each sub-array
  return array.map((subArray) => {
    // If the first element is 1000, change it to 300
    if (subArray[5] === 0) {
      subArray[5] = 1;
    }
    return subArray;
  });
}

// Create a new array with the updated elements
let newArray = updateFirstElement(originalArray);

const fs = require("fs");

const jsonData = JSON.stringify(newArray, null, 2);
fs.writeFile("asper.js", jsonData, (err) => {
  if (err) {
    console.error("Error writing file", err);
  } else {
    console.log("File has been saved");
  }
});
