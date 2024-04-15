<div align="center">
<h1 align="center"> Chunks to File - NodeJs Application </h1>

<img  src="https://cdn.freebiesupply.com/logos/large/2x/nodejs-1-logo-png-transparent.png" alt="Project Image" width="200">
<br/>
<img align="center"  src="https://komarev.com/ghpvc/?username=chunks-to-file&label=Chunks%20To%20File&color=0e75b6&style=flat" alt="since 16 April,2024" />

</div>
<br/>


A Node.js application for uploading file chunks and combining them into a single file on the server.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

In many scenarios, uploading large files to a server can be challenging due to limitations in file size or network conditions. This project provides a solution by allowing the client to split a large file into smaller chunks and upload them individually to the server. Once all chunks are received, the server combines them into a single file.

## Features

- Split large files into smaller chunks for easier uploading.
- Upload chunks to the server asynchronously.
- Combine uploaded chunks into a single file on the server.
- Accepts all types of files.
- Simple and easy-to-use interface.


### Simplified Pros Commentary:
>*JavaScript on front-end divides the user's selected file into smaller segments and transmits them simultaneously to the server through the `/documents` route. These segments are then stored in a temporary location known as `temps` folder on the server. Following successful storage, the browser prompts the server to aggregate these segments via the `/combine` route. Utilizing binary methods, the server adeptly merges the segmented data, On completion, file being will be securely stored within the `uploads` directory. So, all the broken pieces of data come together nicely to make one complete file on the server.*

## Installation

To use this application, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/isaka-james/chunks-to-file.git
   ```

2. Enter into the project folder:

   ```bash
   cd chunks-to-file
   ```
3. Install the dependencies:
```bash
   npm install
```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Open your web browser and navigate to `http://localhost/`.
3. Select a file using the provided input field.
4. Click the "Upload" button to initiate the upload process.
5. The server will receive the file chunks and combine them into a single file inside the `uploads` folder.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

Feel free to customize the content and add more details specific to your project. If you have any questions or need further assistance, let me know!
