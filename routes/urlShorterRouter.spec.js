import { test, expect, mock, vitest} from 'vitest'
import request from 'supertest'
import app from '../main.js'

vitest.mock('../service/urlShorterService.js', () => {
    return {
        default: class {
            async createShortUrl({ originalUrl }) {
                return {
                    originalUrl,
                    code_Url: 'mockedCode'
                };
            }
        }
    }
});

test('POST /shorten - should return a short URL and 201 status code', async() =>{
    const response = await request(app)
        .post('/shorten')
        .send({ originalUrl: 'https://youtube.com' })
        .expect(201);
        
    expect(response.body).toHaveProperty('originalUrl', 'https://youtube.com');
    expect(response.body).toHaveProperty('shortUrl');
})