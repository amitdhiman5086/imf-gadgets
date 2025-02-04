import { Request, Response, NextFunction } from 'express';

// Middleware to handle errors
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);

    // Set the status code to 500 if not already set
    res.status(err.status || 500);

    // Send the error message as a JSON response
    res.json({
        error: {
            message: err.message,
            // Include stack trace only in development mode
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
};
