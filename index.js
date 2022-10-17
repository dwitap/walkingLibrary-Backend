const express = require("express");
const dotenv = require("dotenv");
const db = require("./models/index.js");
const { Op } = require("sequelize");
const cors = require('cors')
const fs = require("fs")

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors())
app.use(express.json());

const { verifyToken } = require("./middlewares/authMiddleware.js");
const userRoute = require("./routes/userRoute.js");
app.use('/user', userRoute)

const bookRoute = require("./routes/bookRoute.js");
app.use('/book', bookRoute)

const cartRoute = require("./routes/cartRoute.js");
app.use('/cart', cartRoute)


app.listen(PORT, async () => {
  db.sequelize.sync({ alter: true });

  console.log("Listening to port: ", PORT);
});
 