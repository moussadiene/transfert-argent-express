const mongoose = require("mongoose");
const dayjs = require('dayjs')

const recepteurSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prenom: { type: String, required: [true, 'Veuillez saisir un noméro de téléphone'] },
    nom: { type: String, required: [true, 'Veuillez saisir un noméro de téléphone'] },
    adresse: { type: String, required: [true, 'Veuillez saisir un noméro de téléphone'] },
    telephone: { type: String, required: [true, 'Veuillez saisir un noméro de téléphone'] },
    created: { type: Date, default: dayjs(new Date()).format('YYYY-MM-DD') }
})

module.exports = recepteurSchema;