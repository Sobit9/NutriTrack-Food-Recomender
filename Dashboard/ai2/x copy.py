import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np 
import matplotlib.pyplot as plt
import random
from flask import Flask, request, jsonify
from torch.optim.lr_scheduler import ExponentialLR


x70 = list(range(0, 700, 2))
print(len(x70))


x71 = list(range(700, 1400, 2))
print (len(x71))

tdv1 = x71

tdv0 = x70



x1001 = tdv1[:50]
x2001 = tdv1[50:100]
x3001 = tdv1[100:150]
x4001 = tdv1[150:200]
x5001 = tdv1[200:250]
x6001 = tdv1[250:300]
x7001 = tdv1[300:350]


x1000 = tdv0[:50]
x2000 = tdv0[50:100]
x3000 = tdv0[100:150]
x4000 = tdv0[150:200]
x5000 = tdv0[200:250]
x6000 = tdv0[250:300]
x7000 = tdv0[300:350]

xv = x1001  + x3001 +  x4001  + x5001   + x1000  + x4000 + x5000  + x7000

yv = [1]*200 + [0]*200 





# Check if GPU is available and set device accordingly
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')


x = xv


y = yv



# Define the MLP model
class MLP(nn.Module):
    def __init__(self):
        super(MLP, self).__init__()
        self.fc1 = nn.Linear(1, 80)
        self.fc2 = nn.Linear(80, 90)
        self.fc3 = nn.Linear(90,120)
        self.fc4 = nn.Linear(120,100)
        self.fc5 = nn.Linear(100,70)
        self.fc6 = nn.Linear(70,40)
        self.fc7 = nn.Linear(40,1)
        self.dropout = nn.Dropout(0.2)


    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.dropout(torch.relu(self.fc3(x)))
        x = self.dropout(torch.relu(self.fc4(x)))
        x = torch.relu(self.fc5(x))
        x = torch.relu(self.fc6(x))
        x = torch.sigmoid(self.fc7(x))  # Sigmoid activation for output layer
        return x

# Instantiate the model and move it to the GPU
model = MLP().to(device)

# Define the loss function and optimizer
criterion = nn.BCELoss( )  # Binary Cross Entropy Loss
optimizer = optim.Adam(model.parameters(), lr=0.00004 )

# Training parameters
num_epochs = 5000
batch_size = 80

# print(x)
# print(y)

x_tensor = torch.tensor(x).float().view(-1, 1)
y_tensor = torch.tensor(y).float().view(-1, 1)

# print(x_tensor.shape)
# print(y_tensor.shape)

plt.figure(1)
plt.plot(x,x)

plt.figure(2)
plt.plot(y_tensor)
# plt.show()


# # Training loop
# for epoch in range(num_epochs):
#     model.train()
#     running_loss = 0.0
#     correct = 0
#     total = 0
    
#     # Generate a batch of data
#     inputs, targets =x_tensor , y_tensor
    
#     # Move data to the GPU
#     inputs, targets = inputs.to(device), targets.to(device)
    
#     # Forward pass
#     outputs = model(inputs)
#     loss = criterion(outputs, targets)
    
#     # Backward pass and optimization
#     optimizer.zero_grad()
#     loss.backward()
#     optimizer.step()
    
#     # Compute loss
#     running_loss += loss.item()
    
#     # Compute accuracy
#     predicted = outputs.round()  # Round to get binary predictions
#     total += targets.size(0)
#     correct += (predicted == targets).sum().item()
    
#     accuracy = 100 * correct / total
    
#     # Print loss and accuracy for this epoch
#     print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {running_loss:.4f}, Accuracy: {accuracy:.2f}%')

# print("Training complete!")



# Example input data as a list (batch of samples)
example_inputs1 = x2000 + x3000 +x7000
# example_inputs1 = [660,550]

# Convert the example input data to a tensor and ensure it is on the correct device
example_tensor = torch.tensor(example_inputs1).float().unsqueeze(1).to(device)


# Put the model in evaluation mode
model.eval()

# Make predictions
with torch.no_grad():  # No need to track gradients for inference
    outputs = model(example_tensor)  # Get predictions for all samples
    predictions = outputs.squeeze().tolist()   # Convert tensor to list of predictions


for i, (prediction, label) in enumerate(zip(predictions, example_inputs1)):
    print(f"Sample {i}: Prediction: {prediction:.4f}, Predicted Label: {label}")


# Example input data as a list (batch of samples)
example_inputs2 = x6001 + x7001 + x2001
# example_inputs2 = [700,750]

# Convert the example input data to a tensor and ensure it is on the correct device
example_tensor = torch.tensor(example_inputs2).float().unsqueeze(1).to(device)


# Put the model in evaluation mode
model.eval()

# Make predictions
with torch.no_grad():  # No need to track gradients for inference
    outputs = model(example_tensor)  # Get predictions for all samples
    predictions = outputs.squeeze().tolist()   # Convert tensor to list of predictions


for i, (prediction, label) in enumerate(zip(predictions, example_inputs2)):
    print(f"Sample {i}: Prediction: {prediction:.4f}, Predicted Label: {label}")


