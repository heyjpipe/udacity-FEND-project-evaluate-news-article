import { checkForUrl } from '../client/js/urlChecker'

describe('Function "checkForUrl()" should exist' , () => {
    test('It should return true', async () => {
        expect(checkForUrl).toBeDefined();
    });
});
describe('Function "checkForUrl()" should be a function' , () => {
    test('It should be a function', async () => {
        expect(typeof checkForUrl).toBe("function");
    });
});

describe('Function "checkForUrl()" for correct url' , () => {
    var url = "https://www.meredithlodging.com/blog/central-oregon-coast/top-cozy-cabins-oregon-coast";
    test('It should return true', async () => {
        const response = checkForUrl(url);
        expect(response).toBeDefined();
        expect(response).toBe(true);
    });
});
describe('Test "checkForUrl()" for incorrect url' , () => {
    //Removed 'https' with to make incorrect
    var url = "www.meredithlodging.com/blog/central-oregon-coast/top-cozy-cabins-oregon-coast";
    test('It should return false', async () => {
        const response = checkForUrl(url);
        expect(response).toBeDefined();
        expect(response).toBe(false);
    });
});
