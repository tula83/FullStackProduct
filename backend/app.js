from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb://localhost:27017")

db = client.Items
collection = db.Products


@app.route("/items", methods=['POST'])
def create_employees():
    data = request.get_json()
    insert_result = collection.insert_one(data)
    return jsonify({"message": "items inserted successfully", "id": str(insert_result.inserted_id)}), 201


@app.route("/items", methods=['GET'])
def get_employees():
    items= list(collection.find())
    for item in items:
        item['_id'] = str(item['_id'])
    return jsonify(items), 200


@app.route('/items/<item_id>', methods=['GET'])
def get_one(item_id):
    result = collection.find_one({"_id": ObjectId(item_id)})

    if result:
        result['_id'] = str(result['_id'])
        return jsonify(result), 200
    else:
        return jsonify({"message": "item not found"}), 404





@app.route("/items/<item_id>", methods=['PUT'])
def update_employee(item_id):
    data = request.get_json()
    update_result = collection.update_one({"_id": ObjectId(item_id)}, {"$set": data})

    if update_result.modified_count > 0:
        return jsonify({"message": "item updated successfully"}), 200
    else:
        return jsonify({"message": "item not found"}), 404


# delete one
@app.route("/items/<item_id>", methods=['DELETE'])
def delete_data(item_id):
    result = collection.delete_one({'_id': ObjectId(item_id)})
    if result.deleted_count > 0:
        return jsonify({'message': "item deleted successfully"}), 200
    else:
        return jsonify(({"message": "unable to find item id"})), 404



@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(debug=True)
