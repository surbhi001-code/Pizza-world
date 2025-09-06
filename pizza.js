// Import the built-in 'http' module to create a web server.
const http = require('http');

// Define the port number the server will listen on.
const port = 3000;

// Create an HTTP server.
// The function passed to createServer is a request listener,
// which runs every time a request hits the server.
const server = http.createServer((req, res) => {

  // Set the response header to indicate that the content is HTML.
  res.setHeader('Content-Type', 'text/html');

  // Initialize a variable to hold the HTML response.
  let htmlResponse = '';

  // Use a switch statement to handle different URL paths from the request.
  switch (req.url) {
    case '/':
      res.statusCode = 200; // OK
      htmlResponse = '<h1>Hello World</h1>';
      break;
    case '/pizza':
      res.statusCode = 200; // OK
      htmlResponse = '<h1>This is your pizza</h1>';
      break;
    case '/home':
      res.statusCode = 200; // OK
      htmlResponse = '<h1>Welcome home</h1>';
      break;
    case '/about':
      res.statusCode = 200; // OK
      htmlResponse = '<h1>Welcome to About Us</h1>';
      break;
    case '/node':
      res.statusCode = 200; // OK
      htmlResponse = '<h1>Welcome to my Node Js project</h1>';
      break;
    default:
      // For any other URL, respond with a 404 Not Found error.
      res.statusCode = 404;
      htmlResponse = '<h1>404 - Page Not Found</h1>';
      break;
  }

  // Send the determined HTML response to the client.
  res.end(htmlResponse);
});

// Start the server and make it listen for incoming connections on the specified port.
server.listen(8000, () => {
  // Log a message to the console once the server is running.
  console.log(`Server running at http://localhost:${port}/`);
});
