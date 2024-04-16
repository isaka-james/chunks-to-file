document.getElementById('fileInput').addEventListener('change', function() {
    var fileName = this.files[0].name;
    document.getElementById('fileName').innerHTML = `<p>Selected file:</p>`+`<p style="font-weight: 500 !important;">${fileName}</p>`;
});

const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');

dropArea.addEventListener('dragover', handleDragOver);
dropArea.addEventListener('dragleave', handleDragLeave);
dropArea.addEventListener('drop', handleDrop);
dropArea.addEventListener('click', () => fileInput.click());

function handleDragOver(event) {
    event.preventDefault();
    dropArea.style.backgroundColor = '#f0f0f0';
}

function handleDragLeave(event) {
    event.preventDefault();
    dropArea.style.backgroundColor = '';
}

function handleDrop(event) {
    event.preventDefault();
    dropArea.style.backgroundColor = '';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const fileName = files[0].name;
        document.getElementById('fileName').innerHTML = `<p>Selected file:</p>` + `<p style="font-weight: 500 !important;">${fileName}</p>`;
        fileInput.files = files; // Set files for the input element
        
        handleFileSelect({ target: { files: files } }); // Call handleFileSelect function with the files
    }
}

function setBar(percent) {
    const progressBar = document.getElementById('progressBar');
    const progressBarInner = document.getElementById('progressBarInner');

    progressBar.style.display = 'block';

    if (percent === 100) {
        progressBar.classList.remove('progressBarClass');
        progressBar.innerHTML = `<p> Upload complete! </p>`;
        return;
    }

    progressBarInner.style.width = `${percent}%`;
}
