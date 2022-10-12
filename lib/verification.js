const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const VERIFICATION_KEY = process.env.VERIFICATION_KEY

const createVerificationToken = (payload) => {
    return jwt.sign(payload, VERIFICATION_KEY, {expiresIn:"15m"})
}
const validateVerificationToken = (token) => {
    return jwt.verify(token, VERIFICATION_KEY)
}

module.exports = { createVerificationToken, validateVerificationToken }