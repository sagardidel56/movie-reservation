const express = require('express')
const routes =require('./routes')
const app = express()

//db connection
require('./db/connect')
// require('./easybot')
const PORT = 3001

app.listen(PORT, () => console.log(`Server running on:${PORT}`))

// app.use((req,res,next)=>{
//     console.log('App running --->>>>')
//     next()
// })
// app.use('/api',(req,res)=>console.log('req',{req}))


app.use(express.json())
app.use((req, res, next) => {
    console.log(`Incoming request`, req.method, req.url)
    next()
})

app.use('/api/v1',routes)


