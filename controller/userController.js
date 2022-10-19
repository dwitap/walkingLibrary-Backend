const bcrypt = require("bcrypt")
const { validateVerificationToken } = require("../lib/verification")
const db = require("../models")
const { signToken } = require("../lib/jwt")
const emailer = require("../lib/emailer")
const { createVerificationToken } = require("../lib/verification")
const { Op } = require("sequelize")
const fs = require("fs")
const handlebars = require("handlebars")

const userController = {
  registerMember: async (req, res) => {
    try {
      const { NIM, username, email, password, role } = req.body

      const findUserByUsernameOrEmail = await db.Member.findOne({
        where: {
          [Op.or]: {
            NIM,
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

      const hashedPassword = bcrypt.hashSync(password, 5)

      const newUser = await db.Member.create({
        NIM,
        username,
        email,
        password: hashedPassword,
        role,
      })

      const verificationToken = createVerificationToken({
        id: newUser.id,
      })
      const verificationLink = `http://localhost:2000/user/verification?verification_token=${verificationToken}`

      const rawHTML = fs.readFileSync("templates/register_member.html", "utf-8")
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
      const { NIM, password } = req.body

      const findMemberByNIM = await db.Member.findOne({
        where: {
          NIM: NIM ? NIM : "",
        },
      })

      if (!findMemberByNIM) {
        return res.status(400).json({
          message: "User Not Found",
        })
      }

      const passwordValid = bcrypt.compareSync(
        password,
        findMemberByNIM.password
      )

      if (!passwordValid) {
        return res.status(400).json({
          message: "Wrong password",
        })
      }

      delete findMemberByNIM.dataValues.password

      const token = signToken({
        id: findMemberByNIM.id,
      })

      return res.status(201).json({
        message: "Member login",
        data: findMemberByNIM,
        token,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server Error Login Member",
      })
    }
  },
  verifyUser: async (req, res) => {
    try {
      const { verification_token } = req.query
      const validToken = validateVerificationToken(verification_token)

      if (!validToken) {
        res.status(401).json({
          message: "Token invalid",
        })
      }

      await db.Member.update(
        { verified: true },
        {
          where: {
            id: validToken.id,
          },
        }
      )

      //   Redirect ke page tertentu
      //   return res.redirect('http://localhost:3000/login')
      return res.redirect("http://localhost:3000/")
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  verifyUserResend: async (req, res) => {
    try {
      const verificationToken = createVerificationToken({
        id: req.user.id,
      })
      const verificationLink = `http://localhost:2000/user/verification?verification_token=${verificationToken}`

      const userSaatIni = await db.Member.findByPk(req.user.id)
      const rawHTML = fs.readFileSync(
        "templates/register_user_resend.html",
        "utf-8"
      )
      const compileHTML = handlebars.compile(rawHTML)
      const result = compileHTML({
        username: userSaatIni.username,
        verificationLink,
      })
      // console.log()

      await emailer({
        to: userSaatIni.email,
        html: result,
        subject: "Resend Token Email",
        text: "Halo dunia",
      })

      return res.status(200).json({
        message: "Resend successfully",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  keepUserLoggedIn: async (req, res) => {
    try {
      const findUserById = await db.Member.findByPk(req.user.id)

      const renewedToken = signToken({
        id: req.user.id,
      })

      return res.status(200).json({
        message: "Renewed user token",
        data: findUserById,
        token: renewedToken,
      })
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

module.exports = userController
