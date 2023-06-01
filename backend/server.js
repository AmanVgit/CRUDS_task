
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

// Connect to MongoDB
mongoose.connect("mongodb+srv://Drax09:aman_codes@cluster0.8xwasga.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dataSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  hobbies: String,
});

const DataModel = mongoose.model('Data', dataSchema);

const app = express();
app.use(cors());
app.use(express.json());

// API endpoint to save the form responses
app.post('/api/data', async (req, res) => {
  try {
    const newData = await DataModel.create(req.body);
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create data' });
  }
});

app.get("/api/data", async (req, res) => {
  try {
    const responses = await Response.find();
    res.json(responses);
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ error: "Failed to fetch responses" });
  }
});

// Endpoint to handle sending the email
app.post("/api/send-email", async (req, res) => {
  const { data, emailAddress } = req.body;
  try {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Your email transport configuration here (e.g., SMTP details)
    });

    // Compose the email message
    const message = {
      from: "your-email@example.com",
      to: emailAddress,
      subject: "Selected Data",
      text: JSON.stringify(data),
    };

    // Send the email
    const info = await transporter.sendMail(message);

    console.log("Email sent:", info.messageId);

    res.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
