const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress');
const errorMessage = document.getElementById('error-message');

// Load images from localStorage on page load
window.onload = () => {
    const storedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    storedImages.forEach(imageSrc => {
        displayImage(imageSrc);
    });
};

// Drag and drop events
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('hover');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('hover');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('hover');
    const files = event.dataTransfer.files;
    handleFiles(files);
});

dropArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    handleFiles(files);
});

// Handle file selection
function handleFiles(files) {
    if (files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
        showError('Please upload a valid image file (JPG, PNG, GIF).');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        displayImage(e.target.result);
        simulateUpload();
        saveImageToLocalStorage(e.target.result);
    };
    reader.readAsDataURL(file);
}

// Display image preview
function displayImage(imageSrc) {
    imagePreview.src = imageSrc;
    imagePreview.parentElement.style.display = 'block';
    errorMessage.textContent = '';
}

// Simulate upload progress
function simulateUpload() {
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + '%';

        if (progress >= 100) clearInterval(interval);
    }, 300);
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    imagePreview.parentElement.style.display = 'none';
    progressContainer.style.display = 'none';
}

// Save image to localStorage
function saveImageToLocalStorage(imageSrc) {
    const storedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    storedImages.push(imageSrc);
    localStorage.setItem('uploadedImages', JSON.stringify(storedImages));
}
