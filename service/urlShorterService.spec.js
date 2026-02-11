import { beforeEach, expect, test, vitest, describe} from 'vitest'
import UrlShorterService from '../service/urlShorterService.js'

let repoMock;
let service;
describe("urlShorterService", ()=>{
    beforeEach(()=>{
    repoMock={
        connectDB:vitest.fn(),
        save:vitest.fn(),
        findByCode:vitest.fn()
    };

    service = new UrlShorterService(repoMock)
});

test('should be save url and return data', async()=>{
    repoMock.save.mockResolvedValueOnce(true);

    const result = await service.createShortUrl({
        originalUrl:"https://google.com"
    })

    expect(repoMock.save).toHaveBeenCalled();
    expect(result.originalUrl).toBe("https://google.com");
    expect(result.code_Url).toBeDefined();
})

test('should return an original URL ', async ()=>{
    repoMock.findByCode.mockResolvedValueOnce({
        originalUrl:"https://google.com"
    })

    const url = await service.getUrl("abc123");
    
    expect(url).toBe("https://google.com")
})
})
