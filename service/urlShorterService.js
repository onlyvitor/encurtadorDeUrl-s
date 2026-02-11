import urlRepo from "../repository/urlRepo.js";
import { nanoid } from 'nanoid';

class UrlShorterService {

    constructor(urlRepo) {
        this.urlRepo = urlRepo;     
    }

    async createShortUrl({originalUrl}) {
        try{
            const url = originalUrl;
            const code = nanoid(8);

            const save = await this.urlRepo.save(url, code);
            console.log('URL salva no banco de dados:', save);

            return {
                originalUrl: url,
                code_Url: code
            };

        } catch (error) {
        throw new Error('Error creating short URL: ' + error.message);
    }
    }
    
     async getUrl(code) {
        const url = await this.urlRepo.findByCode(code);
        console.log('URL encontrada:', url);
        if (!url) {
            return null;
        }
        return url.originalUrl;
    }
    
    async allUrls() {
        const urls = await this.urlRepo.allUrls();
        console.log('Todas as URLs:', urls);
        return urls;
    }
}
export default UrlShorterService;