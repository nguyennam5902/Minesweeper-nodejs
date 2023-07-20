const fileController = require('./file')
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
/**
 * Escape special characters.
 * @param {string} s 
 * @see https://github.com/jacebrowning/memegen#special-characters
 */
function escape(s) {
   const replacements = [["-", "--"], [" ", "-"], ["_", "__"], ["?", "~q"], ["%", "~p"], ["#", "~h"], ["/", "~s"], ["\"", "''"]];
   for (var i = 0; i < replacements.length; i++)
      s = s.replace(replacements[i][0], replacements[i][1]);
   return s;
}


/**
 * Render message as an apology to user.
 * @param {Response} res Response for route
 * @param {boolean} isLogin Boolean for checking is user is login or not
 * @param {number} top Error code
 * @param {string} bottom Error message
 */
function apologyRender(res, isLogin, top, bottom) {
   bottom = escape(bottom);
   res.render('apology', {
      'stylesheet': fileController.readFile('./static/styles-455.css'),
      'isLogin': isLogin,
      'top': top,
      'bottom': bottom
   });
}

module.exports = {
   apologyRender,
   getPage,
   parseBoolean
};