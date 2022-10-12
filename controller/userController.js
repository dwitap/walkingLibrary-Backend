const db = require("../models")
const { signToken } = require("../lib/jwt")
const emailer = require("../lib/emailer")
const { createVerificationToken } = require("../lib/verification")

const userController = {
    registerMember: async (req, res) => {
        try {
            const { NIM, username, email, password } = req.body

            const findUserByUsernameOrEmail = await User.findOne({
                where: {
                    [Op.or]: {
                        username,
                        email,
                    },
                },
            })

            if (findUserByUsernameOrEmail) {
                return res.status(400).json({
                    message: "Username or email has been used",
                })
            }

            const newUser = await User.create({
                NIM,
                username,
                email,
                password,
            })

            const verificationToken = createVerificationToken({
                id: newUser.id,
            })
            const verificationLink = `http://localhost:2000/auth/verification?verification_token=${verificationToken}`

            const rawHTML = fs.readFileSync(
                "templates/register_member.html",
                "utf-8"
            )
            const compiledHTML = handlebars.compile(rawHTML)
            const htmlResult = compiledHTML({
                username,
                verificationLink,
            })

            await emailer({
                to: email,
                html: htmlResult,
                subject: "Verify your account",
                text: "Please verify your account",
            })

            return res.status(201).json({
                message: "User registered",
                data: newUser,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error post register",
            })
        }
    },
    loginUser: async (req, res) => {
        try {
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error login User",
            })
        }
    },
}

module.exports = userController
