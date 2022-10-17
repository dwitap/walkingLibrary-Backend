const db = require("../models");


Carts = db.Carts;

const cartController = {
    showAllCart: async (req, res) => {
        try {
          const showCartById = await Carts.findAll({
            where:{
              status: "0" || false
            },
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
            MemberId: req.user.id,
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

      showBorrowedBook: async (req, res) => {
        try {
          const showBorrowedBook = await Carts.findAll({
            where:{
              status: "1" || true
            },
            include: [{ model: db.Books }],
          });
          // console.log(showCartById)

          if (showBorrowedBook.length == 0){
            return res.status(200).json({
              message: "Nothing to show. You have no borrowed books.",
            });

          }
          return res.status(200).json({
            message: "Showing all Carts",
            data: showBorrowedBook,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: "Server Error show all cart data ",
          });
        }
      },

        confirmBorrow: async (req, res) => {
          try {
            await Carts.update({
              status: "1" || true},
              {
              where:{
                status: "0" || false
              },
            })
            
            return res.status(200).json({
              message: "Confirmed borrow all books in cart",
            });
          } catch (error) {
            console.log(error);
            return res.status(500).json({
              message: "Server Error show all cart data ",
            });
          }
        },

      returnDeleteCart: async (req, res) => {
        try {
          const { status } = req.body
          await Carts.destroy({
            where:{
              status: "1" || true
            },
          })


          return res.status(200).json({
            message: "Deleted all borrowed books",
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: "Server Error show all cart data ",
          });
        }
      },
};

module.exports = cartController;
