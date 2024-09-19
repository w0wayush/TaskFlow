import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import dbConnect from "./lib/dbConnect";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Use User and Task routes
app.use("/api/users", userRoutes); // All user-related routes will be at "/api/users"
app.use("/api/tasks", taskRoutes); // All task-related routes will be at "/api/tasks"

// Connect to MongoDB
dbConnect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
