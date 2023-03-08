/**
 * @author Rafa Fernandez <imraphiki@gmail.com>
 */
/**
 * Class Date utils to handler date timestamp.
 * Covert the seconds, minutes, hours, days and months into a milliseconds.
 */
class DateUtils {
	// Multiply the seconds to convert to milliseconds
	static secondsToMilliseconds(seconds) {
		return seconds * 1000;
	}
	// Convert minutes into seconds to use secondsToMilliseconds method.
	static minutesToMilliseconds(minutes) {
		return DateUtils.secondsToMilliseconds(minutes * 60);
	}
	// Convert hours into minutes to use minutesToMilliseconds method.
	static hoursToMilliseconds(hours) {
		return DateUtils.minutesToMilliseconds(hours * 60);
	}
	// Convert days into hours to use hoursToMilliseconds method.
	static daysToMilliseconds(days) {
		return DateUtils.hoursToMilliseconds(days * 24);
	}
	// Convert months into days to use daysToMilliseconds method.
	static monthsToMilliseconds(months) {
		return DateUtils.daysToMilliseconds(months * 30);
	}
	/**
	 * Convert a time expression like '1d','1h','3m' to milliseconds
	 * @param { String } time seconds
	 * @returns number of milliseconds
	 */
	static inMilliseconds(time) {
		const digitRegex = /\d+/g; // Regex for digit
		const letterRegex = /\D+/g; // Regex for letter
		switch (letterRegex.exec(time)) {
			case 'ms':
				return digitRegex.exec(time);
			case 's':
				return DateUtils.secondsToMilliseconds(digitRegex.exec(time));
			case 'mn':
				return DateUtils.minutesToMilliseconds(digitRegex.exec(time));
			case 'h':
				return DateUtils.hoursToMilliseconds(digitRegex.exec(time));
			case 'd':
				return DateUtils.daysToMilliseconds(digitRegex.exec(time));
			case 'm':
				return DateUtils.monthsToMilliseconds(digitRegex.exec(time));
			default:
				console.log('Invalid token time expression: ' + time);
		}
	}
}

module.exports = DateUtils;
