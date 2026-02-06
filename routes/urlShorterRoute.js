import express from 'express';

const urlShorterRoute = express.Router();

urlShorterRoute.get('/', (req, res, next) => {
  res.status(200).send('Route of shorten URL');
});

export default urlShorterRoute;