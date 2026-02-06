import connectDB from "../repository/urlRepo.js";



class UrlShorterService {
    constructor() {
        this.urlRepo = connectDB();
    }

    async isconnected(){
        try {
            await this.urlRepo;
            console.log('Conectado ao MongoDB');
        } catch (error) {
            console.error('Erro ao conectar ao MongoDB:', error);
        }
    }
}


export default UrlShorterService;