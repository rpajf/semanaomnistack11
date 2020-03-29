const crypto = require('crypto');


module.exports = function generateUniqueId() {
  return crypto.randomBytes(4).toString('HEX');

}
/* unity test -> a very specific functionality of the programm, and its only
  related to the Api itself. nor DB, nor connection

*/
