/**
 * Strip quotes from text when the is being used as quotation but keep 
 * quotes that are part of the words.
 * 
 * Considering unicode quotes https://www.cl.cam.ac.uk/~mgk25/ucs/quotes.html
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
