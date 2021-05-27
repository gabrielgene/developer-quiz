const removeQuotes = require('./');

test('remove the quotes as expected', () => {
  expect(
    removeQuotes(`"I'm" a setence "with' 'simple quote' "and" "double quote"`)
  ).toBe(`I'm a setence with simple quote and double quote`);
});

test('remove unicode quotes as expected', () => {
  expect(
    removeQuotes(
      `'quotation' "quotation" ’quotation´ ‘quotation’ ‘quotation’ “quotation”`
    )
  ).toBe(`quotation quotation quotation quotation quotation quotation`);
});

test('handle with unexpected parameters', () => {
  expect(() => removeQuotes(0)).toThrowError(/not a string/);
  expect(() => removeQuotes(null)).toThrowError(/not a string/);
  expect(removeQuotes()).toBe('');
});
