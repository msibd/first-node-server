// Importing required modules
const http = require("http"); // Module to create HTTP server
const fs = require("fs"); // Module to work with file system
const multer = require("multer"); // Middleware for handling file uploads
const path = require("path"); // Module for working with file and directory paths

// Configuring storage for uploaded files using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination directory for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, "image" + "-" + file.originalname); // Naming convention for uploaded files
  },
});

// Creating multer instance with configured storage
let upload = multer({ storage: storage }).single("image");

// Creating HTTP server
const server = http.createServer(function (req, res) {
  // Handling different routes based on request URL
  if (req.url == "/") {
    // Responding to root route with HTML content
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>this is home page</h1>");
    res.end();
  } else if (req.url == "/about") {
    // Responding to '/about' route with HTML content
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>this is about page </h1>");
    res.end();
  } else if (req.url == "/contact") {
    // Responding to '/contact' route with HTML content
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>this is contact page </h1>");
    res.end();
  } else if (req.url == "/file-write") {
    // Handling file write operation
    fs.writeFile("demo.txt", "hello world", function (err) {
      if (err) {
        // Responding with error if file write operation fails
        res.writeHead(500, { "Content-Type": "text/html" });
        res.write("File not created");
        res.end();
      } else {
        // Responding with success message if file write operation succeeds
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>This is file creating page. </h1>");
        res.end();
      }
    });
  } else if (req.method === "POST" && req.url === "/upload") {
    // Handling file upload via POST request
    upload(req, res, (error) => {
      if (error) {
        // Responding with error if file upload fails
        console.log("something wrong");
        return res.end("Error uploading file");
      } else {
        // Responding with success message if file upload succeeds
        res.end("File Uploaded Successfully!");
      }
    });
  }
});

// Starting the server and listening on port 5500
server.listen(5500, function () {
  console.log("Server is running successfully...");
});
