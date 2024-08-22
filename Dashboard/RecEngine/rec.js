// // Import TensorFlow.js library for Node.js with CPU support
// // const tf = require("@tensorflow/tfjs-node");
// import * as tf from "@tensorflow/tfjs";
// // import "@tensorflow/tfjs-backend-webgl";

// // import "@tensorflow/tfjs-backend-webgpu";
// // tf.setBackend("webgl");

// import connectDB from "./db.cjs";

// // Define the model
// const model = tf.sequential();
// // tf.setBackend("webgl");

// // Input layer and first hidden layer with 10 neurons
// model.add(
//   tf.layers.dense({
//     inputShape: [2], // 10 input features
//     units: 2,
//     activation: "relu", // ReLU activation function
//   })
// );
// model.add(
//   tf.layers.dense({
//     units: 8,
//     activation: "relu", // ReLU activation function
//   })
// );

// model.add(
//   tf.layers.dense({
//     units: 7,
//     activation: "relu", // ReLU activation function
//   })
// );
// model.add(
//   tf.layers.dense({
//     units: 6,
//     activation: "relu", // ReLU activation function
//   })
// );
// model.add(
//   tf.layers.dense({
//     units: 6,
//     activation: "relu", // ReLU activation function
//   })
// );
// model.add(
//   tf.layers.dense({
//     units: 5,
//     activation: "relu", // ReLU activation function
//   })
// );
// model.add(
//   tf.layers.dense({
//     units: 5,
//     activation: "relu", // ReLU activation function
//   })
// );
// model.add(
//   tf.layers.dense({
//     units: 5,
//     activation: "relu", // ReLU activation function
//   })
// );
// model.add(
//   tf.layers.dense({
//     units: 4,
//     activation: "relu", // ReLU activation function
//   })
// );
// model.add(
//   tf.layers.dense({
//     units: 4,
//     activation: "relu", // ReLU activation function
//   })
// );

// // Output layer with 3 neurons for ternary classification
// model.add(
//   tf.layers.dense({
//     units: 3,
//     activation: "softmax", // Softmax activation function for classification
//   })
// );

// // Compile the model
// model.compile({
//   optimizer: tf.train.adam(), // Adam optimizer
//   loss: "categoricalCrossentropy", // Categorical cross-entropy loss function
//   metrics: ["accuracy"], // Track accuracy during training
// });

// const x = [
//   [1300, 455],
//   [1350, 472],
//   [1400, 490],
//   [1450, 507],
//   [1500, 525],
//   [1550, 542],
//   [1600, 560],
//   [1650, 577],
//   [1700, 595],
//   [1750, 612],
//   [1800, 630],
//   [1850, 647],
//   [1900, 665],
//   [1950, 682],
//   [2000, 700],
//   [2050, 717],
//   [2100, 735],
//   [2150, 752],
//   [2200, 770],
//   [2250, 787],
//   [2300, 805],
//   [2350, 822],
//   [2400, 840],
//   [2450, 857],
//   [2500, 875],
//   [2550, 892],
//   [2600, 910],
//   [2650, 927],
//   [2700, 945],
//   [2750, 962],
//   [2800, 980],
//   [2850, 997],
//   [2900, 1015],
//   [2950, 1032],
//   [3000, 1050],
//   [3050, 1067],
//   [3100, 1085],
//   [3150, 1102],
//   [3200, 1120],
//   [3250, 1137],
//   [3300, 1155],
//   [3350, 1172],
//   [3400, 1190],
//   [3450, 1207],
//   [3500, 1225],
//   [1300, 325],
//   [1350, 337],
//   [1400, 350],
//   [1450, 362],
//   [1500, 375],
//   [1550, 387],
//   [1600, 400],
//   [1650, 412],
//   [1700, 425],
//   [1750, 437],
//   [1800, 450],
//   [1850, 462],
//   [1900, 475],
//   [1950, 487],
//   [2000, 500],
//   [2050, 512],
//   [2100, 525],
//   [2150, 537],
//   [2200, 550],
//   [2250, 562],
//   [2300, 575],
//   [2350, 587],
//   [2400, 600],
//   [2450, 612],
//   [2500, 625],
//   [2550, 637],
//   [2600, 650],
//   [2650, 662],
//   [2700, 675],
//   [2750, 687],
//   [2800, 700],
//   [2850, 712],
//   [2900, 725],
//   [2950, 737],
//   [3000, 750],
//   [3050, 762],
//   [3100, 775],
//   [3150, 787],
//   [3200, 800],
//   [3250, 812],
//   [3300, 825],
//   [3350, 837],
//   [3400, 850],
//   [3450, 862],
//   [3500, 875],
//   [1300, 520],
//   [1350, 540],
//   [1400, 560],
//   [1450, 580],
//   [1500, 600],
//   [1550, 620],
//   [1600, 640],
//   [1650, 660],
//   [1700, 680],
//   [1750, 700],
//   [1800, 720],
//   [1850, 740],
//   [1900, 760],
//   [1950, 780],
//   [2000, 800],
//   [2050, 820],
//   [2100, 840],
//   [2150, 860],
//   [2200, 880],
//   [2250, 900],
//   [2300, 920],
//   [2350, 940],
//   [2400, 960],
//   [2450, 980],
//   [2500, 1000],
//   [2550, 1020],
//   [2600, 1040],
//   [2650, 1060],
//   [2700, 1080],
//   [2750, 1100],
//   [2800, 1120],
//   [2850, 1140],
//   [2900, 1160],
//   [2950, 1180],
//   [3000, 1200],
//   [3050, 1220],
//   [3100, 1240],
//   [3150, 1260],
//   [3200, 1280],
//   [3250, 1300],
//   [3300, 1320],
//   [3350, 1340],
//   [3400, 1360],
//   [3450, 1380],
//   [3500, 1400], // [100,010,001]
// ];

