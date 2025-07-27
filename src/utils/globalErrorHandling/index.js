
export const asyncHandler = (fn) => (req, res, next) => {
    fn(req, res, next).catch((error) => {
        next(error);
    });
}

export const globalErrorHandler = (err, req, res, next) => {
    return res.status(err["cause"] || 500).json({ message: err.message });
}