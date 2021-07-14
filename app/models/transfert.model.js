const mongoose = require("mongoose");
const dayjs = require('dayjs')

const transfertSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Date: { type: Date, default: dayjs(new Date()).format('YYYY-MM-DD') },
    montant: { type: Number, required: true },
    emeteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Emeteur"
    },
    recepteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recepteur"
    },
})

module.exports = transfertSchema;