import express from 'express';
import UrlShorterService from '../service/urlShorterService.js';
import validateSchemaUrl from '../repository/urlSchema.js';
import zod from 'zod';
import urlRepo from '../repository/urlRepo.js';

export default class UrlShorterRoute {
  constructor({ urlShorterService = new UrlShorterService(urlRepo) } = {}) {
    this.urlShorterService = urlShorterService;
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post('/', this.createShortUrl.bind(this));
  }

  async createShortUrl(req, res, next) {
    try {
      const data = validateSchemaUrl.parse(req.body);
      const result = await this.urlShorterService.createShortUrl(data);

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const shortUrl = `${baseUrl}/${result.code_Url}`;

      res.status(201).send({ originalUrl: result.originalUrl, shortUrl });
    } catch (error) {
      if (error instanceof zod.ZodError) {
        console.log('Validation Error here!!!!!!!', error);
        res.status(400).send({ error: 'Invalid URL format' });
      } else {
        next(error);
      }
    }
  }
}
