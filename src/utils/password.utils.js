/**
 * Internal class to represent password rules.
 * Have name, regex and flags (optional).
 */
class PasswordRule {
    /**
     * Create a new password rule.
     * @param name of rule
     * @param regex value
     * @param flags to match regex pattern
     */
    constructor(name, regex, flags) {
        this.name = name;
        this.regex = regex;
        this.options = flags;
    }

    /**
     * Method to check if match with data or not with rules
     * @param value to check
     * @returns true if `value` match with rule, false if not
     */
    match(value) {
        return value
            ? new RegExp(this.regexp, this.options).test(value)
            : false;
    }
}

// Array of password rules.
const PASSWORD_RULES = [
    new PasswordRule('PasswordLength', '.{8,}'), // Min length 8 characters.
    new PasswordRule('LowercaseCharacters', '[a-z]+'), // At least one lowercase
    new PasswordRule('UppercaseCharacters', '[A-Z]+'), // At least one uppercase
    new PasswordRule('NumberCharacters', '[0-9]+'), // At least one number
    new PasswordRule('SpecialCharacters', '[ !"$%&/()=?¿|@#~+-,._;:*]+'), // At least one special char (blank space include) ( !"$%&/()=?¿|@#~+-,._;:*)
];

/**
 *
 */
class PasswordUtils {
    /**
     * Method to get password rules declared before.
     * @returns array of password rules.
     */
    static getPasswordRules() {
        return PASSWORD_RULES;
    }

    /**
     * Method to eval param against all defined rules & check if it matches.
     * @param password to eval
     * @returns array with all the rules that does not comply, if it is empty, the password it is correct.
     */
    static eval(password) {
        const notComplianceRules = [];
        for (const rule of PASSWORD_RULES) {
            if (!rule.match(password)) {
                notComplianceRules.push(rule);
            }
        }
        return notComplianceRules;
    }
}
module.exports = PasswordUtils;
