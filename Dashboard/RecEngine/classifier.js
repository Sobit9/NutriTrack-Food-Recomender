// Import TensorFlow.js library for Node.js with CPU support
import * as tf from "@tensorflow/tfjs";

const modelB = tf.sequential();

// Input layer and first hidden layer with 10 neurons
modelB.add(
  tf.layers.dense({
    inputShape: [2], // 2 input features
    units: 600,
    activation: "relu",
  })
);
modelB.add(
  tf.layers.dense({
    units: 600,
    activation: "relu",
    kernelRegularizer: tf.regularizers.l1l2({ l1: 0.01, l2: 0.01 }),
  })
);

modelB.add(
  tf.layers.dense({
    units: 600,
    activation: "relu",
  })
);

modelB.add(
  tf.layers.dense({
    units: 600,
    activation: "relu",
  })
);
modelB.add(
  tf.layers.dropout({
    rate: 0.2,
  })
);
modelB.add(
  tf.layers.dense({
    units: 10,
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

const trainigdata = [
  [1300, 455, 325, 520],
  [1350, 472.5, 337.5, 540],
  [1400, 490, 350, 560],
  [1450, 507.5, 362.5, 580],
  [1500, 525, 375, 600],
  [1550, 542.5, 387.5, 620],
  [1600, 560, 400, 640],
  [1650, 577.5, 412.5, 660],
  [1700, 595, 425, 680],
  [1750, 612.5, 437.5, 700],
  [1800, 630, 450, 720],
  [1850, 647.5, 462.5, 740],
  [1900, 665, 475, 760],
  [1950, 682.5, 487.5, 780],
  [2000, 700, 500, 800],
  [2050, 717.5, 512.5, 820],
  [2100, 735, 525, 840],
  [2150, 752.5, 537.5, 860],
  [2200, 770, 550, 880],
  [2250, 787.5, 562.5, 900],
  [2300, 805, 575, 920],
  [2350, 822.5, 587.5, 940],
  [2400, 840, 600, 960],
  [2450, 857.5, 612.5, 980],
  [2500, 875, 625, 1000],
  [2550, 892.5, 637.5, 1020],
  [2600, 910, 650, 1040],
  [2650, 927.5, 662.5, 1060],
  [2700, 945, 675, 1080],
  [2750, 962.5, 687.5, 1100],
  [2800, 980, 700, 1120],
  [2850, 997.5, 712.5, 1140],
  [2900, 1015, 725, 1160],
  [2950, 1032.5, 737.5, 1180],
  [3000, 1050, 750, 1200],
  [3050, 1067.5, 762.5, 1220],
  [3100, 1085, 775, 1240],
  [3150, 1102.5, 787.5, 1260],
  [3200, 1120, 800, 1280],
  [3250, 1137.5, 812.5, 1300],
  [3300, 1155, 825, 1320],
  [3350, 1172.5, 837.5, 1340],
  [3400, 1190, 850, 1360],
  [3450, 1207.5, 862.5, 1380],
  [3500, 1225, 875, 1400],
];

console.log(trainigdata.length);
const td35 = trainigdata.map((subArray) => [subArray[0], subArray[1]]);
const td25 = trainigdata.map((subArray) => [subArray[0], subArray[2]]);
const td40 = trainigdata.map((subArray) => [subArray[0], subArray[3]]);

// const x99array = x.map((subArray) => [subArray[0], subArray[1] * 0.99]);
// const x995array = x.map((subArray) => [subArray[0], subArray[1] * 0.995]);
// const x98array = x.map((subArray) => [subArray[0], subArray[1] * 0.98]);
// const x985array = x.map((subArray) => [subArray[0], subArray[1] * 0.985]);
// const x97array = x.map((subArray) => [subArray[0], subArray[1] * 0.97]);
// const x975array = x.map((subArray) => [subArray[0], subArray[1] * 0.975]);
// const x103array = x.map((subArray) => [subArray[0], subArray[1] * 1.03]);
// const x1025array = x.map((subArray) => [subArray[0], subArray[1] * 1.025]);
// const x102array = x.map((subArray) => [subArray[0], subArray[1] * 1.02]);
// const x1015array = x.map((subArray) => [subArray[0], subArray[1] * 1.015]);
// const x101array = x.map((subArray) => [subArray[0], subArray[1] * 1.01]);
// const x1005array = x.map((subArray) => [subArray[0], subArray[1] * 1.005]);

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

// console.log(
//   x35_0.flat(1).length,
//   x25_0.flat(1).length,
//   x40_0.flat(1).length,
//   x35_1.flat(1).length,
//   x25_1.flat(1).length,
//   x40_1.flat(1).length,
//   x35i.flat(1).length,
//   x35j.flat(1).length,
//   x25i.flat(1).length,
//   x25j.flat(1).length,
//   x40i.flat(1).length,
//   x40j.flat(1).length
// );
// Train the model
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
