import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np 
import matplotlib.pyplot as plt
import random
from flask import Flask, request, jsonify
from torch.optim.lr_scheduler import ExponentialLR

# Create data
x70 = [[i, 1] for i in range(0, 700, 4)]
x71 = [[i, 1] for i in range(700, 1400, 4)]

tdv0 = x70
tdv1 = x71

x1001 = tdv1[:25]
x2001 = tdv1[25:50]
x3001 = tdv1[50:75]
x4001 = tdv1[75:100]
x5001 = tdv1[100:125]
x6001 = tdv1[125:150]
x7001 = tdv1[150:175]

x1000 = tdv0[:25]
x2000 = tdv0[25:50]
x3000 = tdv0[50:75]
x4000 = tdv0[75:100]
x5000 = tdv0[100:125]
x6000 = tdv0[125:150]
x7000 = tdv0[150:175]

xv = x1001 + x3001 + x4001 + x5001 + x1000 + x4000 + x5000 + x7000
yv = [1] * 100 + [0] * 100

# Check if GPU is available and set device accordingly
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Prepare data
x_tensor = torch.tensor(xv).float().view(-1, 2)
y_tensor = torch.tensor(yv).float().view(-1, 1)

# Define the MLP model
class MLP(nn.Module):
    def __init__(self):
        super(MLP, self).__init__()
        self.fc1 = nn.Linear(2, 20)
        self.fc2 = nn.Linear(20, 60)
        self.fc3 = nn.Linear(60, 120)
        self.fc4 = nn.Linear(120, 80)
        self.fc5 = nn.Linear(80, 70)
        self.fc6 = nn.Linear(70, 60)
        self.fc7 = nn.Linear(60, 30)
        self.fc8 = nn.Linear(30, 1)
        self.dropout = nn.Dropout(0.2)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.dropout(torch.relu(self.fc3(x)))
        x = self.dropout(torch.relu(self.fc4(x)))
        x = torch.relu(self.fc5(x))
        x = torch.relu(self.fc6(x))
        x = torch.relu(self.fc7(x))
        x = torch.sigmoid(self.fc8(x))
        return x

# Instantiate the model and move it to the GPU
model = MLP().to(device)

# Define the loss function and optimizer
criterion = nn.BCELoss()
optimizer = optim.Adam(model.parameters(), lr=0.00004)

# Training parameters
num_epochs = 3000

# Lists to store loss and accuracy for each epoch
losses = []
accuracies = []

# # Training loop
# for epoch in range(num_epochs):
#     model.train()
#     running_loss = 0.0
#     correct = 0
#     total = 0
    
#     # Move data to the GPU
#     inputs, targets = x_tensor.to(device), y_tensor.to(device)
    
#     # Forward pass
#     outputs = model(inputs)
#     loss = criterion(outputs, targets)
    
#     # Backward pass and optimization
#     optimizer.zero_grad()
#     loss.backward()
#     optimizer.step()
    
#     # Compute loss
#     running_loss += loss.item()
#     losses.append(running_loss)
    
#     # Compute accuracy
#     predicted = outputs.round()
#     total += targets.size(0)
#     correct += (predicted == targets).sum().item()
    
#     accuracy = 100 * correct / total
#     accuracies.append(accuracy)
    
#     # Print loss and accuracy for this epoch
#     if (epoch + 1) % 100 == 0:
#         print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {running_loss:.4f}, Accuracy: {accuracy:.2f}%')

# print("Training complete!")

# # Plotting the loss and accuracy
# plt.figure(figsize=(12, 5))

# plt.subplot(1, 2, 1)
# plt.plot(losses, label='Loss')
# plt.xlabel('Epoch')
# plt.ylabel('Loss')
# plt.title('Loss vs. Epochs')
# plt.legend()

# plt.subplot(1, 2, 2)
# plt.plot(accuracies, label='Accuracy', color='orange')
# plt.xlabel('Epoch')
# plt.ylabel('Accuracy (%)')
# plt.title('Accuracy vs. Epochs')
# plt.legend()

# plt.tight_layout()
# plt.show()



# Example input data as a list (batch of samples)
# example_inputs1 = x2000 + x3000 +x7000
example_inputs1 = [[660,1],[550,1]]

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
# example_inputs2 = x6001 + x7001 + x2001
example_inputs2 = [[700,1],[750,1]]

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


