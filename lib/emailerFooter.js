const nodemailer = require('nodemailer')

const emailerFooter = async ({ to, subject, text, html }) => {
    if (!to){
        throw new Error("Emailer needs recipient email. `to` is missing")
    }

    const transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",

        service: "gmail",
        auth: {
            user: process.NODEMAILER_EMAIL,
        },
        // secure: false,
        // port: 587,
    })

    const info = await transporter.sendMail({
        to, //Penerima
        subject, //Subject email
        text, //Body email
        html, //Body email dalam html
    })

}

module.exports = emailerFooter
