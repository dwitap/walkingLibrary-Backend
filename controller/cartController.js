const db = require("../models");


Carts = db.Carts;

const cartController = {
    showAllCart: async (req, res) => {
        try {
          const showCartById = await Carts.findAll({
            include: [{ model: db.Books }],
          });
          // console.log(showCartById)

          return res.status(200).json({
            message: "Showing all Carts",
            data: showCartById,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: "Server Error show all cart data ",
          });
        }
      },

      addNewCart: async (req, res) => {
        const { BookId } = req.body;
        try {
          const showCartById = await Carts.create({
            BookId,
          });
    
          return res.status(200).json({
            message: "Added to Carts",
            data: showCartById,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: "Server Error adding cart data",
          });
        }
      },

      deleteCartById: async (req, res) => {
        try {
              await db.Carts.destroy({
              where: {
                id: req.params.id,
              },
            })
          
        
          return res.status(200).json({
            message: "Deleted current Cart",
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: "Server Error deleting cart",
          });
        }
      },
};

module.exports = cartController;
