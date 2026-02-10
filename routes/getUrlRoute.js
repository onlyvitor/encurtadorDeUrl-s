import express, { response } from 'express';
import UrlShorterService from '../service/urlShorterService.js';

const getUrlRoute = express.Router();
const urlShorterService = new UrlShorterService();

getUrlRoute.get('/:code', async (req, res, next) => {
  try {
    const code = req.params.code;
    const originalUrl = await urlShorterService.getUrl(code);

    if (originalUrl) {
      res.status(302).redirect(originalUrl);
      console.log(res.headers);
    } else {
      res.status(404).send({ error: 'URL not found' });
    }
  } catch (error) {
    console.error('Error retrieving URL:', error);
    next(error);
  }
});

getUrlRoute.get('/find/urls', async (req, res, next) => {
  try {
    const urls = await urlShorterService.allUrls();
    res.status(200).send(urls);
  } catch (error) {
    console.error('Error retrieving all URLs:', error);
    next(error);
  }
});

export default getUrlRoute;