import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np 
import matplotlib.pyplot as plt
import random
from flask import Flask, request, jsonify
from torch.optim.lr_scheduler import ExponentialLR




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


from Traindata.dhbp0 import dhbp0

from Traindata.dhbp1 import dhbp1

from Traindata.diab0 import diab0

from Traindata.diab1 import diab1

from Traindata.hbp0 import hbp0

from Traindata.hbp1 import hbp1

from Traindata.lbp0 import lbp0

from Traindata.lbp1 import lbp1

from Traindata.dlbp0 import dlbp0

from Traindata.dlbp1 import dlbp1

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



tdv1 = dhbp1 + diab1 + hbp1 + lbp1 + dlbp1

tdv0 = dhbp0 + diab0 + hbp0 + lbp0 + dlbp0




random.shuffle(tdv1)

random.shuffle(tdv0)

x1001 = tdv1[:300]
x2001 = tdv1[300:600]
x3001 = tdv1[600:900]
x4001 = tdv1[900:1200]
x5001 = tdv1[1200:1500]
x6001 = tdv1[1500:1800]
x7001 = tdv1[1800:2100]
x8001 = tdv1[2100:2400]
x9001 = tdv1[2400:2700]
x10001 = tdv1[2700:3000]
x11001 = tdv1[3000:3300]
x12001 = tdv1[3300:3600]
x13001 = tdv1[3600:3900]
x14001 = tdv1[3900:4200]
x15001 = tdv1[4200:]

x1000 = tdv0[:300]
x2000 = tdv0[300:600]
x3000 = tdv0[600:900]
x4000 = tdv0[900:1200]
x5000 = tdv0[1200:1500]
x6000 = tdv0[1500:1800]
x7000 = tdv0[1800:2100]
x8000 = tdv0[2100:2400]
x9000 = tdv0[2400:2700]
x10000 = tdv0[2700:3000]
x11000 = tdv0[3000:3300]
x12000 = tdv0[3300:3600]
x13000 = tdv0[3600:3900]
x14000 = tdv0[3900:]

xv = x1001 + x1000 + x2001 + x2000 + x3001 + x3000 + x4001 + x4000 + x5001 + x5000 + x6001 + x6000 + x7001 + x7000 + x8001 + x8000 + x9001 + x9000 + x10001 + x10000 + x11001 + x11000 + x12001 + x12000 + x13001 + x13000 + x14001 + x14000 + x15001

yv = [1]*300 + [0]*300 + [1] * 300 + [0] * 300 + [1]*300 + [0]*300 + [1]*300 + [0]*300+[1]*300 + [0]*300 + [1] * 300 + [0] * 300 + [1]*300 + [0]*300 + [1]*300 + [0]*300+[1]*300 + [0]*300 + [1] * 300 + [0] * 300 + [1]*300 + [0]*300 + [1]*300 + [0]*300+[1]*300 + [0]*300 + [1] * 300 + [0]*len(x14000)+[1]*len(x15001)



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

xu = (x10[:500] + x11[:500] + x20[:500] + x21[:500] + x30[:500] + x31[:500] + x40[:500] + x41[:500] + x50[:500] + x51[:500]+x60[:500] + x61[:500] + x70[:500] + x71[:500] + x80[:500] + x81[:500] + x90[:500] + x91[:500]+ x100[:500] + x101[:500] + x110[:500] + x111[:500] + x120[:500] + x121[:500]  + x131[:500]+x10[500:] + x11[500:] + x20[500:] + x21[500:] + x30[500:] + x31[500:] + x40[500:] + x41[500:] + x50[500:] + x51[500:]+ x60[500:] + x61[500:] + x70[500:] + x71[500:] + x80[500:] + x81[500:] + x90[500:] + x91[500:] + x100[500:] + x101[500:]+ x110[500:] + x111[500:] + x120[500:] + x121[500:]  + x131[500:])


