const express = require('express')
const cv_edit = express.Router() 
const Joi = require("@hapi/joi");
const authroute = require('../middlewares/authmiddleware')


cv_edit.post("/new" , authroute ,(req,res) => {
    //on choppe le token on le dechiffre ,on recupere l'id de la personne faisant la requete (req.user._id)
    //on crer un nvx modele de cv dans la db &&
    //on edit le Modele USer et on lui ajoute l'id du cv a sa liste  creation_CV de USER
    return
})


cv_edit.get('/get_cv',authroute,(req,res) => {
    // ici on renvoi le status de user sans le token !
    // sert a recuperer la propriété creation_CV , 
    // appelé a chaque visite sur le dashboard ! --> stored inside localstorage
    // sert de page d'actualisation
    return
})




module.exports = cv_edit