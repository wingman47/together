// added type="module" to allow import statement
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// loads environment variables (like KEY) from a .env file into process.env.
import dotenv from "dotenv";

// used for handling file uploads in Node.js
import multer from "multer";

// secures by setting up various HTTP headers
// to read about various HTTP headers: https://www.npmjs.com/package/helmet
import helmet from "helmet";

// HTTP request logger for Node.js like request method, headers
import morgan from "morgan";

import path from "path";
import { fileURLToPath } from "url";

// controller stores function to handle all the routes
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";

// routes contains all the routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

// verify user middleware
import { verifyToken } from "./middleware/auth.js";

// database
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

/* -------------------------------------------------------------------------- */
/*                                CONFIGURATION                               */
/* -------------------------------------------------------------------------- */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// setting HTTP headers using helmet and morgan.
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// to accept HTTP requests where the data in the request body is formatted as JSON. Extended allows for nested data through url.
app.use(express.json({ limit: "30mb", extended: true }));

// to send HTTP request using data encoded as key-value pairs in URL separated by &.
// sets the Content-Type header of the HTTP request to application/x-www-form-urlencoded.
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// directory to store uploaded images
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


// sets storage location for file uploads.
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
let upload = multer({ storage });

/* -------------------------------------------------------------------------- */
/*                              ROUTES WITH FILES                             */
/* -------------------------------------------------------------------------- */

// "upload" middleware created using multer, register function to handle POST request
app.post("/auth/register", upload.single("picture"), register); 
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* -------------------------------------------------------------------------- */
/*                     HANDLING ROUTES THROUGH MIDDLEWARE                     */
/* -------------------------------------------------------------------------- */

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* -------------------------------------------------------------------------- */
/*                               MONGOOSE SETUP                               */
/* -------------------------------------------------------------------------- */

const PORT = process.env.PORT || 6000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // inserting dummy data when application loads
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} cannot connect`));
