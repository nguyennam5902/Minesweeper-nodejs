/**
 * Return random integer in range [`min`, `max`]
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function getRandomNumber(min = 0, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = { getRandomNumber };