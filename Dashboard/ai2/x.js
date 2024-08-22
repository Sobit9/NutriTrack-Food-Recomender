// Import TensorFlow.js
import * as tf from "@tensorflow/tfjs";

// Create the model
const model = tf.sequential();

// Add a single dense layer with one unit (neuron)
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

// Compile the model
model.compile({
  optimizer: tf.train.sgd(0.9),
  loss: "binaryCrossentropy",
  metrics: ["accuracy"],
});

// Generate training data
const numSamples = 1000;
const trainX = tf.randomUniform([numSamples, 1], 0, 1400);
const trainY = trainX.greater(700).asType("float32");

// Train the model
async function trainModel() {
  await model.fit(trainX, trainY, {
    epochs: 1000,
    batchSize: 32,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(
          `Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(
            4
          )}, accuracy = ${logs.acc.toFixed(4)}`
        );
      },
    },
  });
  console.log("Training complete");
}

// Function to make predictions
function predict(value) {
  const inputTensor = tf.tensor2d([[value]]);
  const prediction = model.predict(inputTensor);
  const result = prediction.dataSync()[0];
  return result > 0.5 ? "Above 700" : "Below or equal to 700";
}

// Run the training and make predictions
trainModel().then(() => {
  console.log(predict(750)); // Should output: "Above 700"
  console.log(predict(650)); // Should output: "Below or equal to 700"
});
