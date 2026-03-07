import express from 'express';
import UrlShorterService from '../service/urlShorterService.js';
import urlRepo from '../repository/urlRepo.js';

export default class GetUrlRoute {
  constructor({ urlShorterService = new UrlShorterService(urlRepo) } = {}) {
    this.urlShorterService = urlShorterService;
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get('/:code', this.redirectToOriginalUrl.bind(this));
    this.router.get('/find/urls', this.getAllUrls.bind(this));
  }

  async redirectToOriginalUrl(req, res, next) {
    try {
      const code = req.params.code;
      const originalUrl = await this.urlShorterService.getUrl(code);

      if (originalUrl === null || originalUrl === undefined) {
        res.status(404).send({ error: 'URL not found' });
      } else {
        res.status(302).redirect(originalUrl);
        console.log(res.headers);
      }
    } catch (error) {
      console.error('Error retrieving URL:', error);
      next(error);
    }
  }

  async getAllUrls(req, res, next) {
    try {
      const urls = await this.urlShorterService.allUrls();
      res.status(200).send(urls);
    } catch (error) {
      console.error('Error retrieving all URLs:', error);
      next(error);
    }
  }
}
