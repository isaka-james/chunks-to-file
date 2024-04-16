let fileChunks = [];
let fileName = ''; // Variable to store the name of the original file
const totalChunks = 5; // Variable to store the number of chunks

// The form variables
//const fileInput = document.getElementById('fileInput');



function handleFileSelect(event) {
    const file = event.target.files[0];
    const fileSize = file.size;

    fileChunks = [];
    fileName = file.name; // Store the name of the original file

    console.log(`File selected: ${fileName}`);
    console.log(`Total file size: ${fileSize} bytes`);
    console.log(`Number of chunks: ${totalChunks}`);

    const chunkSize = Math.ceil(fileSize / totalChunks);

    let start = 0;

    for (let i = 0; i < totalChunks; i++) {
        const chunk = file.slice(start, start + chunkSize);
        fileChunks.push(chunk);
        start += chunkSize;
    }
}

// Function to check if a file was uploaded
function isFileUploaded() {
    // Check if files were selected
    if (fileInput.files.length > 0) {
        return true; // File was uploaded
    } else {
        return false; // No file was uploaded
    }
}

async function uploadChunks() {
    console.log('Uploading chunks...');

    // Create an array to hold all the upload promises
    const uploadPromises = [];

    for (let i = 0; i < totalChunks; i++) {
        const formData = new FormData();
        formData.append('file', fileChunks[i], `${i+1}-.-.`+fileName);
        formData.append('filename',fileName);
        formData.append('totalChunks', totalChunks);
        formData.append('chunkNumber', i + 1);

        // Send the chunk upload request asynchronously and store the promise
        const uploadPromise = uploadChunk(formData,i+1);

        uploadPromise.then(() => {
            var percentage = ((i + 1) / totalChunks) * 100;
            // The '100' puts complete so wait for server to put complete '100'
            if(percentage===100){
                percentage=99;
            }
            setBar(percentage); // Call setBar function with the percentage
        });

        uploadPromises.push(uploadPromise);
    }

    // Wait for all upload promises to resolve
    await Promise.all(uploadPromises);
    console.log('All chunks uploaded successfully.');

    const filename = fileName; 

    fetch(`/combine?filename=${encodeURIComponent(filename)}`)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text(); // The response from server(in texts)
        })
        .then(data => {
            // The data from the server
            console.log(`The final response from server: ${data}`);
            setBar(100);
        })
        .catch(error => {
            // Display errors when failed to get response from the server
            console.error('Fetch error:', error);
        });

    
}

async function uploadChunk(formData,progress) {
    try {
        const response = await fetch('/documents', {
            method: 'POST',
            body: formData
        });
        const result = await response.text();
        console.log(`Client Response: The file ${progress} sent to server!`);
        console.log('Server response:', result); // Log the response from the server
    } catch (error) {
        console.error('Error uploading chunk:', error);
    }
}

// Detect if file was chosen and send to server, if no then show 'file was chosen'
document.getElementById('uploadButtonChunk').addEventListener('click', function(event) {
        // Check if a file was uploaded
    if (isFileUploaded()) {
        uploadChunks();
    } else {
        // Do some other actions or show an error message
        console.log('No file was chosen!.');
    }

});

// When file is loaded then quickly save the changes
fileInput.addEventListener('change', handleFileSelect);
