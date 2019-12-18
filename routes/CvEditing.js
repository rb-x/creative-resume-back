const express = require('express')
const cv_edit = express.Router() 
const Joi = require("@hapi/joi");
const authroute = require('../middlewares/authmiddleware')


cv_edit.post("/new" , authroute , async (req,res) => {
    //on choppe le token on le dechiffre ,on recupere l'id de la personne faisant la requete (req.user._id)
    //on crer un nvx modele de cv dans la db &&
    //on edit le Modele USer et on lui ajoute l'id du cv a sa liste  creation_CV de USER
    //on lui retourne l'id du cv ( react routage dynamique )
    return
})


cv_edit.get('/get_cv/:id',authroute, async (req,res) => {
    // ici on renvoi le status de user dans le token !
    // on verifie si l'id du cv fait parti de l'utilisateur
    // sert a recuperer la propriété creation_CV , 
    // appelé a chaque visite sur le dashboard ! --> stored inside localstorage
    // sert de page d'actualisation
    return
})


cv_edit.put('/save_cv/:id' , async (req,res) => {
    // l'utilisateur nous envoi son state avec les info du cv + l'id du cv
    // on va modifier le cv en question (id) avec la nouvelle data
    // on retourne a l'user la data saved

})
 

module.exports = cv_edit