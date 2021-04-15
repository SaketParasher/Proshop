module.exports.notFoundHandler = (req,res,next) => {
    res.status(404);
    return next(new Error(`${req.originalUrl} not Found !`));
}

module.exports.globalErrorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV != 'production' ? err.stack : ''
    })
}