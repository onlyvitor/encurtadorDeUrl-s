import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date, default: Date.now + 30 * 24 * 60 * 60 * 1000 } // Expira em 30 dias
});

export default mongoose.model('Url', urlSchema);