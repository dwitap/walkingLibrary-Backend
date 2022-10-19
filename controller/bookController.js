const { Op } = require("sequelize")
const db = require("../models")

Books = db.Books

const bookController = {
  showAllBook: async (req, res) => {
    try {
      const page = parseInt(req.query._page) || 0
      const limit = parseInt(req.query._limit) || 10
      const search = req.query._keywordHandler || ""
      const offset = limit * page
      const totalRows = await Books.count({
        where: {
          [Op.or]: [
            { title: { [Op.like]: "%" + search + "%" } },
            { genre: { [Op.like]: "%" + search + "%" } },
          ],
        },
      })
      const totalPage = Math.ceil(totalRows / limit)
      const showBookById = await Books.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: "%" + search + "%" } },
            { genre: { [Op.like]: "%" + search + "%" } },
          ],
        },
        offset: offset,
        limit: limit,
        order: [["id", "DESC"]],
      })

      return res.status(200).json({
        // message: "Showing all books",
        data: showBookById,
        // page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server Error show all data",
      })
    }
  },
  filterBookById: async (req, res) => {
    try {
      const { genre } = req.params
      const filterBookById = await Books.findAll({
        where: {
          genre: {
            [Op.like]: `%${genre}%`,
          },
        },
      })
      return res.status(200).json({
        message: "Showing all books",
        data: filterBookById,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server Error filter by id",
      })
    }
  },

  detailBookByPk: async (req, res) => {
    try {
      const findBooksByPk = await db.Books.findByPk(req.params.id)

      return res.status(200).json({
        message: "Show Book Detail",
        data: findBooksByPk,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server Error detail by pk",
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
        order: [["title", _sortDir]],
      })

      return res.status(200).json({
        message: "Showing all books",
        data: findAllSort,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server Error sort by id",
      })
    }
  },
  detailBookByPk: async (req, res) => {
    try {
      const findDetail = await db.Books.findByPk(req.params.id)
      return res.status(200).json({
        message: "Showing all books",
        data: findDetail,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server Error detail by pk",
      })
    }
  },
  findByCart: async (req, res) => {
    try {
      const findAllInCart = await db.Transaction.findAll({
        where: {
          ItemId: id,
        },
        include: [{ model: db.User }],
        order: [["title", _sortDir]],
      })

      return res.status(200).json({
        message: "Showing all books",
        data: findAllInCart,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server Error fetching cart",
      })
    }
  },
  deleteBookById: async (req, res) => {
    try {
          await Books.destroy({
          where: {
            id: req.params.id,
          },
        })
      
    
      return res.status(200).json({
        message: "Book deleted",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error deleting book",
      });
    }
  },
  addNewBook: async (req, res) => {
    const { 
      // isi detail book contoh cartController.addNewCart 
    } = req.body;
    try {
      const newBook = await Books.create({
        // isi detail book contoh cartController.addNewCart
      });

      return res.status(200).json({
        message: "Book has been added",
        data: newBook,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error adding book collection",
      });
    }
  },
  updateBook: async (req, res) => {}
}

module.exports = bookController
