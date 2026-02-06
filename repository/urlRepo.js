import mongoose from "mongoose";

async function connectDB() {
  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL is not set. Create a .env file or set the environment variable.');
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}

export default connectDB;