const express = require('express')
const cv_edit = express.Router() 
const Joi = require("@hapi/joi");
const authroute = require('../middleware/authjwt')
const CurriculumVitae = require('../models/CurriculumVitae') 
const User = require('../models/User') 

cv_edit.post("/new" , authroute , async (req,res) => {
    //on grab le token on le dechiffre ,on recupere l'id de la personne faisant la requete (req.user._id)
    const {id , email , firstName , lastName , education , location} = req.user
    const {title} = req.body


    let userfound = null
    try {
        userfound = await User.findById(id)
        console.log("found" , userfound , id)
    } catch(err) {
        console.log(err)
        return res.status(500).json({err})
    }

    if(!userfound) return res.status(400).json({err : "FAtal error User not found!"})

    // userfound.creation_CV
    

    const now = new Date()
    //on crer un nvx modele de cv dans la db &&
    const cv_data = {
        title : title, 
        data : {
            title: "COLORFUL TEMPLATE",
            firstName: "Michel",
            lastName: "Platini",
            subHeader: "Etudiant en deuxième année chez ESTIAM",
            email: "mail@yourthing.com",
            phone: "+33 6 00 00 00 00",
            location: "Paris 75001 - France",
            jobTitle: "Your job title here",
            employee: "OLORUNTECH",
            dateJob: "Janvier 2019 - Mars 2020",
            locationJob: "Abidjan",
            wdyd: "You can create your content here and edit this.",
            jobTitleModal: "Your job title",
            employeeModal: "Company",
            dateJobModal: "Date of your current job",
            locationJobModal: "Location of your job",
            wdydModal: "You can create your content here and edit this.",
            degree: "Master",
            titleDegree: "Ingénieurie informatique ",
            locationDegree:"Éstiam - École supérieure des technologies de l'information ",
            dateDegree: "17 Janvier 2018 - 17 Janvier 2023",
            contentDegree: "You can create your content here and edit this.",
            degreeModal: "Your level of degree",
            titleDegreeModal: "Degree title",
            dateDegreeModal: "School location",
            contentDegreeModal: "Date of your degree"
        }, 
        created_at : now
    }

 
    
    
     try {
        // on edit le Modele USer et on lui ajoute l'id du cv a sa liste  creation_CV de USER
        const new_cv = await CurriculumVitae.create(cv_data)
        cv_collections = [...userfound.creation_CV , { id : new_cv._id , title : title }] 
        userfound.creation_CV = cv_collections
        // on lui retourne l'id du cv ( react routage dynamique )
        res.status(201).json({msg : "cv successfully created ! ", cv_collections : cv_collections , cv_id : new_cv._id})
        await userfound.save()
    } catch(err) {
        return res.status(500).json({err})
    }
   
})

cv_edit.get('/get_cv/:cv_id',authroute, async (req,res) => {
    // ici on renvoi le status de user dans le token !
    // on verifie si l'id du cv fait parti de l'utilisateur
    // sert de page d'actualisation
    console.log("you requested cv #" , req.params.id)


    const {cv_id} = req.params
    let cvfound = null
    try {
        cvfound = await CurriculumVitae.findById(cv_id)
        if(!cvfound) return res.status(400).json({err : "cv not found" , cv_id : cv_id})
        return res.status(200).json({cv : cvfound, cv_id : cv_id})
    } catch(err) {
        console.log(err)
        return res.status(500).json({err})
    }
 
})

cv_edit.get('/fetch_cvs/' , authroute , async (req,res) => {
    // appelé a chaque visite , actualisation des cv
    const {id} = req.user   
    let userfound = null
    try {
        userfound = await User.findById(id)
        console.log("found" , userfound , id)
    } catch(err) {
        console.log(err)
        return res.status(500).json({err})
    }
    if(!userfound) return res.status(400).json({err : "user does not exist"})
    return res.status(200).json({ cv_list : userfound.creation_CV})

})

cv_edit.post('/save_cv' , authroute, async (req,res) => {
    // l'utilisateur nous envoi son state avec les info du cv + l'id du cv
    const {cv_id , data_cv } = req.body

    try{
        const cv_found = await CurriculumVitae.findById(cv_id)
        cv_found.data = data_cv
        await cv_found.save()
        return res.json({data : cv_found , saved : true })
    }catch(ex){
        return console.log(ex)
    }
    // on va modifier le cv en question (id) avec la nouvelle data
    // on retourne a l'user la data saved
  
})

cv_edit.get('/del_cv/:cv_id' , authroute ,async (req,res) => {
    const {cv_id} = req.params
    // chercher user.id , filtrer parmis ses cv 
     
    let userfound = null
    try {
        userfound = await User.findById(req.user.id)
      
    } catch(err) {
        console.log(err)
        return res.status(500).json({err})
    }


    if(!userfound) return res.status(400).json({err : "user does not exist"})
    let {creation_CV} = userfound
    //console.log(creation_CV , cv_id)
    const filteredArray =  creation_CV.filter( cv_key => cv_key.id != cv_id)
    userfound.creation_CV = filteredArray
  
   
    
    try{
        await CurriculumVitae.findByIdAndDelete(cv_id)
        await userfound.save()
        return res.status(200).json({ cv_list : userfound.creation_CV , cv_deleted : cv_id , success : true})
    }catch(err){
        return  res.json({err : "err" })
    }





    // repondre avec  la new liste
    // if 200 change the state in react context
    

})
 

module.exports = cv_edit