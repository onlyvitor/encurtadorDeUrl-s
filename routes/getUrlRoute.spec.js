import {test, expect, vitest} from 'vitest'
import request from 'supertest'
import app from '../main.js'

vitest.mock('../service/urlShorterService.js', () => {
    return {
        default: class {
            async getUrl(code) {
                return 'https://google.com'
        }
    }
    }
});

test('GET /:code - should redirect to original URL and 302 status code', async() =>{
    const response = await request(app)
        .get('/mockedCode')
        .redirects(0);

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('https://google.com');
})