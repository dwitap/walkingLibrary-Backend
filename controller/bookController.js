const db = require("../models")

Books = db.Books

const bookController = {
    showAllBook: async (req, res) => {
        try {
            
            const showBookById = await Books.findAll(id);
        
              return res.status(200).json({
                message: "Showing all books",
                data: showBookById,
              });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error show all data"
            })
        }
    },
    filterBookById: async (req, res) => {
        try {
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error filter by id"
            })
        }

    },
    sortBookById: async (req, res) => {
        try {
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error sort by id"
            })
        }

    },
    detailBookByPk: async (req, res) => {
        try {
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error detail by pk"
            })
        }

    },

};

module.exports = bookController