const express = require("express")
const actions = require("../helpers/actionModel")

const router = express.Router()

router.post("/", (req, res) => {
    if(!req.body.description || !req.body.notes) {
        return res.status(400).json({
            message: "Please provide notes and description for the action."
        })
    } 
    actions.insert(req.body)
        .then((action) => {
            res.status(201).json(action)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error while saving"
            })
        })
})

router.get("/:id", (req, res) => {
    actions.get(req.params.id)
    .then((action) => {
        if(action){
            res.status(200).json(action)
        }else {
            res.status(404).json({
                message: "Action not found"
            })
        }
    })
    .catch((error) => {
        next(error)
    }) 
})


module.exports = router