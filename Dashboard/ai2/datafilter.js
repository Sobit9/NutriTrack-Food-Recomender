function Classify(a, b) {
  // Define the percentage targets
  const percentages = [0.35, 0.25, 0.4];

  const tolerance = 0.02; // 4%

  const ratio = b / a;

  for (const percentage of percentages) {
    if (ratio >= percentage - tolerance && ratio <= percentage + tolerance) {
      // Return the percentage as a whole number

      if (percentage === 0.4) {
        return "D";
      } else if (percentage === 0.25) {
        return "L";
      } else if (percentage === 0.35) {
        return "B";
      }
    }
  }
  return "0";
}

const a = 100;
const b = 44;
console.log(Classify(a, b));

export default Classify;
