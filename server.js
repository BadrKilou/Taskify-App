const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    //Handle SyntaxError here.
    return res.status(500).send({ data: "Invalid data" });
  } else {
    next();
  }
});

app.use(cors());
app.use("/api/users", require("./routers/users"));
app.use("/api/auth", require("./routers/auth"));
app.use("/api/profile", require("./routers/profile"));
app.use("/api/post", require("./routers/post"));
app.use("/api/file", require("./middleware/cloudinary/cloudinary"));
app.use("/api/multer", require("./middleware/multer/multerConfig"));
app.use("/api", require("./routers/resetPassword"));

app.listen(PORT, (req, res) => {
  console.log(`The Server is Running Successfully on PORT ${PORT}`);
});
