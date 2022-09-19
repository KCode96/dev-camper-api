import { Request, Response, NextFunction } from 'express';

type Error = {
    message: string;
};

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode: number = res.statusCode ? res.statusCode : 500;

    console.log(err);

    res.status(statusCode).send({
        success: false,
        error: err.message || 'Internal server error',
    });
};

export { errorHandler };
