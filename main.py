# Importing required packages

from flask import Flask, request, jsonify

from ultralytics import YOLO

import os

from werkzeug.utils import secure_filename

from PIL import Image

from flask_cors import CORS


app = Flask(__name__)

CORS(app)


UPLOAD_FOLDER = "uploads/"

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}


app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


# Load YOLO model

model = YOLO("yolov8n.pt")  # Replace with your YOLO model weights


# Helper function to check allowed file extensions

def allowed_file(filename):

    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_vehicle_count(image_paths):

    vehicle_count = []

    results = []

    for image_path in image_paths:

        results.append(model(image_path, verbose=False))

    # Define vehicle classes (COCO classes: 2=car, 3=motorcycle, 5=bus, 7=truck)

    vehicle_classes = [2, 3, 5, 7]

    for all in results:

        vehicleCount = sum(1 for box in all[0].boxes if int(
            box.cls) in vehicle_classes)

        vehicle_count.append(vehicleCount)

    return vehicle_count


@app.route("/upload", methods=["POST"])
def handle_request():

    # Ensure the request contains files

    print(request.files)

    if "image" not in request.files:

        return jsonify({"error": "No file part"}), 400

    files = request.files.getlist("image")  # Get the list of uploaded images

    if len(files) < 1:

        return jsonify({"error": "At least four images are required"}), 400

    # Create a list to store the paths of saved images

    image_paths = []

    # Save the images to the server

    for file in files:

        if file and allowed_file(file.filename):

            filename = secure_filename(file.filename)

            file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)

            file.save(file_path)

            image_paths.append(file_path)

    # Process the images with YOLO model

    vehicle_counts = get_vehicle_count(image_paths)

    print("vehicle count ", vehicle_counts)

    return jsonify({"vehicle_counts": vehicle_counts})


# Run the Flask app
if __name__ == "__main__":

    # Ensure uploads directory exists

    if not os.path.exists(UPLOAD_FOLDER):

        os.makedirs(UPLOAD_FOLDER)

    app.run(host="0.0.0.0", debug=True)