// const x98array = x.map((subArray) => [subArray[0], subArray[1] * 0.98]);

// const x97array = x.map((subArray) => [subArray[0], subArray[1] * 0.97]);

// const x96array = x.map((subArray) => [subArray[0], subArray[1] * 0.96]);

// const x95array = x.map((subArray) => [subArray[0], subArray[1] * 0.95]);

// const x105array = x.map((subArray) => [subArray[0], subArray[1] * 1.05]);

// const x104array = x.map((subArray) => [subArray[0], subArray[1] * 1.04]);

// const x103array = x.map((subArray) => [subArray[0], subArray[1] * 1.03]);

// const x102array = x.map((subArray) => [subArray[0], subArray[1] * 1.02]);

// const y1 = Array(45).fill([1, 0, 0]);
// const y2 = Array(45).fill([0, 1, 0]);
// const y3 = Array(45).fill([0, 0, 1]);

// const y = y1.concat(y2, y3);

// const yss = y.concat(y, y, y, y, y, y, y, y);

// const xss = x.concat(
//   x98array,
//   x97array,
//   x96array,
//   x95array,
//   x105array,
//   x104array,
//   x103array,
//   x102array
// );

// // training data
// const xs = tf.tensor2d(xss);
// const ys = tf.tensor2d(yss);

// // Train the model
// async function trainModel() {
//   await model.fit(xs, ys, {
//     epochs: 2000, // Number of training epochs
//     batchSize: 60, // Batch size
//     validationSplit: 0.2, // Split 20% of data for validation
//     callbacks: {
//       onEpochEnd: (epoch, logs) => {
//         console.log(
//           `Epoch ${epoch}: loss = ${logs.loss}, accuracy = ${logs.acc}`
//         );
//       },
//     },
//   });
//   console.log("Model training complete.");
// }

// console.log("Model training started...");

// // Call the training function
// trainModel();

// // // Predict on new data
// // const newData = tf.tensor2d([[1500, 490]]);
// // const prediction = model.predict(newData);
// // prediction.print(); // Print the raw prediction probabilities

// // const predictedClass = prediction.argMax(-1).dataSync()[0];
// // console.log(`Predicted class: ${predictedClass}`);

// // connectDB();

//td 2
//td 3

//

// Import TensorFlow.js library for Node.js with CPU support
// const tf = require("@tensorflow/tfjs-node");
import * as tf from "@tensorflow/tfjs";
// import "@tensorflow/tfjs-backend-webgl";

// import "@tensorflow/tfjs-backend-webgpu";
// tf.setBackend("webgl");

import connectDB from "./db.cjs";

// Define the model
const model = tf.sequential();
// tf.setBackend("webgl");

