const userController = {
    postRegister: async (req, res) => {
        try {
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error post register"
            })
        }

    },
    loginUser: async (req, res) => {
        try {
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error login User"
            })
        }

    },

};

module.exports = userController