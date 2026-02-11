import {test, expect, vitest, afterEach, beforeEach, describe} from 'vitest'
import request from 'supertest'
import app from '../main.js'

describe("getUrlRoute",()=>{
vitest.mock('../service/urlShorterService.js', () => {
    return {
        default: class {
            async getUrl(code) {
                return 'https://google.com'
        }
            async allUrls() {
                return [
                    { originalUrl: 'https://google.com', code_Url: 'mockedCode' },
                    { originalUrl: 'https://example.com', code_Url: 'mockedCode2' }
                ]
    }
    }
};})

test('GET /:code - should redirect to original URL and 302 status code', async() =>{
    const response = await request(app)
        .get('/mockedCode')
        .redirects(0);

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('https://google.com');
})

test('GET /find/urls - should return 200 status code and list of URLs', async() =>{
    const response = await request(app)
        .get('/find/urls');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
})
})
