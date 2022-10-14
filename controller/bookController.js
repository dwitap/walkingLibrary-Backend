const { Op } = require("sequelize");
const db = require("../models");

Books = db.Books;

const bookController = {
  showAllBook: async (req, res) => {
    try {
      const showBookById = await Books.findAll();

      return res.status(200).json({
        message: "Showing all books",
        data: showBookById,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error show all data",
      });
    }
  },
  filterBookById: async (req, res) => {
    try {
        const { genre } = req.params;
      const filterBookById = await Books.findAll({
        where: {
          genre: {
            [Op.like]: `%${genre}%`,
          },
        },
      });
       return res.status(200).json({
        message: "Showing all books",
        data: filterBookById,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error filter by id",
      });
    }
  },

    detailBookByPk: async (req, res) => {
        try { 
            const findBooksByPk = await db.Books.findByPk(req.params.id)
        
            return res.status(200).json({
                message: "Show Book Detail",
                data: findBooksByPk
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error detail by pk"
            })
        }

    },
     
  sortBookById: async (req, res) => {
    try {
        const { _limit = 5, _page = 1, _sortDir = "DESC" } = req.query

        const findAllSort = await db.Books.findAll({
        // include: [{ model: db.User }],
        // limit: Number(_limit),
        // offset: (_page - 1) * _limit,
        order: [
          ["title", _sortDir]
        ]
      })
    
      return res.status(200).json({
        message: "Showing all books",
        data: findAllSort,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error sort by id",
      });
    }
  },
  detailBookByPk: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error detail by pk",
      });
    }
  },
  findByCart: async (req, res) => {
    try {
        const findAllInCart = await db.Transaction.findAll({
          where: {
            ItemId: id
          },
        include: [{ model: db.User }],
        order: [
          ["title", _sortDir]
        ]
      })
    
      return res.status(200).json({
        message: "Showing all books",
        data: findAllInCart,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error fetching cart",
      });
    }
  },
};

module.exports = bookController;
