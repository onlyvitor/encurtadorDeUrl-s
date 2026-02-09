import urlRepo from "../repository/urlRepo.js";
import { nanoid } from 'nanoid';

class UrlShorterService {

    constructor() {
        this.urlRepo = urlRepo;
        
    }

    async createShortUrl({originalUrl}) {
        try{
            const url = originalUrl;
            const code = nanoid(8);

            await urlRepo.connectDB();

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
        await urlRepo.connectDB();
        const url = await this.urlRepo.findByCode(code);
        console.log('URL encontrada:', url);
        return url.originalUrl;
    }
    
}
export default UrlShorterService;