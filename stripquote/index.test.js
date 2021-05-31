const stripQuotes = require('./');

test('remove the quotes as expected', () => {
  expect(
    stripQuotes(`"I'm" a setence "with' 'simple quote' "and" "double quote"`)
  ).toBe(`I'm a setence with simple quote and double quote`);
});

test('remove unicode quotes as expected', () => {
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
