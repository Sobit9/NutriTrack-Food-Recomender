import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np 
import matplotlib.pyplot as plt
import random
from flask import Flask, request, jsonify
from torch.optim.lr_scheduler import ExponentialLR





from Traindata.dhbp0 import dhbp0

from Traindata.dhbp1 import dhbp1

from Traindata.diab0 import diab0

from Traindata.diab1 import diab1

from Traindata.hbp0 import hbp0

from Traindata.hbp1 import hbp1


from Traindata.dlbp0 import dlbp0

from Traindata.dlbp1 import dlbp1


lbp0 = hbp1

lbp1 = hbp0
# print(dhbp0)

# print(len(dhbp1))

# print(len(diab0))

# print(len(diab1))

# print(len(hbp0))

# print(len(hbp1))

# print(len(lbp0))

# print(len(lbp1))



random.shuffle(dhbp1)

random.shuffle(diab1)

random.shuffle(hbp1)

random.shuffle(lbp1)

random.shuffle(dlbp1)

random.shuffle(dlbp0)

random.shuffle(dhbp0)

random.shuffle(diab0)

random.shuffle(hbp0)

random.shuffle(lbp0)




xv = lbp0 + lbp1+dhbp0 + dhbp1 + diab0 + diab1 + dlbp0 + dlbp1 + hbp0 + hbp1 


yv = ([[0,0,0]]*len(lbp0) + [[0,1,0]]*len(lbp1) + [[0,0,0]]*len(dhbp0) + [[1,0,1]]*len(dhbp1) + [[0,0,0]]*len(diab0) + [[1,0,0]]*len(diab1) + [[0,0,0]]*len(dlbp0) + [[1,1,0]]*len(dlbp1) + [[0,0,0]]*len(hbp0) + [[0,0,1]]*len(hbp1))


# Check if GPU is available and set device accordingly
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')


x = xv


y = yv

print(len(x))
print(len(y))


x_tensor = torch.tensor(x).float()
y_tensor = torch.tensor(y).float()

print(x_tensor.shape)
print(y_tensor.shape)


# Define the MLP model
class MLP(nn.Module):
    def __init__(self):
        super(MLP, self).__init__()
        self.fc1 = nn.Linear(5, 10)
        self.fc2 = nn.Linear(10, 20)
        self.fc3 = nn.Linear(20,40)
        self.fc4 = nn.Linear(40, 35)
        self.fc5 = nn.Linear(35, 18)
        self.fc6 = nn.Linear(18,6)
        self.fc7 = nn.Linear(6, 3)



    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x= torch.relu(self.fc3(x))
        x = torch.relu(self.fc4(x))
        x = torch.relu(self.fc5(x))
        x = torch.relu(self.fc6(x))
        x = torch.sigmoid(self.fc7(x))  # Sigmoid activation for output layer
        return x

# Instantiate the model and move it to the GPU
model = MLP().to(device)

# Define the loss function and optimizer
criterion = nn.BCELoss( )  # Binary Cross Entropy Loss
optimizer = optim.Adam(model.parameters(), lr=0.01 )

# Training parameters
num_epochs = 5000
batch_size = 34

# Training loop
for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0
    
    # Generate a batch of data
    inputs, targets =x_tensor , y_tensor
    
    # Move data to the GPU
    inputs, targets = inputs.to(device), targets.to(device)
    
    # Forward pass
    outputs = model(inputs)
    loss = criterion(outputs, targets)
    
    # Backward pass and optimization
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    
    # Compute loss
    running_loss += loss.item()
    
    # Compute accuracy
    predicted = outputs.round()  # Round to get binary predictions
    total += targets.size(0)
    correct += (predicted == targets).all(dim=1).sum().item()
    
    accuracy = 100 * correct / total
    
    # Print loss and accuracy for this epoch
    print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {running_loss:.4f}, Accuracy: {accuracy:.2f}%')

print("Training complete!")



# # Example input data as a 2D list (batch of samples)
# example_inputs = [ [700, 45, 50, 500,10], [1000, 35, 70, 500, 5], [1300, 6, 110, 500, 12], [400, 35, 40, 500, 8] , [900, 35, 50, 500, 7] ]

# # Convert the example input data to a tensor and ensure it is on the correct device
# example_tensor = torch.tensor(example_inputs).float().to(device)


# # Put the model in evaluation mode
# model.eval()

# # Make predictions
# with torch.no_grad():  # No need to track gradients for inference
#     outputs = model(example_tensor)  # Get predictions for all samples
#     predictions = outputs.squeeze().tolist()   # Convert tensor to list of predictions



# print(predictions)

# app = Flask(__name__)

# model.eval()

# @app.route('/predict', methods=['POST'])
# def predict():
#     # Get input data from the request
#     data = request.json
#     example_inputs = data['input']
#     # print(example_inputs)

#     # Convert input to tensor
#     example_tensor = torch.tensor(example_inputs).float().to(device)

#     # Make predictiona
#     with torch.no_grad():
#         outputs = model(example_tensor)  # Get predictions for all samples
#         predictions = outputs.squeeze().tolist()  # Convert tensor to list of predictions

#     # If the model outputs raw scores, apply a threshold to get binary labels
#     threshold = 0.5
#     predicted_labels = [1 if prediction >= threshold else 0 for prediction in predictions]
#  # Schedule server shutdown after sending the response

#     return jsonify({'predictions': predictions})

# @app.teardown_request
# def teardown_request(exception=None):
#     # Refresh or reset any values/resources here
#     # Example: Clear session data, close files, etc.
#     pass


# if __name__ == '__main__':
#     app.run(debug=True, use_reloader=True) 




