import express from 'express';
import UrlShorterService from '../service/urlShorterService.js';

const urlShorterRoute = express.Router();
const urlShorterService = new UrlShorterService();

urlShorterRoute.get('/', (req, res, next) => {
  res.status(200).send('Route of shorten URL');
  return urlShorterService.isconnected();
});

export default urlShorterRoute;