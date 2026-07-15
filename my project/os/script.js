const textForm = document.getElementById("textForm");
const fileForm = document.getElementById("fileForm");
const textInput = document.getElementById("textInput");
const showEncryptBtn = document.getElementById("showEncrypt");
const showDecryptBtn = document.getElementById("showDecrypt");

let encryptedText = "";
let decryptedText = ""; 

// Handle Text Form Submission
textForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = textInput.value;
    const action = document.getElementById("textAction").value;

    if (!text) {
        alert("Please enter some text!");
        return;
    }

    try {
        const res = await fetch("http://127.0.0.1:5000/process-text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, action }),
        });
        const data = await res.json();

        if (action === "encrypt") {
            encryptedText = data.result; // Store encrypted text
            textInput.value = "Text encrypted successfully!";
        } else {
            decryptedText = data.result; // Store decrypted text
            textInput.value = "Text decrypted successfully!";
        }
    } catch (err) {
        alert("An error occurred while processing the text.");
    }
});

// Show Encrypted Text
showEncryptBtn.addEventListener("click", () => {
    if (encryptedText) {
        textInput.value = encryptedText;
    } else {
        alert("No encrypted text available!");
    }
});

// Show Decrypted Text
showDecryptBtn.addEventListener("click", () => {
    if (decryptedText) {
        textInput.value = decryptedText;
    } else {
        alert("No decrypted text available!");
    }
});

// File Form Submission
fileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = document.getElementById("fileInput").files[0];
    const action = document.getElementById("fileAction").value;

    if (!file) {
        alert("Please upload a file.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("action", action);

    try {
        const res = await fetch("http://127.0.0.1:5000/process-file", {
            method: "POST",
            body: formData,
        });
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = file.name + (action === "encrypt" ? ".encrypted" : ".decrypted");
        link.click();
        alert("File processed successfully!");
    } catch (err) {
        alert("An error occurred while processing the file.");
    }
});
