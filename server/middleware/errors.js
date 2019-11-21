const notFound = (req, res, next) => {
  const err = new Error('404 page not found');
  err.status = 404;
  next(err);
};

const catchErrors = (err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
  });
};

module.exports = {
  notFound,
  catchErrors,
};
