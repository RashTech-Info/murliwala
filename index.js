const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./db/dbconnection");
dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "https://murliwalafoodcaterers.com"], // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve Static Files
app.use(express.static(path.join(__dirname, "/public")));
app.use("/uploads", express.static("public/uploads"));
app.use("/gallery", express.static("public/gallery"));
app.use("/gallery", express.static("public/gallery"));
app.use("/gallery/videos", express.static("public/gallery/videos"));
app.use("/gallery/images", express.static("public/gallery/images"));

// Connect to Database
connectDB();

// Import and Use Routes
const adminRoutes = [
  "admin_login",
  "admin_profile_update",
  "admin_profile",
  "changepass",
  "contectUs",
  "forgetPass",
  "gallery",
  "inquiry",
  "register",
  "review",
  "sign_out",
];

adminRoutes.forEach((route) => {
  app.use("", require(`./src/routers/admin/${route}`));
});

// Start Server

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

// Handle Server Errors
app.on("error", (error) => {
  console.error(`❌ Server startup error: ${error.message}`);
});
