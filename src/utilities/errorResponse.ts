class ErrorResponse extends Error {

    statusCode: string;

    constructor(message: string, statusCode: string) {
        super(message);

        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
    
}

export default ErrorResponse;
