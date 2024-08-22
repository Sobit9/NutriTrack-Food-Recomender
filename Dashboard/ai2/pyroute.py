from flask import Flask, request, jsonify
from dbsort import predict

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def process_route():
    data = request.json

    result = predict(data)

    return result



if __name__ == '__main__':
    app.run(debug=True)
