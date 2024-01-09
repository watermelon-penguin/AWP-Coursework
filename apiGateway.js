const express = require('express');
const http = require('http');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Function to handle proxying of requests
function proxyRequest(req, res, targetPort) {
  const options = {
    hostname: 'localhost',
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxy = http.request(options, function (r) {
    r.pipe(res, { end: true });
  });

  req.pipe(proxy, { end: true });
}

// Route for microservice 1
app.all('/service1/*', (req, res) => {
  const service1Port = 3001; // Port where microservice 1 is running
  proxyRequest(req, res, service1Port);
});

// Route for microservice 2
app.all('/service2/*', (req, res) => {
  const service2Port = 3002; // Port where microservice 2 is running
  proxyRequest(req, res, service2Port);
});
});
});

// Start the API Gateway
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
