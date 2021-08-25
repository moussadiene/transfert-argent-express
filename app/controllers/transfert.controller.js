const db = require("../models");
const mongoose = require('mongoose')

class TransfertController {

    constructor() {}

    async saveTransfert(req, res) {

        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        if (db.Transfert) {

            const emeteur = db.Emeteur({
                _id: new mongoose.Types.ObjectId(),
                prenom: req.body.prenomE,
                nom: req.body.nomE,
                adresse: req.body.adresseE,
                cni: req.body.cniE,
                telephone: req.body.telephoneE,
            })

            const responseEmeteur = await emeteur.save();
            console.log("emmeteur ::", responseEmeteur)
            if (responseEmeteur != null) {
                console.log("===============================")
                console.log("=========  emeteur   ==========")
                console.log("===============================")
                const recepteur = db.Recepteur({
                    _id: new mongoose.Types.ObjectId(),
                    prenom: req.body.prenomR,
                    nom: req.body.nomR,
                    adresse: req.body.adresseR,
                    telephone: req.body.telephoneR,
                })
                const responseRecepteur = await recepteur.save();
                console.log("recepteur ::", responseRecepteur)
                if (responseRecepteur) {
                    console.log("===============================")
                    console.log("========  recepteur  ==========")
                    console.log("===============================")
                    const transfert = new db.Transfert({
                        _id: new mongoose.Types.ObjectId(),
                        montant: req.body.montant,
                        emeteur: responseEmeteur,
                        recepteur: responseRecepteur,
                    });
                    transfert
                        .save(transfert)
                        .then(data => {
                            console.log("===============================")
                            console.log("=========  transfert   ========")
                            console.log("===============================")
                            res.status(201).send({
                                message: "success ",
                                transfert: data
                            });
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || " error :Revoi les données du recepteur"
                            });
                        });
                } else {
                    return res.status(500).json({ error: 'Revoi les données du recepteur !' });
                }
            } else {

                return res.status(500).json({ error: 'Revoi les données de l\'emeteur !' });
            }

        } else {
            return res.status(403).json({ error: 'Veuillez vous connecter !' });
        }
    };

    async AllTransferts(req, res) {
        if (db.Transfert) {
            const AllTransferts = await db.Transfert.find().populate('emeteur').populate('recepteur');
            if (AllTransferts) {
                res.status(200).json(AllTransferts)
            } else {
                res.status(400).json({
                    message: "liste vide "
                });
            }
            return;
        } else {
            return res.status(400).json({ error: 'Veuillez vous connecter !' });

        }
    }

}

module.exports = TransfertController