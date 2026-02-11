import express from 'express';
import UrlShorterService from '../service/urlShorterService.js';
import validateSchemaUrl from '../repository/urlSchema.js';
import zod from 'zod';
import urlRepo from '../repository/urlRepo.js';

const urlShorterRoute = express.Router();
const urlShorterService = new UrlShorterService(urlRepo);

urlShorterRoute.post('/', async (req, res, next) => {
  try {
    const data = validateSchemaUrl.parse(req.body);
    const result = await urlShorterService.createShortUrl(data);

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const shortUrl = `${baseUrl}/${result.code_Url}`;

    res.status(201).send({ originalUrl: result.originalUrl, shortUrl });

  } catch (error) {
    if (error instanceof zod.ZodError) {
      console.log("Validation Error here!!!!!!!", error);
      res.status(400).send({ error: 'Invalid URL format' });
    } else {
      next(error);
    }
  }
});

export default urlShorterRoute;