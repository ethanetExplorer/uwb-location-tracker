import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5174;

// Enable CORS to allow cross-origin requests from your React app
app.use(cors());

// Middleware to parse incoming JSON data
app.use(express.json());

// Temporary store to hold the received data
let receivedData = null;

// Root route (optional) - You can use this for testing or serving a message
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "Welcome to the server. Use POST / to send data and GET /data to retrieve it."
    );
});

// POST route to handle incoming data from Python (or any other client)
app.post("/", (req, res) => {
  // Log the incoming request data
  console.log("Received POST request");
  console.log("Request body:", req.body); // This will print the parsed JSON data from the request body

  // Store the data for future GET requests
  receivedData = req.body;

  // Respond with a success message
  res.status(200).json({
    message: "Data received successfully",
    receivedData: req.body, // Optionally, send back the received data
  });
});

// GET route to send the received data to the React app
app.get("/data", (req, res) => {
  if (receivedData) {
    res.status(200).json({
      message: "Data fetched successfully",
      data: receivedData,
    });
  } else {
    res.status(404).json({ message: "No data available yet" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
