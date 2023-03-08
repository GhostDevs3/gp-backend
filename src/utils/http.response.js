/**
 * @author Rafa Fernandez <imraphiki@gmail.com>
 */
// HTTPCodes is an object that collects each case with a code value.
const HTTPCodes = {
	SUCCESS: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	SERVER_ERROR: 500,
};

/**
 * Class HTTPResponse to handler response.
 */
class HTTPResponse {
	constructor(res) {
		this.response = res;
	}

	success(message, data) {
		return res.status(HTTPCodes.SUCCESS).json({
			success: true,
			message: message,
			status: 'SUCCESS',
			data: data,
			error: undefined,
		});
	}

	created(message, data) {
		return res.status(HTTPCodes.CREATED).json({
			success: true,
			message: message,
			status: 'CREATED',
			data: data,
			error: undefined,
		});
	}

	badRequest(message, status, data) {
		return res.status(HTTPCodes.BAD_REQUEST).json({
			success: false,
			message: message,
			status: status,
			data: data,
			error: undefined,
		});
	}

	unauthorized(message, data) {
		return res.status(HTTPCodes.UNAUTHORIZED).json({
			success: false,
			message: message,
			status: 'UNAUTHORIZED',
			data: data,
			error: undefined,
		});
	}

	forbidden(message, data) {
		return res.status(HTTPCodes.FORBIDDEN).json({
			success: false,
			message: message,
			status: 'FORBIDDEN',
			data: data,
			error: undefined,
		});
	}

	notFound(message, data) {
		return res.status(HTTPCodes.NOT_FOUND).json({
			success: false,
			message: message,
			status: 'NOT_FOUND',
			data: data,
			error: undefined,
		});
	}

	conflict(message, status, data) {
		return res.status(HTTPCodes.CONFLICT).json({
			success: false,
			message: message,
			status: status,
			data: data,
			error: undefined,
		});
	}

	error(message, status, error) {
		return res.status(HTTPCodes.SERVER_ERROR).json({
			success: false,
			message: message,
			status: status,
			data: null,
			error: error,
		});
	}
}

module.exports = HTTPResponse;
