import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np 
import matplotlib.pyplot as plt
import random
from flask import Flask, request, jsonify
import threading
import time
import os
import requests



from Traindata.Modeldata.diabities0 import diabities0
from Traindata.Modeldata.diabities1 import diabities1
from Traindata.Modeldata.highbp0 import highbp0
from Traindata.Modeldata.highbp1 import highbp1
from Traindata.Modeldata.lowbp0 import lowbp0
from Traindata.Modeldata.lowbp1 import lowbp1
from Traindata.Modeldata.diab_lbp0 import diab_lbp0
from Traindata.Modeldata.diab_lbp1 import diab_lbp1
from Traindata.Modeldata.diab_hbp0 import diab_hbp0
from Traindata.Modeldata.diab_hbp1 import diab_hbp1

# # Print the data
# print(len(diabities0))
# print(len(diabities1))
# print(len(highbp0))
# print(len(highbp1))
# print(len(lowbp0))
# print(len(lowbp1))
# print(len(diab_lbp0))
# print(len(diab_lbp1))
# print(len(diab_hbp0))
# print(len(diab_hbp1))


random.shuffle(diabities1)

random.shuffle(lowbp1)

random.shuffle(highbp1)

random.shuffle(diab_hbp1)

random.shuffle(diab_lbp1)


random.shuffle(diabities0)

random.shuffle(lowbp0)

random.shuffle(highbp0)

random.shuffle(diab_hbp0)

random.shuffle(diab_lbp0)


td1 = diabities1 + highbp1 + lowbp1 + diab_lbp1 + diab_hbp1

td0 = diabities0 + highbp0 + lowbp0 + diab_lbp0 + diab_hbp0

random.shuffle(td1)

random.shuffle(td0)

x11 = td1[0:1000] 
x21 = td1[1000:2000]
x31 = td1[2000:3000]
x41 = td1[3000:4000]
x51 = td1[4000:5000]
x61 = td1[5000:6000]
x71 = td1[6000:7000]
x81 = td1[7000:8000]
x91 = td1[8000:9000]
x101 = td1[9000:10000]
x111 = td1[10000:11000]
x121 = td1[11000:12000]
x131 = td1[12000:]


x10 = td0[0:1000]
x20 = td0[1000:2000]
x30 = td0[2000:3000]
x40 = td0[3000:4000]
x50 = td0[4000:5000]
x60 = td0[5000:6000]
x70 = td0[6000:7000]
x80 = td0[7000:8000]
x90 = td0[8000:9000]
x100 = td0[9000:10000]
x110 = td0[10000:11000]
x120 = td0[11000:12000]
x130 = td0[12000:]

x = (x10 + x11 + x20 + x21 + x30 + x31 + x40 + x41 + x50 + x51 + x60 + x61 + x70 + x71 + x80 + x81 + x90 + x91 + x100 + x101 + x110 + x111 + x120 + x121 + x130 + x131)


y = ([0]*len(x10)+[1]*len(x11)+[0]*len(x20)+[1]*len(x21)+[0]*len(x30)+[1]*len(x31)+[0]*len(x40)+[1]*len(x41)+[0]*len(x50)+[1]*len(x51)+[0]*len(x60)+[1]*len(x61)+[0]*len(x70)+[1]*len(x71)+[0]*len(x80)+[1]*len(x81)+[0]*len(x90)+[1]*len(x91)+[0]*len(x100)+[1]*len(x101)+[0]*len(x110)+[1]*len(x111)+[0]*len(x120)+[1]*len(x121)+[0]*len(x130)+[1]*len(x131))



# Check if GPU is available and set device accordingly
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')



# Define the MLP model
class MLP(nn.Module):
    def __init__(self):
        super(MLP, self).__init__()
        self.fc1 = nn.Linear(8, 200)
        self.fc2 = nn.Linear(200, 400)
        self.fc3 = nn.Linear(400, 300)
        self.fc4 = nn.Linear(300,100)
        self.fc5 = nn.Linear(100, 30)
        self.fc6 = nn.Linear(30, 1)
        self.dropout2 = nn.Dropout(0.2)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = torch.relu(self.fc3(x))
        x = self.dropout2(torch.relu(self.fc4(x)))
        x = torch.relu(self.fc5(x))
        x = torch.sigmoid(self.fc6(x))  # Sigmoid activation for output layer
        return x

# Instantiate the model and move it to the GPU
model = MLP().to(device)

# Define the loss function and optimizer
criterion = nn.BCELoss()  # Binary Cross Entropy Loss
optimizer = optim.Adam(model.parameters(), lr=0.002 )

# Training parameters
num_epochs = 2000
batch_size = 32

x_tensor = torch.tensor(x).float()
y_tensor = torch.tensor(y).float().view(-1, 1)

print(x_tensor.shape)
print(y_tensor.shape)

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




# Example input data as a 2D list (batch of samples)
example_inputs = [ [700, 35, 40, 500, 12, 1, 0, 1], [600, 35, 40, 500, 5, 1, 0, 1], [400, 35, 10, 500, 4, 1, 0, 1], [1200, 35, 100, 1000, 12, 1, 0, 1] , [700, 15, 80, 500, 12, 1, 0, 1] ]

# Convert the example input data to a tensor and ensure it is on the correct device
example_tensor = torch.tensor(example_inputs).float().to(device)

# Put the model in evaluation mode
model.eval()

# Make predictions
with torch.no_grad():  # No need to track gradients for inference
    outputs = model(example_tensor)  # Get predictions for all samples
    predictions = outputs.squeeze().tolist()   # Convert tensor to list of predictions


for i, (prediction, label) in enumerate(zip(predictions, example_inputs)):
    print(f"Sample {i}: Prediction: {prediction:.4f}, Predicted Label: {label}")



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

#     # Make prediction
#     with torch.no_grad():
#         outputs = model(example_tensor)  # Get predictions for all samples
#         predictions = outputs.squeeze().tolist()  # Convert tensor to list of predictions

#     # If the model outputs raw scores, apply a threshold to get binary labels
#     threshold = 0.5
#     predicted_labels = [1 if prediction >= threshold else 0 for prediction in predictions]
#  # Schedule server shutdown after sending the response

#     return jsonify({'predictions': predicted_labels})

# if __name__ == '__main__':
#     app.run(debug=True)