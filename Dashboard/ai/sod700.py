import numpy as np

class SimpleNeuron:
    def __init__(self):
        self.threshold = 699
    
    def set_threshold(self, b):
        if 700 < b <= 1000:
            return 749
        elif 1000 < b <= 1200:
            return 799
        elif b > 1200:
            return 849
        return self.threshold
    
    def activate(self, x):
        # In the reverse process, use b as the input and a to determine the threshold
        thresholds = np.array([self.set_threshold(a) for a, _ in x])
        inputs = np.array([b for _, b in x])
        return np.where(inputs > thresholds, 1, 0)
    
    def predict(self, x):
        activations = self.activate(np.array(x))
        return [1 if a == 1 else 0 for a in activations]

# Example usage
# neuron = SimpleNeuron()
# input_array = [[1050, 800], [800, 100], [200, 1100], [500, 1300], [800, 1100], [700, 950]]
# predictions = neuron.predict(input_array)

# print(predictions)

def saltcheck(data):
    neuron = SimpleNeuron()
    return neuron.predict(data)
