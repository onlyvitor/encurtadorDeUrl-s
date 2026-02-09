import mongoose from "mongoose";
import UrlModel from "./urlModel.js";

async function connectDB() {
  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL is not set. Create a .env file or set the environment variable.');
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}

function save(originalUrl, code) {
  const Url = UrlModel;
  const newUrl = new Url({ originalUrl, code });
  return newUrl.save();
}

export default { connectDB, save };