// Input layer and first hidden layer with 10 neurons
model.add(
  tf.layers.dense({
    inputShape: [2], // 10 input features
    units: 2,
    activation: "relu", // ReLU activation function
  })
);
model.add(
  tf.layers.dense({
    units: 8,
    activation: "relu", // ReLU activation function
  })
);

model.add(
  tf.layers.dense({
    units: 7,
    activation: "relu", // ReLU activation function
  })
);
model.add(
  tf.layers.dense({
    units: 6,
    activation: "relu", // ReLU activation function
  })
);
model.add(
  tf.layers.dense({
    units: 6,
    activation: "relu", // ReLU activation function
  })
);
model.add(
  tf.layers.dense({
    units: 5,
    activation: "relu", // ReLU activation function
  })
);
model.add(
  tf.layers.dense({
    units: 5,
    activation: "relu", // ReLU activation function
  })
);
model.add(
  tf.layers.dense({
    units: 5,
    activation: "relu", // ReLU activation function
  })
);
model.add(
  tf.layers.dense({
    units: 4,
    activation: "relu", // ReLU activation function
  })
);
model.add(
  tf.layers.dense({
    units: 4,
    activation: "relu", // ReLU activation function
  })
);

// Output layer with 3 neurons for ternary classification
model.add(
  tf.layers.dense({
    units: 3,
    activation: "softmax", // Softmax activation function for classification
  })
);

// Compile the model
model.compile({
  optimizer: tf.train.adam(), // Adam optimizer
  loss: "categoricalCrossentropy", // Categorical cross-entropy loss function
  metrics: ["accuracy"], // Track accuracy during training
});

const x = [
  [1300, 455],
  [1350, 472],
  [1400, 490],
  [1450, 507],
  [1500, 525],
  [1550, 542],
  [1600, 560],
  [1650, 577],
  [1700, 595],
  [1750, 612],
  [1800, 630],
  [1850, 647],
  [1900, 665],
  [1950, 682],
  [2000, 700],
  [2050, 717],
  [2100, 735],
  [2150, 752],
  [2200, 770],
  [2250, 787],
  [2300, 805],
  [2350, 822],
  [2400, 840],
  [2450, 857],
  [2500, 875],
  [2550, 892],
  [2600, 910],
  [2650, 927],
  [2700, 945],
  [2750, 962],
  [2800, 980],
  [2850, 997],
  [2900, 1015],
  [2950, 1032],
  [3000, 1050],
  [3050, 1067],
  [3100, 1085],
  [3150, 1102],
  [3200, 1120],
  [3250, 1137],
  [3300, 1155],
  [3350, 1172],
  [3400, 1190],
  [3450, 1207],
  [3500, 1225],
  [1300, 325],
  [1350, 337],
  [1400, 350],
  [1450, 362],
  [1500, 375],
  [1550, 387],
  [1600, 400],
  [1650, 412],
  [1700, 425],
  [1750, 437],
  [1800, 450],
  [1850, 462],
  [1900, 475],
  [1950, 487],
  [2000, 500],
  [2050, 512],
  [2100, 525],
  [2150, 537],
  [2200, 550],
  [2250, 562],
  [2300, 575],
  [2350, 587],
  [2400, 600],
  [2450, 612],
  [2500, 625],
  [2550, 637],
  [2600, 650],
  [2650, 662],
  [2700, 675],
  [2750, 687],
  [2800, 700],
  [2850, 712],
  [2900, 725],
  [2950, 737],
  [3000, 750],
  [3050, 762],
  [3100, 775],
  [3150, 787],
  [3200, 800],
  [3250, 812],
  [3300, 825],
  [3350, 837],
  [3400, 850],
  [3450, 862],
  [3500, 875],
  [1300, 520],
  [1350, 540],
  [1400, 560],
  [1450, 580],
  [1500, 600],
  [1550, 620],
  [1600, 640],
  [1650, 660],
  [1700, 680],
  [1750, 700],
  [1800, 720],
  [1850, 740],
  [1900, 760],
  [1950, 780],
  [2000, 800],
  [2050, 820],
  [2100, 840],
  [2150, 860],
  [2200, 880],
  [2250, 900],
  [2300, 920],
  [2350, 940],
  [2400, 960],
  [2450, 980],
  [2500, 1000],
  [2550, 1020],
  [2600, 1040],
  [2650, 1060],
  [2700, 1080],
  [2750, 1100],
  [2800, 1120],
  [2850, 1140],
  [2900, 1160],
  [2950, 1180],
  [3000, 1200],
  [3050, 1220],
  [3100, 1240],
  [3150, 1260],
  [3200, 1280],
  [3250, 1300],
  [3300, 1320],
  [3350, 1340],
  [3400, 1360],
  [3450, 1380],
  [3500, 1400], // [100,010,001]
];

