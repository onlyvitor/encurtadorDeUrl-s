import 'dotenv/config';
import express from 'express';
import urlShorterRoute from './routes/urlShorterRoute.js';
import getUrlRoute from './routes/getUrlRoute.js';
import urlRepo from './repository/urlRepo.js';

//test for github actions

const app = express();
app.use(express.json());
const PORT = 3000;

async function startServer() {
  await urlRepo.connectDB();
  app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
}

app.use('/shorten', urlShorterRoute);
app.use('/', getUrlRoute);

app.get('/home', (req, res) => {
  res.status(200).send('Hello World!');
});

if (process.env.NODE_ENV !== 'test'){
  startServer();
}

export default app;