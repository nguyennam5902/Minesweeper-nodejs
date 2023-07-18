/**
 * Given a string, return `true` if `str` is `"true"`
 * @param {string} str 
 * @returns {boolean}
 */
function parseBoolean(str) {
   return (str === 'true');
}

function getPage(n) {
   if (n % 10 == 0) {
      return Math.floor(n / 10);
   } else {
      return Math.floor(n / 10) + 1;
   }
}

module.exports = {
   getPage,
   parseBoolean
};