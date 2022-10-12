const bookController = {
    showAllData: async (req, res) => {
        try {
            const showDataById = await Post.findAll({
                where: {
                  UserId: req.user.id,
                },
                // include: [{ model: db.User }],
              });
        
              return res.status(200).json({
                message: "Showing data specified this account!",
                data: showDataById,
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