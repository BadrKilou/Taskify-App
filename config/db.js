const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useFindAndModify: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
