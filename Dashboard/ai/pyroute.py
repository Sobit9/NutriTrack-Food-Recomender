from flask import Flask, request, jsonify
from dbsort import predict
from sod700 import saltcheck
app = Flask(__name__)

@app.route('/predictdb', methods=['POST'])
def process_route():
    data = request.json

    result = predict(data)

    return result

@app.route('/predictbp', methods=['POST'])
def process_route2():
    data = request.json

    result = saltcheck(data)

    return result


if __name__ == '__main__':
    app.run(debug=True)
