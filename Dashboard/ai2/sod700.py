import numpy as np

class SimpleNeuron:
    def __init__(self):
        self.threshold = 699
    
    def activate(self, x):
        return np.where(x > self.threshold, 1, 0)
    
    def predict(self, x):
        activations = self.activate(np.array(x))
        return ['1' if a == 1 else '0' for a in activations]

# Example usage
neuron = SimpleNeuron()
input_array = [100, 200, 500, 800, 700]
predictions = neuron.predict(input_array)

# If you want to print each prediction on a new line:
for input_val, pred in zip(input_array, predictions):
    print(f"Input: {input_val}, Prediction: {pred}")