yu = ([0]*len(x10[:500])+[1]*len(x11[:500])+[0]*len(x20[:500])+[1]*len(x21[:500])+[0]*len(x30[:500])+[1]*len(x31[:500])+[0]*len(x40[:500])+[1]*len(x41[:500])+[0]*len(x50[:500])+[1]*len(x51[:500])+[0]*len(x60[:500])+[1]*len(x61[:500])+[0]*len(x70[:500])+[1]*len(x71[:500])+[0]*len(x80[:500])+[1]*len(x81[:500])+[0]*len(x90[:500])+[1]*len(x91[:500])+[0]*len(x100[:500])+[1]*len(x101[:500])+[0]*len(x110[:500])+[1]*len(x111[:500])+[0]*len(x120[:500])+[1]*len(x121[:500])+[1]*len(x131[:500])+[0]*len(x10[:500])+[1]*len(x11[:500])+[0]*len(x20[:500])+[1]*len(x21[:500])+[0]*len(x30[:500])+[1]*len(x31[:500])+[0]*len(x40[:500])+[1]*len(x41[:500])+[0]*len(x50[:500])+[1]*len(x51[:500])+[0]*len(x60[:500])+[1]*len(x61[:500])+[0]*len(x70[:500])+[1]*len(x71[:500])+[0]*len(x80[:500])+[1]*len(x81[:500])+[0]*len(x90[:500])+[1]*len(x91[:500])+[0]*len(x100[500:])+[1]*len(x101[500:])+[0]*len(x110[:500])+[1]*len(x111[500:])+[0]*len(x120[500:])+[1]*len(x121[500:])+[1]*len(x131[500:]))



# Check if GPU is available and set device accordingly
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')


x = xu


y = yu

print(len(x))
print(len(y))

# Define the MLP model
class MLP(nn.Module):
    def __init__(self):
        super(MLP, self).__init__()
        self.fc1 = nn.Linear(8, 60)
        self.fc2 = nn.Linear(60, 88)
        self.fc3 = nn.Linear(88,128)
        self.fc4 = nn.Linear(128, 80)
        self.fc5 = nn.Linear(80, 20)

        self.fc6 = nn.Linear(20,10)
        self.fc7 = nn.Linear(10, 1)

        self.dropout2 = nn.Dropout(0.1)
        self.dropout1 = nn.Dropout(0.1)
        self.dropout3 = nn.Dropout(0.15)


    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.dropout1(torch.relu(self.fc2(x)))
        x= self.dropout2(torch.relu(self.fc3(x)))
        x = torch.relu(self.fc4(x))
        x = self.dropout3(torch.relu(self.fc5(x)))
        x = torch.relu(self.fc6(x))
        x = torch.sigmoid(self.fc7(x))  # Sigmoid activation for output layer
        return x

# Instantiate the model and move it to the GPU
model = MLP().to(device)

# Define the loss function and optimizer
criterion = nn.BCELoss( )  # Binary Cross Entropy Loss
optimizer = optim.Adam(model.parameters(), lr=0.002 )

# Training parameters
num_epochs = 1000
batch_size = 64

x_tensor = torch.tensor(x).float()
y_tensor = torch.tensor(y).float().view(-1, 1)

print(x_tensor.shape)
print(y_tensor.shape)



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
    correct += (predicted == targets).sum().item()
    
    accuracy = 100 * correct / total
    
    # Print loss and accuracy for this epoch
    print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {running_loss:.4f}, Accuracy: {accuracy:.2f}%')

print("Training complete!")



# Example input data as a 2D list (batch of samples)
example_inputs = [ [700, 45, 50, 500, 8, 1, 1, 0], [1000, 35, 70, 500, 5, 1, 1, 0], [1300, 6, 110, 500, 12, 1, 0, 0], [400, 35, 40, 500, 8, 1, 0, 1] , [900, 35, 50, 500, 7, 0, 0, 1] ]

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

#     # Make predictiona
#     with torch.no_grad():
#         outputs = model(example_tensor)  # Get predictions for all samples
#         predictions = outputs.squeeze().tolist()  # Convert tensor to list of predictions

#     # If the model outputs raw scores, apply a threshold to get binary labels
#     threshold = 0.5
#     predicted_labels = [1 if prediction >= threshold else 0 for prediction in predictions]
#  # Schedule server shutdown after sending the response

#     return jsonify({'predictions': predicted_labels})

# @app.teardown_request
# def teardown_request(exception=None):
#     # Refresh or reset any values/resources here
#     # Example: Clear session data, close files, etc.
#     pass


# if __name__ == '__main__':
#     app.run(debug=True, use_reloader=True)