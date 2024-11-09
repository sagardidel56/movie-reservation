const mongoose = require('mongoose')


const SeatsData = {
    no: {
        type: Number,
        required: false
    },
    isBooked: {
        type: Boolean,
        required: false,
    },
    isStairs: {
        type: Boolean,
        required: false,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    }
}

const SeatSection = mongoose.Schema({
    sNo: {
        type: String,
        required: true,
    },
    seatsData: {
        type: [SeatsData],
        required: true
    }
})

const Seats = mongoose.Schema({
    typeName: {
        type: String,
        required: true
    },
    seatSection: {
        type: [SeatSection],
        required: false
    }
})

const Screens = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cinemaId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    seats: {
        type: [Seats],
        required: true
    }

})

const ScreensModel = new mongoose.model("screens", Screens)

module.exports = ScreensModel


const seats = [
    {
        sNo: 'a',
    },
    {

    },
    {

    }
]


