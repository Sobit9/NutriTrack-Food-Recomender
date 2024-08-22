// Import TensorFlow.js library for Node.js with CPU support
import * as tf from "@tensorflow/tfjs";

const model = tf.sequential();

// Input layer and first hidden layer with 10 neurons
model.add(
  tf.layers.dense({
    inputShape: [2], // 2 input features
    units: 6,
    activation: "relu",
    kernelRegularizer: tf.regularizers.l1l2({ l1: 0.01, l2: 0.01 }),
  })
);

model.add(
  tf.layers.dense({
    units: 7,
    activation: "relu",
    kernelRegularizer: tf.regularizers.l1l2({ l1: 0.01, l2: 0.01 }),
  })
);
model.add(
  tf.layers.dense({
    units: 6,
    activation: "relu",
    kernelRegularizer: tf.regularizers.l1l2({ l1: 0.01, l2: 0.01 }),
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
    kernelRegularizer: tf.regularizers.l1l2({ l1: 0.01, l2: 0.01 }),
  })
);
// model.add(tf.layers.dropout({ rate: 0.2 }));

// Output layer with 3 neurons for ternary classification
model.add(
  tf.layers.dense({
    units: 3,
    activation: "softmax", // Softmax activation function for classification
  })
);

// Compile the model
model.compile({
  optimizer: tf.train.adam(0.002), // Adam optimizer
  loss: "categoricalCrossentropy", // Categorical cross-entropy loss function
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

const xx = trainigdata.map((subArray) => [subArray[0], subArray[1]]);
const xy = trainigdata.map((subArray) => [subArray[0], subArray[2]]);
const xz = trainigdata.map((subArray) => [subArray[0], subArray[3]]);

const x = xx.concat(xy, xz);

const x99array = x.map((subArray) => [subArray[0], subArray[1] * 0.99]);
const x995array = x.map((subArray) => [subArray[0], subArray[1] * 0.995]);
const x98array = x.map((subArray) => [subArray[0], subArray[1] * 0.98]);
const x985array = x.map((subArray) => [subArray[0], subArray[1] * 0.985]);
const x97array = x.map((subArray) => [subArray[0], subArray[1] * 0.97]);
const x975array = x.map((subArray) => [subArray[0], subArray[1] * 0.975]);
const x103array = x.map((subArray) => [subArray[0], subArray[1] * 1.03]);
const x1025array = x.map((subArray) => [subArray[0], subArray[1] * 1.025]);
const x102array = x.map((subArray) => [subArray[0], subArray[1] * 1.02]);
const x1015array = x.map((subArray) => [subArray[0], subArray[1] * 1.015]);
const x101array = x.map((subArray) => [subArray[0], subArray[1] * 1.01]);
const x1005array = x.map((subArray) => [subArray[0], subArray[1] * 1.005]);

// let j, k;
// let xi = [];
// let xj = [];

// for (let i = 95; i >= 75; i = i - 5) {
//   j = x.map((subArray) => [subArray[0], subArray[1] * (i / 100)]);
//   if (!xi.includes(j)) {
//     xi.push(j);
//   }
// }

// for (let i = 105; i <= 125; i = i + 5) {
//   k = x.map((subArray) => [subArray[0], subArray[1] * (i / 100)]);
//   if (!xj.includes(k)) {
//     xj.push(k);
//   }
// }
const y1 = Array(45).fill([1, 0, 0]);
const y2 = Array(45).fill([0, 1, 0]);
const y3 = Array(45).fill([0, 0, 1]);

const ty = Array(135 * 10).fill([0, 0, 0]);

const y = y1.concat(y2, y3);

const yss = y.concat(y, y, y, y, y, y, y, y, y, y, y, y);

const xss = x.concat(
  x99array,
  x98array,
  x97array,
  x103array,
  x102array,
  x101array,
  x1005array,
  x1015array,
  x1025array,
  x975array,
  x985array,
  x995array
  // xi.flat(1),
  // xj.flat(1)
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
// const newData = tf.tensor2d([[1600, 560]]);
// const prediction = model.predict(newData);
// prediction.print(); // Print the raw prediction probabilities

// const predictedClass = prediction.argMax(-1).dataSync()[0];
// console.log(`Predicted class: ${predictedClass}`);

// connectDB();
