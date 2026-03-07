import 'dotenv/config';
import express from 'express';
import UrlShorterRoute from './routes/urlShorterRoute.js';
import GetUrlRoute from './routes/getUrlRoute.js';
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

const urlShorterRoute = new UrlShorterRoute();
const getUrlRoute = new GetUrlRoute();

app.use('/shorten', urlShorterRoute.router);
app.use('/', getUrlRoute.router);

app.get('/home', (req, res) => {
  res.status(200).send('Hello World!');
});

if (process.env.NODE_ENV !== 'test'){
  startServer();
}

export default app;