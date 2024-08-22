import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np 
import matplotlib.pyplot as plt
from torch.utils.data import DataLoader, TensorDataset
import random
from flask import Flask, request, jsonify


# Neural network for diabities check starts here ????????????????????
from Traindata.db0 import db0
from Traindata.db1 import db1

tdv0 = db0
tdv1 = db1
# print (tdv0)
# print (tdv1)
print (len(tdv0))
print (len(tdv1))

x101 = tdv1[:50]
x201 = tdv1[50:100]
x301 = tdv1[100:150]
x401 = tdv1[150:200]
x501 = tdv1[200:250]
x601 = tdv1[250:300]
x701 = tdv1[300:350]
x801 = tdv1[350:400]

x100 = tdv0[:50]
x200 = tdv0[50:100]
x300 = tdv0[100:150]
x400 = tdv0[150:200]
x500 = tdv0[200:250]
x600 = tdv0[250:300]
x700 = tdv0[300:350]
x800 = tdv0[350:400]


xv = x101 + x100  + x301 + x300 + x401 + x400  + x601 + x600 + x701 + x700 + x801 + x800
yv = ([1] * 50 + [0] * 50 + [1] * 50 + [0] * 50 + [1] * 50 + [0] * 50 + [1] * 50 + [0] * 50 + [1] * 50 + [0] * 50 + [1]*len(x801)+[0]*len(x800))

# Check if GPU is available and set device accordingly
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
# device = torch.device('cpu')
# Prepare data
x_tensor = torch.tensor(xv).float().view(-1, 4)
y_tensor = torch.tensor(yv).float().view(-1, 1)

# Define the MLP model
class MLP(nn.Module):
    def __init__(self):
        super(MLP, self).__init__()
        self.fc1 = nn.Linear(4, 20)
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
# model = MLP().to(device)

# # Define the loss function and optimizer
# criterion = nn.BCELoss()
# optimizer = optim.Adam(model.parameters(), lr=0.000006)

# # Training parameters
# num_epochs = 4000
# batch_size = 80

# # Lists to store loss and accuracy for each epoch
# losses = []
# accuracies = []

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
#     print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {running_loss:.4f}, Accuracy: {accuracy:.2f}%')

# print("Training complete!")



# Save your model @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
model_path = 'mlp_model.pth'
# torch.save(model.state_dict(), model_path)




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









# # Model test

# # Example input data as a list (batch of samples)
# example_inputs1 = x200 + x500 
# # example_inputs1 = [[660,25,40,7],[660,5,80,7],[660,5,80,12],[660,25,40,12]]

# # Convert the example input data to a tensor and ensure it is on the correct device
# example_tensor = torch.tensor(example_inputs1).float().unsqueeze(1).to(device)


# # Put the model in evaluation mode
# model.eval()

# # Make predictions
# with torch.no_grad():  # No need to track gradients for inference
#     outputs = model(example_tensor)  # Get predictions for all samples
#     predictions = outputs.squeeze().tolist()   # Convert tensor to list of predictions


# # for i, (prediction, label) in enumerate(zip(predictions, example_inputs1)):
# #     print(f"Sample {i}: Prediction: {prediction:.4f}, Predicted Label: {label}")

# # Calculate accuracy for the example inputs
# correct_predictions = sum(p < 0.5 for p in predictions)
# total_samples = len(predictions)
# accuracy = correct_predictions / total_samples * 100

# print(f"Accuracy: {accuracy:.2f}%")

# # Plot predictions
# plt.figure(figsize=(10, 6))
# plt.bar(range(len(predictions)), predictions, color='blue', label='Predictions')
# plt.axhline(0.5, color='red', linestyle='--', label='Threshold (0.5)')
# plt.xlabel('Sample Index')
# plt.ylabel('Prediction')
# plt.title('Predictions for Negative Inputs')
# plt.legend()


# # Example input data as a list (batch of samples)
# example_inputs2 = x201 + x501 

# # Convert the example input data to a tensor and ensure it is on the correct device
# example_tensor2 = torch.tensor(example_inputs2).float().unsqueeze(1).to(device)


# # Put the model in evaluation mode
# model.eval()

# # Make predictions
# with torch.no_grad():  # No need to track gradients for inference
#     outputs2 = model(example_tensor2)  # Get predictions for all samples
#     predictions2 = outputs2.squeeze().tolist()   # Convert tensor to list of predictions


# # for i, (prediction, label) in enumerate(zip(predictions, example_inputs1)):
# #     print(f"Sample {i}: Prediction: {prediction:.4f}, Predicted Label: {label}")


# # Calculate accuracy for the example inputs2
# correct_predictions2 = sum(p >= 0.5 for p in predictions2)
# total_samples2 = len(predictions2)
# accuracy2 = correct_predictions2 / total_samples2 * 100

# print(f"Accuracy: {accuracy2:.2f}%")

# # Plot predictions
# plt.figure(figsize=(10, 6))
# plt.bar(range(len(predictions2)), predictions2, color='blue', label='Predictions')
# plt.axhline(0.5, color='red', linestyle='--', label='Threshold (0.5)')
# plt.xlabel('Sample Index')
# plt.ylabel('Prediction')
# plt.title('Predictions for Positive Inputs ')
# plt.legend()
# plt.show()


# Neural Network for diabities check ends here ?????????????????????



app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    model = MLP().to(device)

    model.load_state_dict(torch.load(model_path))

    model.eval()
    # Get input data from the request
    data = request.json
    example_inputs = data['input']
    # print(example_inputs)

    # Convert input to tensor
    example_tensor = torch.tensor(example_inputs).float().unsqueeze(1).to(device)

    # Make predictiona
    with torch.no_grad():
        outputs = model(example_tensor)  # Get predictions for all samples
        predictions = outputs.squeeze().tolist()  # Convert tensor to list of predictions

    # If the model outputs raw scores, apply a threshold to get binary labels
    threshold = 0.5
    predicted_labels = [1 if prediction >= threshold else 0 for prediction in predictions]
 # Schedule server shutdown after sending the response

    return jsonify({'predictions': predicted_labels})

@app.teardown_request
def teardown_request(exception=None):
    # Refresh or reset any values/resources here
    # Example: Clear session data, close files, etc.
    pass


if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)