const bcrypt = require('bcrypt');

class CryptoUtils {
    /**
     * Method to encrypt
     * @param {string} content any content (string) that you want to encrypt
     * @returns A string with the encrypted content
     */
    hash(content){
        return bcrypt.hashSync(content, 10);
    }

    /**
     * Method to check if an unencrypted string matches its encrypted string
     * @param {string} content unencrypted content string
     * @param {string} hashedContent encrypted string 
     * @returns {boolean} true if it matches and false otherwise
     */
    match(content, hashedContent) {
        return bcrypt.compareSync(content, hashedContent);
    }

}
module.exports = CryptoUtils;