const x98array = x.map((subArray) => [subArray[0], subArray[1] * 0.98]);

const x97array = x.map((subArray) => [subArray[0], subArray[1] * 0.97]);

const x96array = x.map((subArray) => [subArray[0], subArray[1] * 0.96]);

const x95array = x.map((subArray) => [subArray[0], subArray[1] * 0.95]);

const x105array = x.map((subArray) => [subArray[0], subArray[1] * 1.05]);

const x104array = x.map((subArray) => [subArray[0], subArray[1] * 1.04]);

const x103array = x.map((subArray) => [subArray[0], subArray[1] * 1.03]);

const x102array = x.map((subArray) => [subArray[0], subArray[1] * 1.02]);

const y1 = Array(45).fill([1, 0, 0]);
const y2 = Array(45).fill([0, 1, 0]);
const y3 = Array(45).fill([0, 0, 1]);

const y = y1.concat(y2, y3);

const yss = y.concat(y, y, y, y, y, y, y, y);

const xss = x.concat(
  x98array,
  x97array,
  x96array,
  x95array,
  x105array,
  x104array,
  x103array,
  x102array
);

// training data
const xs = tf.tensor2d(xss);
const ys = tf.tensor2d(yss);

// Train the model
async function trainModel() {
  await model.fit(xs, ys, {
    epochs: 4000, // Number of training epochs
    batchSize: 30, // Batch size
    validationSplit: 0.1, // Split 10% of data for validation
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(
          `Epoch ${epoch}: loss = ${logs.loss}, accuracy = ${logs.acc}`
        );
      },
    },
  });
  console.log("Model training complete.");
}

console.log("Model training started...");

// Call the training function
// trainModel();

// // Predict on new data
// const newData = tf.tensor2d([[1600, 500]]);
// const prediction = model.predict(newData);
// prediction.print(); // Print the raw prediction probabilities

// const predictedClass = prediction.argMax(-1).dataSync()[0];
// console.log(`Predicted class: ${predictedClass}`);

// connectDB();

