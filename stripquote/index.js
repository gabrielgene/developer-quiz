/**
 * remove quotes from the beginning or end of words,
 * considering unicode quotes https://www.cl.cam.ac.uk/~mgk25/ucs/quotes.html
 * disregarding quotes in the middle in words like I'm, don't...
 *
 * @param {string} text - A text param = "I'm a "quote""
 * @return {string} A formatted text = "I'm a quote"
 */
function stripQuotes(text = '') {
  if (typeof text !== 'string')
    throw new TypeError(`The expected value is a ${typeof text} not a string`);

  // for a more detailed explanation of the regex check the https://regex101.com
  return text.replace(/['’´‘’“”`‛"](?=\W|$)|(?<=\W|^)['’´‘’“”`‛"]/g, '');
}

module.exports = stripQuotes;
