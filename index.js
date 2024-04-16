const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const app = express();

// The folder having the views
app.use(express.static(path.join(__dirname, 'views')));

// The folder containing the static files
const publicDirectoryPath = path.join(__dirname, 'public');

// Handling the MIME types for CSS and JS files
app.use(express.static(publicDirectoryPath, {
    setHeaders: (res, filePath, stat) => {
        if (filePath.endsWith('.js')) {
            res.set('Content-Type', 'text/javascript');
        } else if (filePath.endsWith('.css')) {
            res.set('Content-Type', 'text/css');
        }
    }
}));


// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'uploadForm.html'));
});


// Multer storage configuration
const storage = multer.diskStorage({
    destination: 'temps/',
    filename: function (req,file, cb) {
        // Generate the filename 
        const filename =  file.originalname;
        
        cb(null, filename); 
    }
});

const upload = multer({ storage: storage });
const temporary = multer({ dest: 'temps/' });

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const appendFile = promisify(fs.appendFile);


// Route for receiving file chunks
app.post('/documents', upload.single('file'), (req, res) => {
    console.log(`Chunk "${req.body.chunkNumber}" received successfully`);

    // Here if you have the database you can use it to store the files that have been saved in the 'temps' folder
    //..

    res.send(`Chunk "${req.body.chunkNumber}" received successfully`);

});


// Route for combining and saving chunks
app.get('/combine', upload.array('files'), async (req, res) => {
    const tempFolder = 'temps/';
    const uploadFolder = 'uploads/';
    const combinedFileName = req.query.filename;

    // Combine is very easy if you have database like reddis!
    //..


    try {
        // Read all files in the temps folder
        const files = await readdir(tempFolder);

        // Sort files based on their names
        files.sort((a, b) => {
            const numA = parseInt(a.split('-.-.')[0]);
            const numB = parseInt(b.split('-.-.')[0]);
            return numA - numB;
        });

        // Combine files into a single PDF
        for (const file of files) {
            const filePath = path.join(tempFolder, file);
            const data = await readFile(filePath);
            await appendFile(path.join(uploadFolder, combinedFileName), data);
        }

        res.status(200).send('Files combined and saved successfully.');
    } catch (error) {
        console.error('Error combining files:', error);
        res.status(500).send('Internal Server Error');
    }
});


const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
