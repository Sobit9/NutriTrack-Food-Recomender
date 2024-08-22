import react from "react";

function checkPercentage(a, b) {
  // Define the percentage targets
  const percentages = [0.35, 0.25, 0.4];

  // Define a tolerance value to allow for slight differences
  const tolerance = 0.01; // 1%

  // Calculate the ratio of b to a
  const ratio = b / a;

  // Check if the ratio is approximately equal to any of the target percentages
  for (const percentage of percentages) {
    if (Math.abs(ratio - percentage) < tolerance) {
      return percentage * 100;
    }
  }
  return 0;
}
