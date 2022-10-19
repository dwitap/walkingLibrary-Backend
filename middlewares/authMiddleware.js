const { validateToken } = require("../lib/jwt")
const db = require ("../models")


const verifyToken = (req, res, next) => {
  let token = req.headers.authorization

  // console.log(token)

  if (!token) {
    return res.status(401).json({
      message: "User unauthorized",
    })
  }
  try {
    token = token.split(" ")[1]
    const verifiedUser = validateToken(token)

    if (!verifiedUser) {
      return res.status(401).json({
        message: "Unauthorized request",
      })
    }

    req.user = verifiedUser
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      message: "Invalid token",
    })
  }
}


const verifyAdmin = async (req, res, next) => {
  try {
    if (req.user.role == "admin") {
      return res.status(401).json({
        message: "User is admin"
      })
    }

    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      message: "Area 51 restricted!",
    })
  }
}

module.exports = { 
  verifyToken, 
  verifyAdmin 
}

