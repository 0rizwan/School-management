import { ApiError } from '../utils/ApiError.js'


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

  sendError(error, req, res)
}