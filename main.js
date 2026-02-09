import 'dotenv/config';
import express from 'express';
import urlShorterRoute from './routes/urlShorterRoute.js';

const app = express();
app.use(express.json());
const PORT = 3000;

app.use('/shorten', urlShorterRoute);

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});