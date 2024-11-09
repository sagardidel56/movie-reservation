const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/movie-reservation')
    .then(res => console.log('db connected'))
    .catch(err => console.log('error while connection db'))

