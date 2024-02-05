const requestErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  // handle mongoose duplicate key error. and respond all duplicate key filed error send as an array of object
  console.log(err);
  if (err.code === 11000) {
    const error = Object.keys(err.keyValue).map((key) => {
      return {
        field: key,
        message: `The value ${err.keyValue[key]} of ${key} field is already exists!`,
      };
    });
    return res.status(400).json({
      error: "Validation Failed",
      message: `Duplicate field found!`,
      data: error,
      statusCode: 400,
    });
  }

  switch (statusCode) {
    case 400:
      res.json({
        error: "Validation Failed",
        message: err.message,
        statusCode,
      });

      break;
    case 401:
      res.json({
        error: "Unauthorize",
        message: err.message,
        statusCode,
      });

      break;
    case 403:
      res.json({
        error: "Forbidden Access",
        message: err.message,
        statusCode,
      });

      break;
    case 404:
      res.json({
        error: "Not Found",
        message: err.message,
        statusCode,
      });

      break;
    default:
      res.status(500).json({
        error: "Internal Server Error",
        message: err.message,
      });
      break;
  }
};

module.exports = requestErrorHandler;
