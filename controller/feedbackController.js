const emailer = require("../lib/emailer");
const db = require("../models");
const handlebars = require("handlebars");
const fs = require("sequelize");

const feedbackController = {
  feedbackMember: async (req, res) => {
    try {
      const { name, email, feedback } = req.body;

    //   const userFeedback = await db.footerFeedback.findByPk(req.user.id);
      

      await emailer({
        to: 'krustykrablib@gmail.com',
        subject: `Saran Untuk Kita dari, ${name}, ${email}`,
        text: feedback,
      });

      return res.status(200).json({
        message: "Masukan sudah dikirim",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = feedbackController;
