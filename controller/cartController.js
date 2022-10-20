const db = require("../models")
const moment = require("moment")

Carts = db.Carts
Transactions = db.Transactions
Items = db.Items

const cartController = {
    showMyCart: async (req, res) => {
        try {
            const seeAllCart = await Carts.findAll({
                include: [{ model: db.Books }],
                where: {
                    MemberId: req.user.id,
                },
            })

            return res.status(200).json({
                message: "Showing my items in cart",
                data: seeAllCart,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server error",
            })
        }
    },

    addNewCart: async (req, res) => {
        const { BookId } = req.body
        try {
            const conditionDouble = await Carts.findOne({
                where: {
                    BookId,
                },
            })
            if (conditionDouble) {
                return res.status(400).json({
                    message: "Book cannot be double",
                })
            }
            const showCartById = await Carts.create({
                BookId,
                MemberId: req.user.id,
            })

            return res.status(200).json({
                message: "Added to Carts",
                data: showCartById,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error adding cart data",
            })
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
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error deleting cart",
            })
        }
    },

    showBorrowedBook: async (req, res) => {
        try {
            const showBorrowedBook = await Carts.findAll({
                include: [{ model: db.Books }],
            })
            // console.log(showCartById)

            if (showBorrowedBook.length == 0) {
                return res.status(200).json({
                    message: "Nothing to show. You have no borrowed books.",
                })
            }
            return res.status(200).json({
                message: "Showing all Carts",
                data: showBorrowedBook,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error show all cart data ",
            })
        }
    },

    confirmBorrow: async (req, res) => {
        try {
            // let { items } = req.body

            // const findCarts = await Carts.findAll({
            //     where: {
            //         id: transactionItemIds,
            //     },
            //     include: [{ model: db.Book }],
            // })

            // const transactionItems = findCarts.map((carts) => {
            //     return {
            //         CartsId: Carts.id,
            //         BookId: Carts.BookId,
            //     }
            // })

            const memberCarts = await Carts.findAll({
                where: {
                    MemberId: req.user.id,
                },
            })

            const borrow_date = moment().format("MMMM Do YYYY, h:mm:ss a")

            const expired_date = moment()
                .add(5, "days")
                .format("MMMM Do YYYY, h:mm:ss a")

            const createTransaction = await Transactions.create({
                MemberId: req.user.id,
                borrow_date,
                expired_date,
            })

            memberCarts.map((cart) => {
                const item = Items.create({
                    TransactionId: createTransaction.id,
                    BookId: cart.BookId,
                })
            })

            await Carts.destroy({
                where: {
                    MemberId: req.user.id,
                },
            })

            return res.status(200).json({
                message: "This book was successfully borrowed",
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server error",
            })
        }
    },
}

module.exports = cartController
