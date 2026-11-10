const express = require("express");
const connectDB = require("./config/config");

const app = express();
const cors = require("cors");

const allowedOrigins = ["http://localhost:3000", "https://dawn-estate.vercel.app"];
//
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};


app.use(cors(corsOptions));

require("dotenv").config();
const PORT = 5000;

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/user.routes");
const blogRouter = require("./routes/blog.routes");
const productsRouter = require("./routes/property.routes");

app.use("/api/user", userRoutes);
app.use("/api/properties", productsRouter);
app.use("/api/blog", blogRouter);

app.listen(PORT || process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
