from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from cryptography.fernet import Fernet
import os

app = Flask(__name__)
CORS(app)

# Generate a Fernet key
KEY = Fernet.generate_key()
cipher = Fernet(KEY)

UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route("/process-text", methods=["POST"])
def process_text():
    data = request.get_json()
    text = data.get("text")
    action = data.get("action")

    if not text or not action:
        return jsonify({"error": "Text and action are required!"}), 400

    try:
        if action == "encrypt":
            result = cipher.encrypt(text.encode()).decode()
        elif action == "decrypt":
            result = cipher.decrypt(text.encode()).decode()
        else:
            return jsonify({"error": "Invalid action"}), 400
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": f"Error processing text: {str(e)}"}), 500

@app.route("/process-file", methods=["POST"])
def process_file():
    file = request.files.get("file")
    action = request.form.get("action")
 
    if not file or not action:
        return jsonify({"error": "File and action are required!"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    try:
        with open(file_path, "rb") as f:
            content = f.read()
            processed_data = cipher.encrypt(content) if action == "encrypt" else cipher.decrypt(content)
        output_path = file_path + (".encrypted" if action == "encrypt" else ".decrypted")
        with open(output_path, "wb") as f:
            f.write(processed_data)
        return send_file(output_path, as_attachment=True)
    except Exception as e:
        return jsonify({"error": f"Error processing file: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True) 
