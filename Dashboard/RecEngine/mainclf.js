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
    inputShape: [2], // 2 input features
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
    units: 6,
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
    units: 4,
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
const xy = trainigdata.map((subArray) => [subArray[0], subArray[2]]);
const xz = trainigdata.map((subArray) => [subArray[0], subArray[3]]);

const x = xx.concat(xy, xz);

const x99array = x.map((subArray) => [subArray[0], subArray[1] * 0.99]);
const x98array = x.map((subArray) => [subArray[0], subArray[1] * 0.98]);
const x97array = x.map((subArray) => [subArray[0], subArray[1] * 0.97]);
const x103array = x.map((subArray) => [subArray[0], subArray[1] * 1.03]);
const x102array = x.map((subArray) => [subArray[0], subArray[1] * 1.02]);
const x101array = x.map((subArray) => [subArray[0], subArray[1] * 1.01]);

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
    epochs: 20000, // Number of training epochs
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
// const newData = tf.tensor2d([[2013, 784]]);
// const prediction = model.predict(newData);
// prediction.print(); // Print the raw prediction probabilities

// const predictedClass = prediction.argMax(-1).dataSync()[0];
// console.log(`Predicted class: ${predictedClass}`);

// connectDB();
