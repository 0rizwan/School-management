const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`
  const error = new AppError(message, 400)
  console.log(error, "handle")
  return error;
}

const handleDuplicateFieldsDB = err => {
  const field = Object.keys(err.keyValue);
  const value = Object.values(err.keyValue);
  message = `Duplicate field value: ${value}. Please use another value!`
  return new AppError(message, 400)
}

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => {
    return el.message
  });

  const message = `Invalid input data. ${errors.join('. ')}`;
  console.log(message, "message")
  return new AppError(message, 400);
}

const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again', 401)
}

const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again', 401);

// const sendErrorDev = (err, req, res) => {
//   //A) Api
//   if (req.originalUrl.startsWith('/api')) {
//       return res.status(err.statusCode).json({
//           status: err.status,
//           error: err,
//           message: err.message,
//           stack: err.stack
//       })
//   }
//   //B) Rendered Website
//   console.error('Error', err)
//   return res.status(err.statusCode).render('error', {
//       title: 'Something went wrong!',
//       msg: err.message
//   })
// }

// const sendErrorProd = (err, req, res) => {
//   //A) API
//   if (req.originalUrl.startsWith('/api')) {
//       if (err.isOperational) {
//           return res.status(err.statusCode).json({
//               status: err.status,
//               message: err.message,
//           })
//       }
//       console.error('Error', err)

//       return res.status(500).json({
//           status: 'error',
//           message: 'Something went very wrong!'
//       })
//   }
//   //B) Rendered Error
//   if (err.isOperational) {
//       return res.status(err.statusCode).render('error', {
//           title: 'Something went wrong!',
//           msg: err.message
//       })
//   }

//   console.error('Error', err)
//   return res.status(err.statusCode).render('error', {
//       title: 'Something went wrong!',
//       msg: "Please try again later."
//   })

// }

const sendError = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}



export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = {
    ...err,
    message: err.message
  }

  if (err.name === 'CastError') error = handleCastErrorDB(error)
  if (err.code === 11000) error = handleDuplicateFieldsDB(error)
  if (err.name === 'ValidationError') error = handleValidationErrorDB(error)
  if (err.name === 'JsonWebTokenError') error = handleJWTError()
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError()
  sendError(error, req, res)
}