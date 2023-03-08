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
}

module.exports = DateUtils;
