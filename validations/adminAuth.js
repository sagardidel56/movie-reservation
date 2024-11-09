const { ROLE } = require("../constants")

const adminAuth = (req, res, next) => {
    try {
        if(!req.user){
            res.status(401).json({
                message: "Incorrect token",
                status: 401,
                success: false
            })
            return
        }
        if(req.user?.role !==ROLE.ADMIN){
            res.status(401).json({
                message: "Admin only access",
                status: 401,
                success: false
            })
            return
        }
        next()
    } catch (error) {

    }
}

module.exports = adminAuth
