import numpy as np
i=10
class sug:
    def __init__(self):
        self.threshold = i
    
    def activate(self, x):
        return np.where(x > self.threshold, 1, 0)
    
    def predict(self, x):
        activations = self.activate(np.array(x))
        return ['1' if a == 1 else '0' for a in activations]

# Example usage
neuron = sug()
input_array = [10, 20, 5, 8, 70]
predictions = neuron.predict(input_array)

# If you want to print each prediction on a new line:
for input_val, pred in zip(input_array, predictions):
    print(f"Input: {input_val}, Prediction: {pred}")