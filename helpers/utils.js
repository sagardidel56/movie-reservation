const fs = require('node:fs')

const errorLogger= (url,error)=>{
    console.log(`Error from:-> ${url}`,error)
} 

const internalServerError = (req,error,res)=>{
    errorLogger(req?.url,error)
    res.status(500).json({
        message: "Internal Server Error",
        success: false,
        status: 500,
    })
}

const deleteImg = (imgPath)=>{
    fs.unlink(imgPath, (err) => {
        if (err) {
            console.log({err})
            return
        }
        console.log("Image delete successfully!",{imgPath})
    })
}

module.exports = {
    errorLogger,
    internalServerError,
    deleteImg
}