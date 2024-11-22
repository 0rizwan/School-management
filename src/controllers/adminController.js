import Admin from "../models/adminModel.js"

export const adminLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("provide email and password")
    next(Error("provide email and password"))
  }

  const admin = Admin.findOne({ email }).select('+password');

} 