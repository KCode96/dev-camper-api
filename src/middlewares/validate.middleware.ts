import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';

const validateRequest =
    (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        next();
    };

export { validateRequest };
