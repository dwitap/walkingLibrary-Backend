const nodemailer = require("nodemailer")

const emailer = async ({ to, subject, text, html }) => {
    if (!to)
        throw new Error(
            "Emailer needs recipient email. `to` parameter is missing"
        )

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS,
        },
    })

    await transporter.sendMail({
        to, // Email penerima
        subject, // Subject email
        text, // Body email dalam bentuk text
        html, // Body email dalam bentuk HTML
    })
}

module.exports = emailer
