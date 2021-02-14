import { validateURL } from '../js/validateURL'

describe('Testing the Url validation', () => {
    test('Test validateURL() function', () => {
        expect(validateURL).toBeDefined()
    })

    test('check that the url return false for invalid urls', () => {
        expect(validateURL('not')).toBeFalsy()
    })

    test('check that the url return true for valid urls', () => {
        expect(validateURL('http://example.com')).toBeTruthy()
    })

})