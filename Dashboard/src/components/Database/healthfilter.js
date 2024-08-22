// Import TensorFlow.js library for Node.js with CPU support
import * as tf from "@tensorflow/tfjs";

const modelB = tf.sequential();

// Input layer and first hidden layer with 10 neurons
modelB.add(
  tf.layers.dense({
    inputShape: [2], // 2 input features
    units: 100,
    activation: "relu",
  })
);

modelB.add(
  tf.layers.dense({
    units: 120,
    activation: "relu",
    kernelRegularizer: tf.regularizers.l1l2({ l1: 0.01, l2: 0.01 }),
  })
);

modelB.add(
  tf.layers.dense({
    units: 100,
    activation: "relu",
  })
);

modelB.add(
  tf.layers.dense({
    units: 86,
    activation: "relu",
    kernelRegularizer: tf.regularizers.l1l2({ l1: 0.01, l2: 0.01 }),
  })
);

modelB.add(
  tf.layers.dense({
    units: 68,
    activation: "relu",
  })
);
modelB.add(
  tf.layers.dropout({
    rate: 0.3,
  })
);

modelB.add(
  tf.layers.dense({
    units: 54,
    activation: "relu",
  })
);

modelB.add(
  tf.layers.dense({
    units: 38,
    activation: "relu",
    kernelRegularizer: tf.regularizers.l1l2({ l1: 0.01, l2: 0.01 }),
  })
);

modelB.add(
  tf.layers.dense({
    units: 19,
    activation: "relu",
  })
);

modelB.add(
  tf.layers.dense({
    units: 12,
    activation: "relu",
  })
);

modelB.add(
  tf.layers.dense({
    units: 6,
    activation: "relu",
  })
);

// Output layer with 3 neurons for ternary classification
modelB.add(
  tf.layers.dense({
    units: 1,
    activation: "sigmoid", // Softmax activation function for classification
  })
);

modelB.compile({
  optimizer: tf.train.adam(), // Adam optimizer
  loss: "binaryCrossentropy", // Categorical cross-entropy loss function
  metrics: ["accuracy"], // Track accuracy during training
});

const trainigdata = [];

console.log(trainigdata.length);
const td35 = trainigdata.map((subArray) => [subArray[0], subArray[1]]);
const td25 = trainigdata.map((subArray) => [subArray[0], subArray[2]]);
const td40 = trainigdata.map((subArray) => [subArray[0], subArray[3]]);

let j, k;

let x35_1 = [];
let x25_1 = [];
let x40_1 = [];
let x35_0 = [];
let x25_0 = [];
let x40_0 = [];

let x35i = [];
let x35j = [];
let x25i = [];
let x25j = [];
let x40i = [];
let x40j = [];

const datainput2 = (a, b, c) => {
  for (let i = 98; i <= 100; i = i + 0.5) {
    j = a.map((subArray) => [
      subArray[0],
      parseFloat((subArray[1] * (i / 100)).toFixed(1)),
    ]);
    if (!b.includes(j)) {
      b.push(j);
    }
    // b.pop(j);
  }

  for (let i = 102; i >= 101; i = i - 0.5) {
    k = a.map((subArray) => [
      subArray[0],
      parseFloat((subArray[1] * (i / 100)).toFixed(1)),
    ]);
    if (!c.includes(k)) {
      c.push(k);
    }
    // c.pop(k);
  }
};

const datainput = (a, b, c) => {
  for (let i = 90; i >= 0; i = i - 40) {
    j = a.map((subArray) => [
      subArray[0],
      parseFloat((subArray[1] * (i / 100)).toFixed(1)),
    ]);
    if (!b.includes(j)) {
      b.push(j);
    }
    // b.pop(j);
  }
  for (let i = 110; i <= 200; i = i + 40) {
    k = a.map((subArray) => [
      subArray[0],
      parseFloat((subArray[1] * (i / 100)).toFixed(1)),
    ]);
    if (!c.includes(k)) {
      c.push(k);
    }
    // c.pop(k);
  }
};

datainput2(td35, x35_1, x35_0);
datainput2(td25, x25_1, x25_0);
datainput2(td40, x40_1, x40_0);

datainput(td35, x35i, x35j);
datainput(td25, x25i, x25j);
datainput(td40, x40i, x40j);

const xss35 = x35_1
  .flat(1)
  .concat(
    x35_0.flat(1),
    x35_1.flat(1),
    x35_0.flat(1),
    x35i.flat(1),
    x35j.flat(1)
  );
const xss25 = x25_1
  .flat(1)
  .concat(
    x25_0.flat(1),
    x25_1.flat(1),
    x25_0.flat(1),
    x25i.flat(1),
    x25j.flat(1)
  );
const xss40 = x40_1
  .flat(1)
  .concat(
    x40_0.flat(1),
    x40_1.flat(1),
    x40_0.flat(1),
    x40i.flat(1),
    x40j.flat(1)
  );

console.log(x35_0.flat(1).length, x35_1.flat(1).length);
console.log(x35i.flat(1).length, x35j.flat(1).length);

const y1 = Array(720).fill([1]);
const y0 = Array(270).fill([0]);

const yss35 = y1.concat(y0);
const yss25 = y1.concat(y0);
const yss40 = y1.concat(y0);

console.log(xss35.length, xss25.length, xss40.length);
console.log(yss35.length, yss25.length, yss40.length);

// // training data
const xs35 = tf.tensor2d(xss35);
const ys35 = tf.tensor2d(yss35);

// const xs25 = tf.tensor2d(xss25);
// const ys25 = tf.tensor2d(yss25);
// const xs40 = tf.tensor2d(xss40);
// const ys40 = tf.tensor2d(yss40);

async function trainModel1() {
  await modelB.fit(xs35, ys35, {
    epochs: 1000, // Reduced epochs for faster experimentation
    batchSize: 64, // Reduced batch size for more frequent updates
    validationSplit: 0.2, // Use 20% for validation
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
trainModel1();

// // Predict on new data
// const newData = tf.tensor2d([[3000, 1400]]);
// const prediction = modelB.predict(newData);
// prediction.print(); // Print the raw prediction probabilities

// const predictedClass = prediction.argMax(-1).dataSync()[0];
// console.log(`Predicted class: ${predictedClass}`);

// connectDB();
