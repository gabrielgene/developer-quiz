const stripQuotes = require('./');

test('strip the quotes as expected', () => {
  expect(
    stripQuotes(`"I'm" a sentence "with' 'simple quote' "and" "double quote"`)
  ).toBe(`I'm a sentence with simple quote and double quote`);
});

test('strip unicode quotes as expected', () => {
  expect(
    stripQuotes(
      `'quotation' "quotation" ’quotation´ ‘quotation’ ‘quotation’ “quotation”`
    )
  ).toBe(`quotation quotation quotation quotation quotation quotation`);
});

test('handle with unexpected parameters', () => {
  expect(() => stripQuotes(0)).toThrowError(/not a string/);
  expect(() => stripQuotes(null)).toThrowError(/not a string/);
  expect(stripQuotes()).toBe('');
});