function newmodel() {
  // Import TensorFlow.js library for Node.js with CPU support

  // Define the model
  const model = tf.sequential();
  // tf.setBackend("webgl");

  // Input layer and first hidden layer with 10 neurons
  model.add(
    tf.layers.dense({
      inputShape: [2], // 10 input features
      units: 6,
      activation: "relu",
    })
  );

  model.add(
    tf.layers.dense({
      units: 12,
      activation: "relu",
    })
  );

  model.add(
    tf.layers.dense({
      units: 10,
      activation: "relu",
    })
  );
  model.add(
    tf.layers.dense({
      units: 9,
      activation: "relu",
    })
  );

  model.add(
    tf.layers.dense({
      units: 8,
      activation: "relu",
    })
  );

  model.add(
    tf.layers.dense({
      units: 8,
      activation: "relu",
    })
  );
  model.add(
    tf.layers.dense({
      units: 10,
      activation: "relu",
    })
  );
  model.add(
    tf.layers.dense({
      units: 7,
      activation: "relu",
    })
  );
  model.add(
    tf.layers.dense({
      units: 6,
      activation: "relu",
    })
  );

  model.add(
    tf.layers.dense({
      units: 8,
      activation: "relu",
    })
  );

  model.add(
    tf.layers.dense({
      units: 5,
      activation: "relu",
    })
  );
  model.add(
    tf.layers.dense({
      units: 4,
      activation: "relu",
    })
  );

  model.add(
    tf.layers.dense({
      units: 6,
      activation: "relu",
    })
  );
  // Output layer with 3 neurons for ternary classification
  model.add(
    tf.layers.dense({
      units: 3,
      activation: "softmax", // Softmax activation function for classification
    })
  );

  // Compile the model
  model.compile({
    optimizer: tf.train.adam(), // Adam optimizer
    loss: "categoricalCrossentropy", // Categorical cross-entropy loss function
    metrics: ["accuracy"], // Track accuracy during training
  });

  const trainigdata = [
    [1300, 455, 325, 520],
    [1400, 490, 350, 560],
    [1500, 525, 375, 600],
    [1600, 560, 400, 640],
    [1700, 595, 425, 680],
    [1800, 630, 450, 720],
    [1900, 665, 475, 760],
    [2000, 700, 500, 800],
    [2100, 735, 525, 840],
    [2200, 770, 550, 880],
    [2300, 805, 575, 920],
    [2400, 840, 600, 960],
    [2500, 875, 625, 1000],
    [2600, 910, 650, 1040],
    [2700, 945, 675, 1080],
    [2800, 980, 700, 1120],
    [2900, 1015, 725, 1160],
    [3000, 1050, 750, 1200],
    [3100, 1085, 775, 1240],
    [3200, 1120, 800, 1280],
    [3300, 1155, 825, 1320],
    [3400, 1190, 850, 1360],
    [3500, 1225, 875, 1400],
  ];

  const xx = trainigdata.map((subArray) => [subArray[0], subArray[1]]);
  const xy = trainigdata.map((subArray) => [subArray[2], subArray[2]]);
  const xz = trainigdata.map((subArray) => [subArray[0], subArray[3]]);

  const x = xx.concat(xy, xz);

  const x99array = x.map((subArray) => [subArray[0], subArray[1] * 0.99]);
  const x98array = x.map((subArray) => [subArray[0], subArray[1] * 0.98]);
  const x97array = x.map((subArray) => [subArray[0], subArray[1] * 0.97]);
  const x103array = x.map((subArray) => [subArray[0], subArray[1] * 1.03]);
  const x102array = x.map((subArray) => [subArray[0], subArray[1] * 1.02]);
  const x101array = x.map((subArray) => [subArray[0], subArray[1] * 1.02]);

  const x95array = x.map((subArray) => [subArray[0], subArray[1] * 0.95]);

  const x90array = x.map((subArray) => [subArray[0], subArray[1] * 0.9]);

  const x80array = x.map((subArray) => [subArray[0], subArray[1] * 0.8]);

  const x70array = x.map((subArray) => [subArray[0], subArray[1] * 0.7]);

  const x105array = x.map((subArray) => [subArray[0], subArray[1] * 1.05]);

  const x110array = x.map((subArray) => [subArray[0], subArray[1] * 1.1]);

  const x120array = x.map((subArray) => [subArray[0], subArray[1] * 1.2]);

  const x130array = x.map((subArray) => [subArray[0], subArray[1] * 1.3]);

  const y1 = Array(23).fill([1, 0, 0]);
  const y2 = Array(23).fill([0, 1, 0]);
  const y3 = Array(23).fill([0, 0, 1]);

  const ty = Array(69 * 8).fill([0, 0, 0]);

  const y = y1.concat(y2, y3);

  const yss = y.concat(y, y, y, y, y, y, ty);

  const xss = x.concat(
    x99array,
    x98array,
    x97array,
    x103array,
    x102array,
    x101array,
    x95array,
    x70array,
    x105array,
    x130array,
    x90array,
    x80array,
    x110array,
    x120array
  );

  // training data
  const xs = tf.tensor2d(xss);
  const ys = tf.tensor2d(yss);

  // Train the model
  async function trainModel() {
    await model.fit(xs, ys, {
      epochs: 2000, // Number of training epochs
      batchSize: 32, // Batch size
      validationSplit: 0.2, // Split 20% of data for validation
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(
            `Epoch ${epoch}: loss = ${logs.loss}, accuracy = ${logs.acc}`
          );
        },
      },
    });
    console.log("Model training complete.");
  }

  console.log("Model training started...");

  // Call the training function
  trainModel();

  // // Predict on new data
  // const newData = tf.tensor2d([[1600, 540]]);
  // const prediction = model.predict(newData);
  // prediction.print(); // Print the raw prediction probabilities

  // const predictedClass = prediction.argMax(-1).dataSync()[0];
  // console.log(`Predicted class: ${predictedClass}`);

  // connectDB();
}
